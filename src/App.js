import React, { useState } from "react";
import Recorder from "mic-recorder-to-mp3";
import { Button, Paper, Typography } from "@mui/material";

const Mp3Recorder = new Recorder({
  bitRate: 128,
});

function App() {
  const [audioURL, setAudioURL] = useState("");

  const startRecording = () => {
    Mp3Recorder.start().then(() => {
      console.log("recording started");
    });
  };

  const stopRecording = () => {
    Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
      const url = URL.createObjectURL(blob);
      setAudioURL(url); 
    });
  };

  return (
    <div>
      <h1>Audio Recorder App</h1>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {audioURL && <audio src={audioURL} controls />}
    </div>
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
