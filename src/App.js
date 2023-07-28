import React, { useState } from "react";
import Recorder from "mic-recorder-to-mp3";
import { Box, Button, Container, Paper, Typography } from "@mui/material";

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

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setRecording(false);
      });
  };

  return (
    <Container>
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

// import React from "react";
// import { AudioRecorder } from "react-audio-voice-recorder";

// function App() {
//   const addAudioElement = (blob) => {
//     // Create a URL for the audio
//     const audioUrl = URL.createObjectURL(blob);

//     // Create an <audio> element for playing the recorded audio
//     const audio = document.createElement("audio");
//     audio.src = audioUrl;
//     audio.controls = true;

//     // Append the audio element to the DOM
//     document.body.appendChild(audio);
//   };

//   return (
//     <div>
//       <h1>Audio Recorder App</h1>
//       <AudioRecorder
//         onRecordingComplete={addAudioElement}
//         audioTrackConstraints={{
//           noiseSuppression: true,
//           echoCancellation: true,
//         }}
//         downloadOnSavePress={true}
//         downloadFileExtension="mp3" // Set the download extension to "mp3"
//       />
//     </div>
//   );
// }

// export default App;
