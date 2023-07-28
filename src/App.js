import React, { useState } from "react";
import Recorder from "mic-recorder-to-mp3";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
// using material UI for component building

//initial representing of recorder at bitRate: 128
const Mp3Recorder = new Recorder({
  bitRate: 128,
});

function App() {
  const [audioURL, setAudioURL] = useState(""); // showing the audio element with react state
  const [recording, setRecording] = useState(false); // recording state for button change

  //start recording function
  const startRecording = () => {
    Mp3Recorder.start().then(() => {
      setRecording(true);
    });
  };

  // stop recording function
  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const url = URL.createObjectURL(blob); // creating url for rendering the audio
        setAudioURL(url);
        setRecording(false);
      });
  };

  return (
    <Container sx={{marginLeft: "500px"}}>
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
    </Container>
  );
}

export default App;