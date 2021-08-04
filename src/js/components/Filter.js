import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";

//Setting Audio Context and Nodes
let actx = new AudioContext();
let whiteNoise = actx.createBufferSource();
let analyser = actx.createAnalyser();
let gain = actx.createGain();
let filter = actx.createBiquadFilter();
actx.suspend();

//Generate white noise buffer
let bufferSize = 2 * actx.sampleRate,
  noiseBuffer = actx.createBuffer(1, bufferSize, actx.sampleRate),
  output = noiseBuffer.getChannelData(0);
for (var i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}
whiteNoise.buffer = noiseBuffer;
whiteNoise.loop = true;
whiteNoise.start(0);
whiteNoise.connect(filter);
filter.connect(analyser);
analyser.connect(gain);
gain.connect(actx.destination);

gain.gain.setValueAtTime(0.2, actx.currentTime);

const Filter = () => {
  //Setting the state
  const [filterSettings, setFilterSettings] = useState({
    frequency: filter.frequency.value,
    detune: filter.detune.value,
    type: filter.type,
  });
  //When components unmount, turn off audio context
  useEffect(() => {
    console.log("Mounted");
    return () => {
      console.log("Unmounted");
    };
  });
  //Functions
  const changeSetting = (e) => {
    let { value, id } = e.target;
    setFilterSettings({ ...filterSettings, [id]: value });
    filter[id].value = value;
  };
  const changeType = (e) => {
    let { id } = e.target;
    setFilterSettings({ ...filterSettings, type: id });
    filter.type = id;
  };

  return (
    <div className="control">
      <h2>Filter</h2>
      <div>
        <button onClick={() => actx.resume()}>Play</button>
        <button onClick={() => actx.suspend()}>Stop</button>
      </div>
      <Canvas analyser={analyser} type="frequency" />
      <div className="param">
        <h3>Frequency</h3>
        <input
          onChange={changeSetting}
          type="text"
          id="frequency"
          value={filter.frequency.value}
        />
        <input
          onChange={changeSetting}
          type="range"
          id="frequency"
          max="2000"
          min="20"
          value={filter.frequency.value}
        />
      </div>
      <div className="param">
        <h3>Q</h3>
        <input
          onChange={changeSetting}
          type="range"
          id="Q"
          max="10"
          min="0"
          step="0.1"
          value={filterSettings.Q}
        />
      </div>
      <div className="param">
        <h3>Type</h3>
        <button
          id="lowpass"
          onClick={changeType}
          className={`${filterSettings.type === "lowpass" && "active"}`}
        >
          Lowpass
        </button>
        <button
          id="highpass"
          onClick={changeType}
          className={`${filterSettings.type === "highpass" && "active"}`}
        >
          Highpass
        </button>
        <button
          id="bandpass"
          onClick={changeType}
          className={`${filterSettings.type === "bandpass" && "active"}`}
        >
          Bandpass
        </button>
        <button
          id="lowshelf"
          onClick={changeType}
          className={`${filterSettings.type === "lowshelf" && "active"}`}
        >
          Lowshelf
        </button>
        <button
          id="highshelf"
          onClick={changeType}
          className={`${filterSettings.type === "highshelf" && "active"}`}
        >
          Highshelf
        </button>
        <button
          id="peaking"
          onClick={changeType}
          className={`${filterSettings.type === "peaking" && "active"}`}
        >
          Peaking
        </button>
        <button
          id="notch"
          onClick={changeType}
          className={`${filterSettings.type === "notch" && "active"}`}
        >
          Notch
        </button>
        <button
          id="allpass"
          onClick={changeType}
          className={`${filterSettings.type === "allpass" && "active"}`}
        >
          Allpass
        </button>
      </div>
    </div>
  );
};

export default Filter;
