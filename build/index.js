"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const port = process.env.PORT || 3000;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port1 = 3000;
app.get('/', (req, res) => {
    res.send({ headers: req.headers });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
