import React, { useState } from "react";
import Recorder from "mic-recorder-to-mp3";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";

const Mp3Recorder = new Recorder({
  bitRate: 128,
});

function App() {
  const [audioURL, setAudioURL] = useState("");
  const [recording, setRecording] = useState(false);

  const startRecording = () => {
    Mp3Recorder.start().then(() => {
      setRecording(true);
    });
  };

  const stopRecording = async () => {
    try {
      const [buffer, blob] = await Mp3Recorder.stop().getMp3();
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setRecording(false);
      // You can now send the audio blob to the backend
      sendAudioToBackend(blob);
    } catch (error) {
      console.error("Error converting audio to MP3:", error.message);
    }
  };
  

  const sendAudioToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.mp3");

      const response = await axios.post("http://localhost:5000/transcribe", formData);
      console.log(response.data.transcript);
    } catch (error) {
      console.error("Error sending audio to backend:", error.message);
    }
  };

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{ padding: "16px", margin: "16px", maxWidth: "400px" }}
          >
            <Typography variant="h5">Audio Recorder App</Typography>
            <Box sx={{ marginTop: "40px" }}>
              <Button
                variant="contained"
                onClick={recording ? stopRecording : startRecording}
              >
                {recording ? "Stop Recording" : "Start Recording"}
              </Button>
            </Box>
            {audioURL && (
              <Box sx={{ marginTop: "40px" }}>
                <audio src={audioURL} controls style={{ marginTop: "16px" }} />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
