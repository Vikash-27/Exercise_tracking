const express = require('express');
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json())
// Define storage settings for multer
const storage = multer.diskStorage({
    destination: './upload/', // make sure this matches your folder structure
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Serve static files correctly
app.use(express.static(path.join(__dirname))); // This should serve your 'index.html', 'style.css', and 'script.js' with the correct MIME types

// Define the route for the root of your app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the POST request for file uploads
app.post('/upload', async(req, res) => {

    // Send back a "processing" status immediately
    // res.status(202).json({ message: 'Processing...' });

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
