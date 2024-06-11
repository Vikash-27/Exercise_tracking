const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())



// Serve static files correctly
app.use(express.static(path.join(__dirname))); // This should serve your 'index.html', 'style.css', and 'script.js' with the correct MIME types

// Define the route for the root of your app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the POST request for file uploads
app.post('/pushup', async(req, res) => {

    // Run Python script
    
    console.log("form data", req.body)
    const pythonProcess = spawn('python', [req.body.scriptname, 'data']);

    // Collect data from script
    let scriptOutput = '';
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
        console.log(scriptOutput)
    });
    res.send('done')
 

});

app.post('/squat', async(req, res) => {

    // Run Python script
    
    console.log("form data", req.body)
    const pythonProcess = spawn('python', [req.body.scriptname, 'data']);

    // Collect data from script
    let scriptOutput = '';
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
        console.log(scriptOutput)
    });
    res.send('done')
});

app.post('/highknees', async(req, res) => {


    // Run Python script
    
    console.log("form data", req.body)
    const pythonProcess = spawn('python', [req.body.scriptname, 'data']);

    // Collect data from script
    let scriptOutput = '';
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
        console.log(scriptOutput)
    });
    res.send('done')
 

});

app.post('/bicepcurl', async(req, res) => {

   

    // Run Python script
    
    console.log("form data", req.body)
    const pythonProcess = spawn('python', [req.body.scriptname, 'data']);

    // Collect data from script
    let scriptOutput = '';
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
        console.log(scriptOutput)
    });
    res.send('done')

});

app.post('/shoulderpress', async(req, res) => {

    

    // Run Python script
    
    console.log("form data", req.body)
    const pythonProcess = spawn('python', [req.body.scriptname, 'data']);

    // Collect data from script
    let scriptOutput = '';
    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
        console.log(scriptOutput)
    });
    res.send('done')
 

});

// Set the port the server will listen on
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
