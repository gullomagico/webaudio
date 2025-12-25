# 📈 Demo Page: Advanced Frequency Analyzer

**Labels:** `enhancement`, `demo-page`, `priority-medium`

## Overview
Create a professional-grade spectrum analyzer with multiple visualization modes, advanced analysis features, and data export capabilities.

## Features

### Input Sources
- Audio file upload
- Microphone input (real-time analysis)
- Line input (if available)
- Test tone generator

### Visualization Modes
1. **Spectrum (Bar Graph)**
   - Vertical bars for each frequency bin
   - Color gradient based on amplitude
   - Logarithmic or linear frequency scale

2. **Spectrum (Line Graph)**
   - Continuous line plot
   - Peak hold overlay
   - Smoothing options

3. **Spectrogram (Waterfall)**
   - Time-frequency heatmap
   - Scrolling or 3D waterfall mode
   - Color maps: Viridis, Magma, Inferno, Grayscale

4. **Octave Bands (RTA)**
   - 1/1 octave, 1/3 octave, or 1/6 octave bands
   - Standard audio frequency bands
   - ISO preferred frequencies

### Analysis Features
- **Peak Frequency Detection**
  - Shows frequency and amplitude of highest peak
  - Multiple peak detection (top 5 peaks)
  - Harmonic analysis (fundamental + harmonics)

- **Frequency Range Zoom**
  - Focus on specific range (e.g., 20-200 Hz bass)
  - Presets: Sub-bass, Bass, Mids, Highs, Full

- **Weighting Filters**
  - A-weighting (human hearing simulation)
  - C-weighting (high-level sounds)
  - Z-weighting (flat/unweighted)

- **Statistics Panel**
  - RMS level (dB)
  - Peak level (dB)
  - Crest factor
  - THD (Total Harmonic Distortion) estimation

### Controls
- **FFT Size**: 256, 512, 1024, 2048, 4096, 8192, 16384, 32768
- **Windowing Function**: Hann, Hamming, Blackman
- **Smoothing**: 0-90% (time smoothing)
- **Update Rate**: 10-60 fps
- **dB Range**: -100 to 0 dB (adjustable min/max)

### Display Options
- **Grid overlay** with frequency labels
- **dB scale** on Y-axis
- **Frequency labels** on X-axis (Hz, kHz)
- **Peak hold** (persistence time adjustable)
- **Freeze/Capture** mode (pause display)

### Export Features
- Export current spectrum as **CSV** (frequency, amplitude pairs)
- Export spectrogram as **PNG image**
- Export analysis report as **JSON**
- Copy peak frequencies to clipboard

## Web Audio Nodes Used
- `AnalyserNode` (with configurable FFT size)
- `GainNode` (input level control)
- `BiquadFilterNode` (A/C weighting filters)
- `MediaStreamAudioSourceNode` (microphone)

## File Location
- Page: `src/pages/frequency-analyzer.astro`
- Container: `src/containers/FrequencyAnalyzerContainer.tsx`

## Component Dependencies
- ✅ SpectrumAnalyzer (from issue #2) - enhance with new features
- ✅ Spectrogram (from issue #2)
- ✅ RadioGroup (from issue #1)
- ✅ Slider (from issue #1)
- ✅ ToggleButton (from issue #1)
- ✅ FileUploader (from issue #3)
- ✅ NumberInput (from issue #4)
- ✅ Panel (from issue #4)

## Priority
**Phase 4** - Medium priority (professional tool, good showcase)

## Technical Notes
### FFT Size vs Resolution
- Higher FFT = better frequency resolution, slower update
- FFT 2048 @ 48kHz = 23.4 Hz per bin
- FFT 8192 @ 48kHz = 5.9 Hz per bin

### Frequency Bin Calculation
```javascript
frequencyBin = (binIndex * sampleRate) / fftSize
```

### A-Weighting Filter
- Series of BiquadFilters approximating A-weighting curve
- High-pass + peaking filters
- Standard for SPL measurements

### Octave Band Calculation
- Center frequencies: 31.5, 63, 125, 250, 500, 1k, 2k, 4k, 8k, 16k Hz
- Bandwidth: center / (2^(1/n)) where n = octave fraction

## User Flow
1. User lands on `/frequency-analyzer` page
2. Selects input source (file, mic, or tone)
3. Chooses visualization mode
4. Adjusts FFT size for desired resolution
5. Enables peak detection and weighting filters
6. Zooms into frequency range of interest
7. Uses freeze mode to capture specific moment
8. Exports spectrum data or screenshot
9. Analyzes harmonic content or resonances

## Acceptance Criteria
- [ ] All 4 visualization modes working
- [ ] FFT size selection affects resolution correctly
- [ ] Peak detection accurate (±1 bin tolerance)
- [ ] A/C weighting filters implemented correctly
- [ ] Octave band mode displays standard frequencies
- [ ] Frequency zoom working smoothly
- [ ] Freeze mode captures and holds display
- [ ] CSV export contains accurate data
- [ ] PNG export captures current visualization
- [ ] Real-time microphone input responsive
- [ ] No performance issues at high FFT sizes
- [ ] Accurate frequency and dB labels

## Use Cases / Examples
1. **Music Production**: Identify problem frequencies in a mix
2. **Acoustic Analysis**: Analyze room modes and resonances
3. **Educational**: Visualize harmonics of musical instruments
4. **Testing**: Measure frequency response of audio equipment
5. **Voice Analysis**: Examine formants in speech

## Educational Content
- Explanation of FFT and frequency bins
- What A-weighting represents
- How to interpret spectrograms
- Common frequency ranges (sub-bass, bass, mids, etc.)

## Design Mockup Notes
- Large visualization area (60% of screen)
- Controls panel on right (FFT, mode, filters)
- Statistics panel on bottom-left
- Peak frequency display (large, prominent)
- Professional dark theme (blacks and grays)
- Green accents for active elements
- Gridlines for scientific aesthetic
