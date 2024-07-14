const express = require('express')
const cors = require('cors')
const PORT = 5000

const app = express()
app.use(express())

app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})