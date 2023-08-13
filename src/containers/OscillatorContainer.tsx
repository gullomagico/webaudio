import React, { useState } from 'react';
import Canvas from '../components/Canvas';
import { sleep } from '../libs/funcs';
import { AudioContext, TOscillatorType } from 'standardized-audio-context';

const actx = new AudioContext();
const out = actx.destination;
actx.suspend();

const osc = actx.createOscillator();

const gainNode = actx.createGain();
gainNode.gain.value = 0.1;

const analyser = actx.createAnalyser();

osc.connect(gainNode);
gainNode.connect(analyser);
gainNode.connect(out);

osc.start();

let gainLevel = gainNode.gain.value;

const GainInput: React.FC = () => {
  const [gain, setGain] = useState(gainNode.gain.value);

  const handleGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    gainLevel = value;
    setGain(value);
    gainNode.gain.value = value;
  };

  return (
    <>
      <label id="gain-label" className="invisible absolute" htmlFor="gain">
        Gain level:
      </label>
      <input
        className="w-full max-w-sm accent-green-600"
        onChange={(e) => handleGainChange(e)}
        type="range"
        id="gain"
        min="0"
        step="0.006"
        max="0.6"
        value={gain}
        aria-labelledby="gain-label"
      />
    </>
  );
};

const FreqInput: React.FC = () => {
  const [frequency, setFrequency] = useState(osc.frequency.value);

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;
    setFrequency(value);
  };

  const setFrequencyValue = () => {
    osc.frequency.linearRampToValueAtTime(frequency, actx.currentTime + 0.1);
  };

  return (
    <>
      <label id="freq-label" className="invisible absolute" htmlFor="freq">
        Frequency:
      </label>
      <input
        className="appereance-none w-full max-w-sm rounded-lg border-2 border-green-600 bg-green-950 text-center text-5xl text-green-300 accent-green-700"
        onChange={(e) => handleFrequencyChange(e)}
        id="freq"
        type="number"
        min="20"
        max="20000"
        value={frequency}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setFrequencyValue();
        }}
        onBlur={() => setFrequencyValue()}
        aria-labelledby="freq-label"
      />
      <p className="text-xs">
        Premi "Enter" per confermare il valore di frequenza da utilizzare
      </p>
    </>
  );
};

const TypeInput: React.FC = () => {
  const [type, setType] = useState(osc.type);

  const handleTypeChange = (type: TOscillatorType) => {
    setType(type);
    osc.type = type;
  };

  const active = 'bg-green-500 text-green-950';

  return (
    <div className="flex max-w-lg rounded-lg border-2 border-green-500 bg-green-950 text-green-300">
      <button
        onClick={() => handleTypeChange('sine')}
        className={`p-2 font-medium  ${type === 'sine' && active}`}
      >
        Sine
      </button>
      <button
        onClick={() => handleTypeChange('triangle')}
        className={`p-2 font-medium ${type === 'triangle' && active}`}
      >
        Triangle
      </button>
      <button
        onClick={() => handleTypeChange('square')}
        className={`p-2 font-medium ${type === 'square' && active}`}
      >
        Square
      </button>
      <button
        onClick={() => handleTypeChange('sawtooth')}
        className={`p-2 font-medium ${type === 'sawtooth' && active}`}
      >
        Sawtooth
      </button>
    </div>
  );
};

const TogglePlay: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  const active = 'border-green-600 bg-green-950 text-green-300';
  const inactive = 'border-red-600 bg-red-950 text-red-300';

  const toggleState = async () => {
    if (playing) {
      gainNode.gain.linearRampToValueAtTime(0, actx.currentTime + 0.1);
      await sleep(110);
      await actx.suspend();
      setPlaying(false);
    } else {
      await actx.resume();
      gainNode.gain.linearRampToValueAtTime(gainLevel, actx.currentTime + 0.1);
      setPlaying(true);
    }
  };

  return (
    <button
      className={`rounded-lg border-2 p-2 px-5 ${playing ? inactive : active}`}
      onClick={() => toggleState()}
    >
      {playing ? 'Stop' : 'Play'}
    </button>
  );
};

const Container: React.FC = () => {
  return (
    <React.StrictMode>
      <div className="mt-7 flex flex-col items-center gap-y-5">
        {/* <Canvas analyser={analyser} type="time" /> */}
        <FreqInput />
        <TogglePlay />
        <GainInput />
        <TypeInput />
      </div>
      <div className="warning-banner">
        <p className="text-green-500">
          <strong>Avviso:</strong>
        </p>
        <p>
          Questo sito utilizza le Web Audio API per generare audio attraverso
          oscillatori con frequenze da 20 a 20.000 Hz. L'ascolto prolungato a
          volumi elevati potrebbe causare danni all'udito. Si consiglia di{' '}
          <strong className="text-gradient">abbassare il volume</strong> e
          limitare il tempo di esposizione.
        </p>
        <p>
          L'uso scorretto delle Web Audio API potrebbe anche comportare rischi
          aggiuntivi, tra cui:
        </p>
        <ul>
          <li>
            Danni all'hardware audio, come altoparlanti o cuffie, a causa di
            segnali ad alta intensità.
          </li>
          <li>
            Rischio di disturbi nel sonno, ansia o stress dovuti all'esposizione
            a suoni intensi o fastidiosi.
          </li>
          <li>
            Potenziali interferenze con apparecchiature mediche, come pacemaker,
            nei pazienti sensibili.
          </li>
          <li>
            Possibilità di causare disagio o fastidio a persone con
            ipersensibilità a certe frequenze.
          </li>
        </ul>
        <p>
          Si prega di prestare attenzione all'uso delle Web Audio API e di
          adottare misure di precauzione adeguate per proteggere la tua salute e
          l'integrità delle apparecchiature audio.
        </p>
      </div>
    </React.StrictMode>
  );
};

export default Container;
