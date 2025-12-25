# 🎹 Demo Page: Subtractive Synthesizer

**Labels:** `enhancement`, `demo-page`, `priority-high`

## Overview
Create a polyphonic subtractive synthesizer with oscillators, filter, envelope, LFO, and on-screen keyboard.

## Features

### Oscillator Section
- **Dual oscillators** (OSC1 and OSC2)
  - Waveform selection: Sine, Triangle, Square, Sawtooth
  - Coarse tune: ±2 octaves
  - Fine detune: ±100 cents
  - Volume/mix control per oscillator
- **Oscillator sync** option
- **Mix knob** (OSC1 ↔ OSC2)

### Filter Section
- **Filter type**: Lowpass, Highpass, Bandpass, Notch
- **Cutoff frequency**: 20 Hz - 20 kHz (logarithmic)
- **Resonance/Q**: 0.1 - 30
- **Envelope amount**: -100% to +100% (modulates cutoff)
- **Keyboard tracking**: 0% - 100% (higher notes = higher cutoff)

### Amplitude Envelope (ADSR)
- **Attack**: 0 - 2000ms
- **Decay**: 0 - 2000ms
- **Sustain**: 0 - 100%
- **Release**: 0 - 5000ms
- Visual envelope graph editor

### Filter Envelope (ADSR)
- Same parameters as amplitude envelope
- Modulates filter cutoff

### LFO Section
- **Waveform**: Sine, Triangle, Square, Sawtooth
- **Rate**: 0.1 - 20 Hz
- **Depth**: 0 - 100%
- **Destination**:
  - Pitch (vibrato)
  - Filter cutoff (wah effect)
  - Amplitude (tremolo)

### Keyboard
- **On-screen piano** (2 octaves, configurable start note)
- **Computer keyboard mapping**:
  - White keys: A S D F G H J K
  - Black keys: W E T Y U
  - Octave up/down: Z X
- **Polyphony**: 8 voices
- **Velocity sensitivity** simulation

### Additional Features
- **Arpeggiator**:
  - Patterns: Up, Down, Up-Down, Random
  - Rate: 1/32 to 1/2 notes
  - Octave range: 1-4
- **Master volume** and **master tuning** (A4 = 440 Hz ± 50 cents)
- **Glide/Portamento** (mono mode only)
- **Preset manager** (save/load patches)

### Visualization
- Oscilloscope showing output waveform
- Real-time envelope visualization
- LFO waveform display

## Web Audio Nodes Used
- `OscillatorNode` (2 per voice = 16 total for 8-voice polyphony)
- `BiquadFilterNode` (per voice, 8 total)
- `GainNode` (envelope, LFO, master = many!)
- `AnalyserNode` (visualization)

## File Location
- Page: `src/pages/synthesizer.astro`
- Container: `src/containers/SynthesizerContainer.tsx`
- Voice manager: `src/libs/VoiceManager.ts` (new)

## Component Dependencies
- ✅ PianoKeyboard (from issue #3)
- ✅ ADSREnvelope (from issue #3)
- ✅ Knob (from issue #1)
- ✅ Slider (from issue #1)
- ✅ RadioGroup (from issue #1)
- ✅ ToggleButton (from issue #1)
- ✅ Oscilloscope (from issue #2)
- ✅ PresetManager (from issue #3)
- Custom: VoiceManager class for polyphony

## Priority
**Phase 3** - High priority (complex but impressive demo)

## Technical Notes
- Implement voice stealing for polyphony (oldest note gets stolen when limit reached)
- Use note-on/note-off architecture similar to MIDI
- Create VoiceManager class to handle voice allocation
- Calculate envelope curves (exponential for natural sound)
- LFO uses low-frequency OscillatorNode
- Keyboard tracking: `filterFreq = baseFreq * Math.pow(2, tracking * (note - 60) / 12)`

## User Flow
1. User lands on `/synthesizer` page
2. Adjusts oscillator waveforms and mix
3. Tweaks filter cutoff and resonance
4. Shapes envelopes with visual editor
5. Plays notes via on-screen or computer keyboard
6. Enables arpeggiator for automatic patterns
7. Adds LFO modulation for movement
8. Saves favorite patch as preset
9. Loads and modifies existing presets

## Acceptance Criteria
- [ ] Dual oscillators working with all waveforms
- [ ] Filter with all types functional
- [ ] ADSR envelopes working (amp + filter)
- [ ] LFO modulation working on all destinations
- [ ] 8-voice polyphony functional
- [ ] Voice stealing algorithm working
- [ ] On-screen keyboard playable
- [ ] Computer keyboard mapping working
- [ ] Arpeggiator functional with all patterns
- [ ] Preset system saves all parameters
- [ ] No audio clicks or glitches
- [ ] Performance optimized (low latency)

## Default Presets to Include
1. **Soft Pad** - Sine waves, slow attack, long release
2. **Bright Lead** - Sawtooth, resonant filter, fast envelope
3. **Deep Bass** - Square + triangle, lowpass filter
4. **Pluck** - Triangle, fast attack/decay, filter sweep
5. **Strings** - Saw waves, slow attack, vibrato LFO

## Design Mockup Notes
- Sections laid out in panels: Oscillator | Filter | Envelopes | LFO
- Keyboard at bottom (full width)
- Arpeggiator controls in top-right
- Master controls in top-left
- Oscilloscope in center-top
- Vintage synth aesthetic (knobs and sliders)
