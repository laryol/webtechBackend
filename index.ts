import express from 'express';
import cors from "cors";


//const cors = require('cors')


const port = process.env.PORT || 3000
const app = express()
const port1 = 3000

app.use(cors({
    origin: true,
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send({headers: req.headers})
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})