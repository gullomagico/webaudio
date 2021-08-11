import React, { useState, useEffect } from "react";
import Canvas from "./Canvas";
import { freq2range, range2freq } from "../functions";

//Setting Audio Context and Nodes
let actx = new AudioContext();
let whiteNoise = actx.createBufferSource();
let analyser = actx.createAnalyser();
let gainOut = actx.createGain();
let filter = actx.createBiquadFilter();
actx.suspend();

//Generate 2 sec of white noise buffer
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
analyser.connect(gainOut);
gainOut.connect(actx.destination);

gainOut.gain.setValueAtTime(0.1, actx.currentTime);

const Filter = () => {
  //Setting the state
  const [filterSettings, setFilterSettings] = useState({
    tempFreq: filter.frequency.value,
    frequency: filter.frequency.value,
    gain: filter.gain.value,
    detune: filter.detune.value,
    Q: filter.Q.value,
    type: filter.type,
  });
  //Functions
  const changeSetting = (e) => {
    let { value, id } = e.target;
    if (id === "frequency") {
      value = range2freq(value);
      setFilterSettings({
        ...filterSettings,
        tempFreq: value,
        frequency: value,
      });
      filter.frequency.value = value;
    } else {
      setFilterSettings({ ...filterSettings, [id]: value });
      filter[id].value = value;
    }
  };
  const changeType = (e) => {
    let { id } = e.target;
    setFilterSettings({ ...filterSettings, type: id });
    filter.type = id;
  };
  const changeTempFreq = (e) => {
    setFilterSettings({ ...filterSettings, tempFreq: e.target.value });
    if (e.key === "Enter") {
      setFilterSettings({ ...filterSettings, frequency: e.target.value });
      filter.frequency.value = e.target.value;
    }
  };

  return (
    <div>
      <h2>Biquad Filter</h2>
      <Canvas analyser={analyser} type="frequency" />
      <div>
        <button className="btn btn-success" onClick={() => actx.resume()}>
          Play
        </button>
        <button className="btn btn-danger" onClick={() => actx.suspend()}>
          Stop
        </button>
      </div>
      <div className="param">
        <h3>Frequency</h3>
        <input
          className="w-50 m-auto my-2"
          onChange={changeTempFreq}
          type="text"
          id="tempFreq"
          value={filterSettings.tempFreq}
          onKeyUp={changeTempFreq}
        />
        <input
          onChange={changeSetting}
          type="range"
          id="frequency"
          max="10000"
          value={freq2range(filterSettings.frequency)}
        />
      </div>
      <div className="param">
        <h3>Gain</h3>
        <input
          disabled={[
            "lowpass",
            "highpass",
            "bandpass",
            "notch",
            "allpass",
          ].includes(filterSettings.type)}
          onChange={changeSetting}
          type="range"
          id="gain"
          max="10"
          min="-10"
          step="0.1"
          value={filterSettings.gain}
        />
      </div>
      <div className="param">
        <h3>Q</h3>
        <input
          disabled={["lowshelf", "highshelf"].includes(filterSettings.type)}
          onChange={changeSetting}
          type="range"
          id="Q"
          max={
            ["lowpass", "highpass"].includes(filterSettings.type) ? "20" : "100"
          }
          min="0.01"
          step="0.01"
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
