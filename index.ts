import express from 'express';
import axios from "axios";
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
app.use(cors())


app.get('/api', (req, res) => {
    res.status(200).json({api: 'version 1'})
})
axios.get(`'https://webtechbackend.herokuapp.com/api'`,{headers: {'Access-Control-Allow-Origin': '*'}})
    .then(response => console.log(response.data))

app.use((req, res) => res.status(404).send({code: '404', message: 'no found'}))
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:`, port)
})


/* import express from 'express';
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


 */