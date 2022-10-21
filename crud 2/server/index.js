const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoute = require('./routes/taskRoute')

const PORT = 5400;

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', taskRoute)
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req,res, next) => {
    return res.json({
        message: 'Error!!!'
    })
})

app.listen(PORT, () => {
    console.log(`server demarer sur http://localhost:${PORT}`)
})