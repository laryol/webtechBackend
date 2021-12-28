import express, {Request} from "express";
import cookieParser from "cookie-parser";
import {HttpError} from "express-openapi-validator/dist/framework/types";
import AuthService from "./services/AuthService";
import {knex as knexDriver} from "knex";
import cors from "cors";
import config from "./knexfile";
import VacationService from "./services/VacationService";

const app = express()
const port = process.env.PORT || 3000

const knex = knexDriver(config);
const authService = new AuthService();
const vacationService = new VacationService(knex);


app.use(
    cors({
            origin: (process.env.NODE_ENV === "production"
                ? "https://practical-ritchie-5eb3ae.netlify.app"
                : "http://localhost:3001"),
            credentials: true,
        }
    )
);
app.use(express.json());
app.use(cookieParser());

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
    console.log(session)
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


app.get('/', (req, res) => {
    res.send({headers: req.headers})
})

app.get('/vacations', checkLogin, async (req, res) => {
    await vacationService.getAll(req.userEmail!)
        .then((vacation_list) => res.send(vacation_list))
})

app.post("/vacations", checkLogin, (req, res) => {
    const payload = req.body;
    vacationService.add(payload).then((newEntry) => res.send(newEntry));
});

app.get("/vacations/:vacationId", checkLogin, (req, res) => {
    const id = req.params.vacationId;
    vacationService.getVacation(id).then((vacation) => {
        res.send(vacation)
    })
})

app.delete("/vacations/:vacationId", checkLogin, (req, res) => {
    const id = req.params.vacationId;
    vacationService.delete(id).then(() => {
        res.status(204)
        res.send()
    })
})

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
        secure: process.env.NODE_ENV === "production",
    });
    res.json({status: "ok"});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})