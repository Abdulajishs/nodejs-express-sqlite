const express = require('express');
const cors = require('cors');
const path = require('path')
const port = process.env.PORT || 8080;

const app = express();

// cors options
let corsOptions = {
    origin: "http://localhost:8081"
}

// Apply Middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Import and use the router
const tutorialRoutes = require(path.join(__dirname,'app','routes','tutorial.routes.js'));
app.use('/api/tutorials',tutorialRoutes)

// test route
app.get('/',(req,res)=>{
    res.json({message : "Welcome to bezkoder application."})
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})