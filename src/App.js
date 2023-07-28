import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

function App() {
  const addAudioElement = (blob) => {
    // Create a URL for the audio
    const audioUrl = URL.createObjectURL(blob);

    // Create an <audio> element for playing the recorded audio
    const audio = document.createElement("audio");
    audio.src = audioUrl;
    audio.controls = true;

    // Append the audio element to the DOM
    document.body.appendChild(audio);
  };

  return (
    <div>
      <h1>Audio Recorder App</h1>
      <AudioRecorder
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        downloadOnSavePress={true}
        downloadFileExtension="mp3" // Set the download extension to "mp3"
      />
    </div>
  );
}

export default App;
