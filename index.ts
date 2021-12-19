import express from "express";
import cookieParser from "cookie-parser";
import { HttpError } from "express-openapi-validator/dist/framework/types";
import AuthService from "./services/AuthService";
import {knex as knexDriver} from "knex";
import cors from "cors";
import config from "./knexfile";

const app = express()
const port = process.env.PORT || 3000

const knex = knexDriver(config);
const authService = new AuthService();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
    (
        err: HttpError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        // format error
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors,
        });
    }
);



app.get('/', (req, res) => {
    res.send({headers: req.headers})
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