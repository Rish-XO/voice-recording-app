const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add the cors middleware to allow requests from any origin

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit
  },
});

const apiKey = "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"; // Replace this with your OpenAI API key
const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    const audioData = req.file.buffer; // Access the binary data of the uploaded audio file
    const options = {
      contentType: "audio/mpeg",
    };
    const resp = await openai.createTranscription(audioData, "whisper-1", options);
    const transcript = resp.data.text;
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
