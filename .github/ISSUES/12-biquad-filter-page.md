# 🎚️ Demo Page: Biquad Filter Explorer

**Labels:** `enhancement`, `demo-page`, `priority-high`, `in-progress`

## Overview
Complete the existing `biquadfilter.astro` page to demonstrate all BiquadFilterNode types with interactive controls and frequency response visualization.

## Status
Page skeleton exists at `src/pages/biquadfilter.astro` but is not implemented. This issue tracks completion.

## Features

### Input Sources
- **White noise generator** (default, great for filter testing)
- **Pink noise generator** (more natural for audio testing)
- **Tone generator** (sine wave, sweep)
- **Audio file upload**

### Filter Types (All BiquadFilter types)
1. **Lowpass** - Attenuates frequencies above cutoff
2. **Highpass** - Attenuates frequencies below cutoff
3. **Bandpass** - Passes frequencies in a band around cutoff
4. **Lowshelf** - Boosts/cuts all frequencies below cutoff
5. **Highshelf** - Boosts/cuts all frequencies above cutoff
6. **Peaking** - Boosts/cuts frequencies around cutoff
7. **Notch** - Attenuates frequencies at cutoff (opposite of bandpass)
8. **Allpass** - Changes phase without affecting amplitude

### Interactive Controls
- **Filter Type** selector (buttons or dropdown)
- **Frequency** knob: 20 Hz - 20 kHz (logarithmic)
- **Q/Resonance** knob: 0.0001 - 1000
- **Gain** knob: -40 dB to +40 dB (for peaking, lowshelf, highshelf)
- **Detune** slider: -1200 to +1200 cents (optional, advanced)

### Visualization
1. **Frequency Response Graph**
   - X-axis: Frequency (20 Hz - 20 kHz, logarithmic)
   - Y-axis: Gain (dB)
   - Real-time update as parameters change
   - Grid with frequency markers

2. **Phase Response Graph** (optional)
   - Shows phase shift across frequencies
   - Important for allpass filter

3. **Real-time Spectrum Analyzer**
   - Shows effect of filter on input signal
   - Before/after comparison mode

4. **Waveform Display**
   - Time domain view of filtered signal

### Presets/Examples
- **Radio Voice** (bandpass 300-3000 Hz)
- **Telephone** (bandpass 300-3400 Hz, high Q)
- **Bass Boost** (lowshelf +6dB at 80 Hz)
- **Treble Boost** (highshelf +4dB at 10 kHz)
- **Notch Hum Removal** (notch at 60 Hz for US power line hum)
- **Resonant Sweep** (lowpass with high Q for synth effects)

### Educational Features
- **Explanation panel** for each filter type
- **Interactive frequency response** (click to set cutoff)
- **Parameter tooltips** explaining Q, gain, etc.
- **Audio examples** demonstrating each filter type

## Web Audio Nodes Used
- `BiquadFilterNode` (the star of the show!)
- `OscillatorNode` or `AudioBufferSourceNode` (noise source)
- `AnalyserNode` (spectrum visualization)
- `GainNode` (master volume)

## File Location
- Page: `src/pages/biquadfilter.astro` (already exists)
- Container: `src/containers/BiquadFilterContainer.tsx` (create new)

## Component Dependencies
- ✅ Knob (from issue #1)
- ✅ Slider (from issue #1)
- ✅ RadioGroup (from issue #1)
- ✅ ToggleButton (from issue #1)
- ✅ SpectrumAnalyzer (from issue #2)
- ✅ Oscilloscope (from issue #2)
- ✅ FileUploader (from issue #3)
- Custom: FrequencyResponseGraph component (new)

## Priority
**Phase 1** - High priority (page already started, fundamental Web Audio feature)

## Technical Notes
### Frequency Response Calculation
```javascript
// Use BiquadFilterNode.getFrequencyResponse()
const frequencyArray = new Float32Array(numFrequencies);
const magResponse = new Float32Array(numFrequencies);
const phaseResponse = new Float32Array(numFrequencies);

// Fill frequencyArray with logarithmically spaced values
for (let i = 0; i < numFrequencies; i++) {
  frequencyArray[i] = 20 * Math.pow(20000/20, i/numFrequencies);
}

filter.getFrequencyResponse(frequencyArray, magResponse, phaseResponse);

// Convert magnitude to dB
const dBResponse = magResponse.map(mag => 20 * Math.log10(mag));
```

### Noise Generation
```javascript
// White noise using ScriptProcessorNode or AudioWorklet
// Or pre-generate buffer with random values -1 to 1
const bufferSize = 2 * audioContext.sampleRate;
const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = noiseBuffer.getChannelData(0);
for (let i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}
```

### Pink Noise Generation
- Apply 1/f filter to white noise
- Or use pre-generated pink noise algorithm

## User Flow
1. User lands on `/biquadfilter` page
2. Hears white noise playing through filter (default lowpass)
3. Selects different filter type from buttons
4. Adjusts frequency knob, sees frequency response update
5. Adjusts Q/resonance, hears effect of resonance
6. Switches to different input source (tone, pink noise, file)
7. Observes real-time spectrum analyzer showing filter effect
8. Tries preset examples
9. Learns about each filter type from info panels

## Acceptance Criteria
- [ ] All 8 filter types implemented
- [ ] Frequency response graph accurate and smooth
- [ ] Parameters update in real-time (no lag)
- [ ] White and pink noise generators working
- [ ] Tone generator with frequency sweep option
- [ ] Spectrum analyzer shows filter effect clearly
- [ ] Preset examples sound correct
- [ ] Educational content clear and helpful
- [ ] Mobile-friendly layout
- [ ] No audio artifacts or clicks when changing parameters

## Educational Content to Include
### Filter Type Descriptions
- **Lowpass**: "Removes high frequencies, creating a 'muffled' sound. Used for bass enhancement and removing harsh treble."
- **Highpass**: "Removes low frequencies, creating a 'thin' sound. Used for removing rumble and bass."
- **Bandpass**: "Keeps only a range of frequencies. Creates 'telephone' or 'radio' effects."
- **Peaking**: "Boosts or cuts a specific frequency range. The basis of EQ."
- etc.

### Parameter Explanations
- **Frequency/Cutoff**: "The center frequency where the filter has its maximum effect."
- **Q/Resonance**: "Controls the width of the filter. Higher Q = narrower, more resonant."
- **Gain**: "Amount of boost (+) or cut (-) in decibels. Only for shelf and peaking filters."

## Design Mockup Notes
- Top: Filter type selector (large buttons)
- Center-left: Large frequency response graph
- Center-right: Control knobs (Frequency, Q, Gain)
- Bottom-left: Input source selector
- Bottom-right: Spectrum analyzer and waveform
- Info panel (collapsible) explaining current filter type
- Preset buttons along bottom
- Green theme consistent with other pages
