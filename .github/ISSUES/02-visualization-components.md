# 📊 Component Library: Visualization Components

**Labels:** `enhancement`, `component`, `visualization`, `priority-high`

## Overview
Create reusable audio visualization components for real-time audio analysis and display.

## Components to Implement

### 1. Oscilloscope.tsx (Time Domain)
- Grid overlay option
- Trigger mode selection
- Zoom controls
- Freeze frame capability
- Configurable colors and line width
- Props: `analyser`, `color`, `backgroundColor`, `lineWidth`, `showGrid`

### 2. SpectrumAnalyzer.tsx (Frequency Domain)
- Multiple modes: bars, line, filled
- Color schemes: gradient, solid
- Logarithmic scale option
- Peak hold indicators
- Frequency labels
- Props: `analyser`, `mode`, `colorScheme`, `logScale`, `showPeaks`

### 3. Waveform.tsx (Static Audio Buffer Display)
- Zoom and pan controls
- Region selection for loops
- Playhead marker
- Multi-channel support
- Props: `audioBuffer`, `color`, `height`, `onRegionSelect`

### 4. VUMeter.tsx (Volume Unit Meter)
- Horizontal and vertical orientation
- Peak hold indicator with auto-decay
- Clip warning (red zone)
- dB scale markings
- Stereo support (dual meters)
- Props: `analyser`, `orientation`, `showPeak`, `showNumeric`

### 5. Spectrogram.tsx (Time-Frequency Display)
- Real-time scrolling visualization
- Multiple color maps (viridis, magma, inferno)
- Configurable scroll speed
- Frequency resolution settings
- Props: `analyser`, `scrollSpeed`, `colorMap`

## File Location
`src/components/visualizers/`

## Dependencies
- React
- standardized-audio-context
- Canvas API

## Priority
**High** - Foundation for all demo pages

## Technical Notes
- Use `requestAnimationFrame` for smooth 60fps rendering
- Implement proper cleanup in `useEffect` hooks
- Consider performance optimization for large FFT sizes
- Build upon existing `Canvas.tsx` patterns

## Acceptance Criteria
- [ ] All 5 visualizers implemented
- [ ] Smooth 60fps rendering verified
- [ ] Proper memory cleanup (no leaks)
- [ ] Configurable appearance
- [ ] Responsive canvas sizing
- [ ] Works across different screen sizes
- [ ] No performance issues with continuous rendering
