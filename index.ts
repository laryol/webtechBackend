import express, {Request} from "express";
import cookieParser from "cookie-parser";
import {HttpError} from "express-openapi-validator/dist/framework/types";
import AuthService from "./services/AuthService";
import {knex as knexDriver} from "knex";
import cors from "cors";
import config from "./knexfile";
import VacationService from "./services/VacationService";
import * as OpenApiValidator from "express-openapi-validator";


const app = express()
const port = process.env.PORT || 3000

const knex = knexDriver(config);
const authService = new AuthService();
const vacationService = new VacationService(knex);
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./index.ts'], // files containing annotations as above
};


app.use(
    cors({
            origin: (process.env.NODE_ENV === "production"
                ? "https://practical-ritchie-5eb3ae.netlify.app"
                : "http://localhost:3001"),
            credentials: true,
        }
    )
);
const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(express.json());
app.use(cookieParser());

app.use(
    OpenApiValidator.middleware({
        apiSpec: "./openapi.yaml",
        validateRequests: true,
        validateResponses: false,
    })
);

app.use((err: HttpError,
         req: express.Request,
         res: express.Response,
         next: express.NextFunction
    ) => {
        // format error
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors,
        });
        next()
    }
);

const checkLogin = async (
    req: Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const session = req.cookies.session;
    if (!session) {
        res.status(401);
        return res.json({message: "You need to be logged in to see this page."});
    }
    const email = await authService.getUserEmailForSession(session);
    if (!email) {
        res.status(401);
        return res.json({message: "You need to be logged in to see this page."});
    }
    req.userEmail = email;

    next();
};



/**
 * @openapi
 * /:
 *   get:
 *     description: root path which returns the header
 *     responses:
 *       200:
 *         description: Returns the request header back
 */
app.get('/', (req, res) => {
    res.send({headers: req.headers})
})

/**
 * @openapi
 * /login:
 *   post:
 *     description: User Login
 *
 *     responses:
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: integer
 *                   description: email.
 *                   example: max.mustermann@gmail.com
 *                 password:
 *                   type: string
 *                   description: password.
 *                   example: 1234
 *       401:
 *         description: Unauthorized
 */
app.post("/login", async (req, res) => {
    const payload = req.body;

    const sessionId = await authService.login(payload.email, payload.password);
    if (!sessionId) {
        res.status(401);
        return res.json({message: "Bad email or password"});
    }
    res.cookie("session", sessionId, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    res.json({status: "ok"});
});

/**
 * @openapi
 * /vacations:
 *   get:
 *     description: Get vacations from authorized user
 *     responses:
 *       200:
 *         description: Returns all vacations
 *       401:
 *          description: unauthorized
 */
app.get('/vacations', checkLogin, async (req, res) => {
    await vacationService.getAll(req.userEmail!)
        .then((vacation_list) => res.send(vacation_list))
})

/**
 * @openapi
 * /vacations:
 *   post:
 *     description: Add a new vacation
 *     responses:
 *       204:
 *         description: Success
 *       404:
 *          description: Vacation ID not found
 *       401:
 *          description: Unauthorized
 */
app.post("/vacations", checkLogin, (req, res) => {
    const payload = req.body;
    vacationService.add(payload).then((newEntry) => res.send(newEntry));
});

/**
 * @openapi
 * /vacations/:vacationId:
 *   put:
 *     description: Update vacation by vacationID
 *     responses:
 *       200:
 *         description: Success Returns

 *       401:
 *          description: Unauthorized
 *       404:
 *          description: Vacation ID not found
 */
app.put('/vacations/:vacationId', checkLogin, (req, res) => {
    const id = req.params.vacationId;
    const payload = req.body;

    vacationService
        .update(payload, id)
        .then((count) => {
            if (count) {
                res.status(200).json({updated: count})
            } else {
                res.status(404).json({message: "Record not found"})
            }
        })
        .catch((err) => {
            console.log("Hey I found the error!")
            res.status(500).json({message: "Error updating new post", error: err})
        });
})


app.get("/vacations/:vacationId", checkLogin, (req, res) => {
    const id = req.params.vacationId;
    /**
     * @openapi
     * /vacations/:vacationId:
     *   get:
     *     description: Gets vacation by vacationID
     *     responses:
     *       204:
     *         description: Success
     *       401:
     *         description: Unauthorized
     *       404:
     *         description: Vacation ID not found
     */
    vacationService.getVacation(id, req.userEmail!).then((vacation) => {
        res.send(vacation)
    })
})

/**
 * @openapi
 * /vacations/:vacationId:
 *   delete:
 *     description: Delete vacation by vacationID
 *     responses:
 *       204:
 *          description: deleted
 *       404:
 *          description: Vacation ID not found
 *       401:
 *          description: Unauthorized
 */
app.delete("/vacations/:vacationId", checkLogin, (req, res) => {
    const id = req.params.vacationId;
    vacationService.delete(id).then(() => {
        res.status(204)
        res.send()
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})