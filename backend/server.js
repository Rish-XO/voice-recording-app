const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const { Readable } = require('stream');
const fs = require("fs"); 
const cors = require("cors");
const axios = require("axios");

const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
});

// Function to convert a buffer to a readable stream
const bufferToStream = (buffer) => {
    return Readable.from(buffer);
  };
  

const apiKey = "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"; // Replace this with your OpenAI API key and should store in dotenv

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Audio file not provided" });
    }

    const audioData = req.file.buffer; // Access the binary data of the uploaded audio file

    // Create a readable stream from the audio buffer using the bufferToStream function
    const audioStream = bufferToStream(audioData);

    // Create a new instance of OpenAIApi with the correct apiKey
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    
    const openai = new OpenAIApi(configuration);

    // Call the createTranscription method with the audio stream
    const resp = await openai.createTranscription(audioStream, "whisper-1");
    const transcript = resp.data.text;
    console.log("Transcript:", transcript);

    // You can save the transcript to a file or do any further processing here
    // For now, we will just send the transcript back to the frontend
    res.json({ transcript });
  } catch (error) {
    console.error("Error transcribing audio:", error.message);
    res.status(500).json({ error: "Error transcribing audio" });
  }
});

const port = 5000; // Choose a port number for your backend server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

