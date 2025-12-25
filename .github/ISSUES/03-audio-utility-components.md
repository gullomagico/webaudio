# 🎹 Component Library: Audio Utility Components

**Labels:** `enhancement`, `component`, `audio`, `priority-medium`

## Overview
Create specialized audio components for advanced functionality across demo pages.

## Components to Implement

### 1. ADSREnvelope.tsx (Envelope Editor)
- Visual graph editor with draggable points
- Preset curves (exponential, linear)
- Time and level axis labels
- Real-time preview option
- Props: `attack`, `decay`, `sustain`, `release`, `onChange`

### 2. PianoKeyboard.tsx (Musical Keyboard)
- Configurable octave range (default 2 octaves)
- Computer keyboard mapping (ASDF for white keys, WE for black keys)
- Visual feedback for active notes
- Velocity sensitivity simulation
- Props: `startNote`, `octaves`, `onNoteOn`, `onNoteOff`, `activeNotes`

### 3. FileUploader.tsx (Audio File Handler)
- Drag & drop zone
- Format validation (mp3, wav, ogg, flac)
- File size limits
- Loading progress indicator
- Error handling and user feedback
- Props: `onFileLoad`, `acceptedFormats`, `maxSize`

### 4. PresetManager.tsx (Save/Load System)
- LocalStorage persistence
- Import/Export JSON
- Preset categorization
- Delete confirmation
- Duplicate preset detection
- Props: `presets`, `currentPreset`, `onLoad`, `onSave`, `onDelete`

### 5. EffectsChain.tsx (Effect Processor Container)
- Drag to reorder effects
- Per-effect bypass toggle
- Wet/dry mix per effect
- Visual connection flow
- Add/remove effects
- Props: `effects`, `onReorder`, `onBypass`, `onRemove`

## File Location
`src/components/audio/`

## Dependencies
- React
- standardized-audio-context
- @dnd-kit/core (for drag & drop, lighter than react-beautiful-dnd)

## Priority
**Medium** - Needed for synthesizer and effects pages

## Technical Notes
- FileUploader needs to decode audio using AudioContext.decodeAudioData
- PresetManager should handle JSON serialization of Web Audio parameters
- EffectsChain needs to manage audio node graph connections
- ADSR envelope should use exponential curves from existing `funcs.ts`

## Acceptance Criteria
- [ ] All 5 components implemented
- [ ] ADSR visualization smooth and interactive
- [ ] Piano keyboard responsive to mouse and keyboard
- [ ] File uploader handles errors gracefully
- [ ] Preset system persists across sessions
- [ ] Effects chain maintains audio routing correctly
- [ ] Drag & drop works on desktop and touch devices
