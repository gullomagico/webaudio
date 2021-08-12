import React, { useState } from "react";
import Canvas from "./Canvas";
import { freq2range, range2freq } from "../functions";

//Setting Audio Context and Nodes
let actx = new (window.AudioContext || window.webkitAudioContext)();
let out = actx.destination;
actx.suspend();

let osc = actx.createOscillator();

let gain = actx.createGain();
let gainOut = actx.createGain();
gain.gain.value = 0.2;
gainOut.gain.value = 0.1; // this oscillator is TOO LOUD.

let analyser = actx.createAnalyser();

osc.connect(gain);
gain.connect(analyser);
gain.connect(gainOut);
gainOut.connect(out);

osc.start();

const Osc = () => {
  //Setting the state
  const [oscSettings, setOscSettings] = useState({
    tempFreq: osc.frequency.value,
    frequency: osc.frequency.value,
    detune: osc.detune.value,
    gain: gain.gain.value,
    type: osc.type,
  });
  //Functions
  const changeSetting = (e) => {
    let { value, id } = e.target;
    if (id === "frequency") {
      value = range2freq(value);
      setOscSettings({ ...oscSettings, tempFreq: value, frequency: value });
      osc.frequency.linearRampToValueAtTime(value, actx.currentTime + 0.1);
    } else if (id === "gain") {
      setOscSettings({ ...oscSettings, gain: value });
      gain.gain.linearRampToValueAtTime(value, actx.currentTime + 0.1);
    } else {
      setOscSettings({ ...oscSettings, [id]: value });
      osc[id].linearRampToValueAtTime(value, actx.currentTime + 0.1);
    }
  };
  const changeType = (e) => {
    let { id } = e.target;
    setOscSettings({ ...oscSettings, type: id });
    osc.type = id;
  };
  const changeTempFreq = (e) => {
    setOscSettings({ ...oscSettings, tempFreq: e.target.value });
    if (e.key === "Enter") {
      setOscSettings({ ...oscSettings, frequency: e.target.value });
      osc.frequency.linearRampToValueAtTime(
        e.target.value,
        actx.currentTime + 0.1
      );
    }
  };

  return (
    <div>
      <h1>Oscillator</h1>
      <Canvas analyser={analyser} type="time" />
      <div>
        <button className="btn btn-success" onClick={() => actx.resume()}>
          Play
        </button>
        <button className="btn btn-danger" onClick={() => actx.suspend()}>
          Stop
        </button>
      </div>
      <div className="param">
        <h3>Gain</h3>
        <input
          onChange={changeSetting}
          type="range"
          id="gain"
          min="0"
          step="0.001"
          max="1"
          value={oscSettings.gain}
        />
      </div>
      <div className="param">
        <h3>Frequency</h3>
        <input
          className="w-50 m-auto my-2"
          onChange={changeTempFreq}
          type="text"
          id="tempFreq"
          value={oscSettings.tempFreq}
          onKeyUp={changeTempFreq}
        />
        <input
          onChange={changeSetting}
          type="range"
          id="frequency"
          max="10000"
          value={freq2range(oscSettings.frequency)}
        />
      </div>
      <div className="param">
        <h3>Detune</h3>
        <input
          onChange={changeSetting}
          type="range"
          id="detune"
          max="100"
          min="-100"
          value={oscSettings.detune}
        />
      </div>
      <div className="param">
        <h3>Wave</h3>
        <button
          id="sine"
          onClick={changeType}
          className={`${oscSettings.type === "sine" && "active"}`}
        >
          Sine
        </button>
        <button
          id="triangle"
          onClick={changeType}
          className={`${oscSettings.type === "triangle" && "active"}`}
        >
          Triangle
        </button>
        <button
          id="square"
          onClick={changeType}
          className={`${oscSettings.type === "square" && "active"}`}
        >
          Square
        </button>
        <button
          id="sawtooth"
          onClick={changeType}
          className={`${oscSettings.type === "sawtooth" && "active"}`}
        >
          Sawtooth
        </button>
      </div>
    </div>
  );
};

export default Osc;
