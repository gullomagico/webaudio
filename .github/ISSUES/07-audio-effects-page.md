# 🎛️ Demo Page: Audio Effects Processor

**Labels:** `enhancement`, `demo-page`, `priority-high`

## Overview
Create a multi-effects processor with chainable effects, demonstrating Web Audio API's audio processing capabilities.

## Features

### Input Sources
- **Audio file upload** (mp3, wav, ogg)
- **Microphone input** (with permission)
- **Test tone generator** (for quick testing)

### Effect Chain
Effects in order (user can reorder):
1. **Equalizer (3-band)**
   - Low band (100 Hz): ±12 dB
   - Mid band (1000 Hz): ±12 dB
   - High band (10000 Hz): ±12 dB

2. **Distortion**
   - Drive knob (1-100)
   - Waveshaper curve visualization
   - Tone control (low-pass filter after distortion)

3. **Delay**
   - Delay time (0-2000ms)
   - Feedback (0-95%)
   - Mix (dry/wet 0-100%)

4. **Reverb**
   - Impulse response selection (small room, large hall, plate, spring)
   - Reverb time visualization
   - Wet/dry mix (0-100%)

5. **Compressor**
   - Threshold (-100 to 0 dB)
   - Ratio (1:1 to 20:1)
   - Attack (0-1000ms)
   - Release (0-3000ms)
   - Makeup gain (0-24dB)
   - Gain reduction meter

### Global Controls
- **Bypass per effect** (toggle on/off)
- **Drag to reorder** effects in chain
- **Master output** volume
- **Output limiter** (prevent clipping)

### Visualization
- **Dual oscilloscope** (before/after processing)
- **Dual spectrum analyzer** (before/after)
- **Gain reduction meter** (for compressor)
- **Master VU meter**

### Export
- Download processed audio as WAV
- Real-time processing mode vs offline rendering

## Web Audio Nodes Used
- `BiquadFilterNode` (EQ, tone control)
- `WaveShaperNode` (distortion)
- `DelayNode` (delay effect)
- `ConvolverNode` (reverb)
- `DynamicsCompressorNode` (compressor)
- `GainNode` (mix controls, master volume)
- `AnalyserNode` (visualizations)

## File Location
- Page: `src/pages/audio-effects.astro`
- Container: `src/containers/AudioEffectsContainer.tsx`

## Component Dependencies
- ✅ FileUploader (from issue #3)
- ✅ Knob (from issue #1)
- ✅ Slider (from issue #1)
- ✅ XYPad (from issue #1) - for delay time/feedback
- ✅ ToggleButton (from issue #1)
- ✅ Oscilloscope (from issue #2)
- ✅ SpectrumAnalyzer (from issue #2)
- ✅ VUMeter (from issue #2)
- ✅ EffectsChain (from issue #3)
- ✅ PresetManager (from issue #3)

## Priority
**Phase 2** - High priority (demonstrates core Web Audio capabilities)

## Technical Notes
- Use ChannelSplitterNode/ChannelMergerNode for wet/dry mixing
- Load impulse responses for convolution reverb (include 3-4 default IRs)
- Create distortion curves algorithmically (tanh, hard clip, soft clip)
- Implement proper audio routing graph with bypass functionality
- Handle real-time vs offline rendering for export

## User Flow
1. User lands on `/audio-effects` page
2. Selects input source (upload file, mic, or test tone)
3. Enables desired effects in the chain
4. Adjusts effect parameters with knobs/sliders
5. Sees before/after visualization
6. Reorders effects by dragging
7. Saves favorite settings as preset
8. Downloads processed audio

## Acceptance Criteria
- [ ] All 5 effects implemented and working
- [ ] Effect chain reordering functional
- [ ] Bypass toggle per effect
- [ ] Dual visualization (before/after)
- [ ] File upload and microphone input working
- [ ] WAV export functional
- [ ] Preset save/load working
- [ ] No audio artifacts or clipping
- [ ] Real-time processing smooth (no lag)
- [ ] Responsive layout on mobile

## Additional Resources Needed
- Impulse response files for reverb (Creative Commons)
- Default audio test file (optional)

## Design Mockup Notes
- Effect chain displayed vertically on left
- Parameter controls in center panel
- Dual visualizations on right
- Master controls at bottom
- Dark theme with green accents
