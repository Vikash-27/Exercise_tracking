const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


app.listen(3001, () => {
    console.log("server is running on port 3001")
})

app.get("/run_exercie",function(req,res){
    console.log("run the exercise")
    res.send('super')
})