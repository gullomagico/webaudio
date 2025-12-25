# 🎵 Demo Page: Sample Player & Looper

**Labels:** `enhancement`, `demo-page`, `priority-medium`

## Overview
Create an interactive audio sample player with 8-pad grid, loop controls, and live performance capabilities.

## Features

### Core Functionality
- Upload multiple audio samples (wav, mp3, ogg)
- 8-pad grid layout for sample triggering
- Keyboard mapping (keys 1-8 trigger pads)
- Visual feedback on pad activation

### Per-Pad Controls
- **Volume slider** (0-100%)
- **Pan control** (-100% L to +100% R)
- **Playback rate** (0.5x to 2x for pitch shifting)
- **Loop toggle** with loop point selection
- **Play mode**: One-shot vs Hold (plays while key pressed)
- **Sample assignment** (drag & drop or file picker)

### Visualization
- Waveform display for each loaded sample
- Loop region selector (drag to set start/end points)
- Playhead marker during playback
- VU meter for master output

### Master Controls
- Master volume
- Master output meter with peak indicators
- Record live performance to WAV (optional future enhancement)

## Web Audio Nodes Used
- `AudioBufferSourceNode` (one per triggered sample)
- `GainNode` (per-pad volume + master volume)
- `StereoPannerNode` (per-pad panning)
- `AnalyserNode` (for master VU meter)

## File Location
- Page: `src/pages/sample-player.astro`
- Container: `src/containers/SamplePlayerContainer.tsx`

## Component Dependencies
- ✅ FileUploader (from issue #3)
- ✅ Waveform (from issue #2)
- ✅ Slider (from issue #1)
- ✅ ToggleButton (from issue #1)
- ✅ VUMeter (from issue #2)
- Custom: SamplePad component (create inline)

## Priority
**Phase 2** - Medium priority (simpler implementation, good demo of AudioBuffer)

## Technical Notes
- Each sample trigger creates a new AudioBufferSourceNode (they're one-time use)
- Implement proper cleanup of old source nodes
- Handle simultaneous sample playback (polyphony)
- Loop points stored as sample indices

## User Flow
1. User lands on `/sample-player` page
2. Uploads audio files (or use default samples)
3. Assigns samples to pads (drag & drop or click to assign)
4. Adjusts per-pad settings (volume, pan, rate, loop)
5. Triggers samples via mouse click or keyboard (1-8)
6. Sees waveform and playhead visualization
7. Can save/load pad configurations (uses PresetManager)

## Acceptance Criteria
- [ ] 8-pad grid fully functional
- [ ] Keyboard triggering (1-8) works
- [ ] File upload and assignment working
- [ ] Per-pad controls affect audio correctly
- [ ] Loop points selectable and functional
- [ ] Waveform visualization shows playhead
- [ ] Master VU meter responsive
- [ ] No audio glitches or clicks
- [ ] Mobile-friendly layout
- [ ] Preset save/load working

## Design Mockup Notes
- Grid layout: 2x4 pads
- Each pad shows: sample name, waveform preview, controls
- Controls panel on right side
- Master section at bottom
- Green theme consistent with existing pages
