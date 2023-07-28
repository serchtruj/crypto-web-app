const express = require('express')
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())

app.get('/api/v1', (req, res) => {
    res.send({ message: "Hello from server" })
});

app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`)
})
