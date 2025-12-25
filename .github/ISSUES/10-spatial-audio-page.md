# 🎧 Demo Page: 3D Spatial Audio Panner

**Labels:** `enhancement`, `demo-page`, `priority-low`

## Overview
Create an interactive 3D audio panner demonstrating Web Audio's spatial audio capabilities with PannerNode and AudioListener.

## Features

### Audio Source
- Upload audio file or use test tone
- Play/pause control
- Loop toggle

### 3D Positioning
- **XY Pad** for horizontal position (azimuth/elevation)
- **Distance slider** (0.1 - 100 meters)
- **Visual 3D representation** (top-down and side view)
- **Listener position** control (optional)

### Panner Settings
- **Distance Model**: Linear, Inverse, Exponential
- **Rolloff Factor**: 0 - 10 (how quickly sound fades with distance)
- **Max Distance**: 1 - 10000 (beyond which volume doesn't decrease)
- **Ref Distance**: 1 - 1000 (reference distance for volume calculation)

### Sound Cone (Directional Audio)
- **Inner Cone Angle**: 0° - 360° (full volume area)
- **Outer Cone Angle**: 0° - 360° (transition area)
- **Outer Gain**: 0 - 1 (volume outside outer cone)
- **Orientation** controls (X, Y, Z vectors)

### Listener Settings
- **Position**: X, Y, Z coordinates
- **Orientation**: Forward and up vectors
- **Head rotation** simulation (yaw, pitch, roll)

### Presets/Scenarios
- Concert Hall (listener in audience)
- Flyby (sound moves past listener)
- Circling Source (orbits around listener)
- Approaching Car (demonstrates Doppler if available)

### Visualization
- **3D scene** showing listener (head icon) and source (speaker icon)
- **Distance indicator** (line between listener and source)
- **Cone visualization** (shows directional coverage)
- **Waveform/Spectrum** analyzer

## Web Audio Nodes Used
- `PannerNode` (spatial audio positioning)
- `AudioListener` (from AudioContext)
- `AudioBufferSourceNode` or `OscillatorNode` (sound source)
- `GainNode` (master volume)
- `AnalyserNode` (visualization)

## File Location
- Page: `src/pages/spatial-audio.astro`
- Container: `src/containers/SpatialAudioContainer.tsx`

## Component Dependencies
- ✅ XYPad (from issue #1)
- ✅ Slider (from issue #1)
- ✅ Knob (from issue #1)
- ✅ RadioGroup (from issue #1)
- ✅ FileUploader (from issue #3)
- ✅ Oscilloscope (from issue #2)
- Custom: 3D visualization canvas

## Priority
**Phase 4** - Low priority (advanced feature, requires 3D visualization)

## Technical Notes
- PannerNode uses HRTF (Head-Related Transfer Function) for realistic 3D audio
- Coordinates: X = left/right, Y = up/down, Z = forward/back
- Right-handed coordinate system (X right, Y up, Z back)
- AudioListener is a singleton on AudioContext
- May require headphones for best spatial experience

### Distance Models
- **Linear**: `1 - rolloffFactor * (distance - refDistance) / (maxDistance - refDistance)`
- **Inverse**: `refDistance / (refDistance + rolloffFactor * (distance - refDistance))`
- **Exponential**: `pow(distance / refDistance, -rolloffFactor)`

## User Flow
1. User lands on `/spatial-audio` page
2. Uploads audio file or starts test tone
3. Drags source position on XY pad
4. Adjusts distance with slider
5. Sees 3D visualization update in real-time
6. Hears audio pan and attenuate based on position
7. Experiments with distance models
8. Configures sound cone for directional audio
9. Tries preset scenarios
10. Adjusts listener orientation (head rotation)

## Acceptance Criteria
- [ ] PannerNode positioning working (X, Y, Z)
- [ ] Distance affects volume correctly
- [ ] All distance models implemented
- [ ] Sound cone visualization and function working
- [ ] Listener orientation affects audio
- [ ] 3D visualization accurate and clear
- [ ] Preset scenarios functional
- [ ] Headphone experience recommended (notice in UI)
- [ ] Smooth parameter updates (no audio glitches)
- [ ] Works with uploaded audio and test tones

## Educational Content
- Explanation of HRTF and binaural audio
- When to use each distance model
- Real-world applications (VR, gaming, AR)
- Diagram of coordinate system

## Design Mockup Notes
- Center: Large 3D visualization (top-down and side view)
- Left panel: Position and distance controls
- Right panel: Panner settings and cone controls
- Bottom: Audio controls and analyzer
- Info tooltip explaining headphone requirement
- Preset buttons for quick demos
