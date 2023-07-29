const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs"); // Add this line to use the fs module

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

const apiKey = "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"; // Replace this with your OpenAI API key

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Audio file not provided" });
    }

    const audioData = req.file.buffer; // Access the binary data of the uploaded audio file
    console.log("the audio data" , audioData);
    const options = {
      contentType: "audio/mpeg",
    };

    // Create a new instance of OpenAIApi with the correct apiKey
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    const openai = new OpenAIApi(configuration);

    // Call the createTranscription method
    const resp = await openai.createTranscription(audioData, "whisper-1", options);
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
