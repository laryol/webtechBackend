import express, { Request } from "express";
import cors from "cors";
import AuthService from "./services/AuthService";


//const cors = require('cors')


const port = process.env.PORT || 3000
const app = express()
const authService = new AuthService();
//initialisieren AuthService

//grau heißt wird nicht benutzt
const checkLogin = async (
    req: Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const session = req.cookies.session;
    if (!session) {
        res.status(401);
        return res.json({ message: "You need to be logged in to see this page." });
    }
    const email = await authService.getUserEmailForSession(session);
    if (!email) {
        res.status(401);
        return res.json({ message: "You need to be logged in to see this page." });
    }
    req.userEmail = email;

    next();
};

app.use(cors({
    origin: true,
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send({headers: req.headers})
})

//aus Herrn Hühnes Server Beispiel
app.post("/login", async (req, res) => { //request kommt an
    const payload = req.body; //lesen der Daten des Requests
    const sessionId = await authService.login(payload.email, payload.password); //bekommen sessionId mit den Daten
    if (!sessionId) {
        res.status(401);
        return res.json({ message: "Bad email or password" });
    }
    res.cookie("session", sessionId, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
    });
    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})