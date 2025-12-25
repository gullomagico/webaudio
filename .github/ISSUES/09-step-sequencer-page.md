# 🥁 Demo Page: Step Sequencer

**Labels:** `enhancement`, `demo-page`, `priority-medium`

## Overview
Create a rhythm step sequencer with 16-step grid, multiple drum tracks, and pattern programming.

## Features

### Sequencer Grid
- **16 steps** (1 bar in 4/4 time)
- **4-8 drum tracks** (kick, snare, hi-hat, clap, tom, etc.)
- **Visual grid** with clickable cells
- **Playhead indicator** (shows current step)
- **Per-step velocity** (click and drag vertically to adjust)

### Playback Controls
- **Play/Stop/Pause** buttons
- **BPM control**: 40 - 300 BPM (with tap tempo)
- **Swing control**: 0 - 75% (adds groove)
- **Loop toggle** (auto-loop the pattern)

### Per-Track Controls
- **Volume slider** (0-100%)
- **Pan control** (-100% L to +100% R)
- **Mute/Solo** buttons
- **Sample assignment** (load custom drum samples)
- **Track color** (visual organization)

### Pattern Management
- **Save pattern** (to preset library)
- **Load pattern** (from presets)
- **Clear pattern** (reset all steps)
- **Copy/Paste pattern** (clipboard)
- **Pattern chaining** (optional future enhancement)

### Sample Library
- Default drum kit included (kick, snare, hats, clap, toms)
- Upload custom samples (wav, mp3)
- Sample preview on load

### Visualization
- VU meter per track
- Master output VU meter
- Visual step activation feedback

## Web Audio Nodes Used
- `AudioBufferSourceNode` (triggered per step)
- `GainNode` (volume, velocity, master)
- `StereoPannerNode` (per track)
- `AnalyserNode` (for VU meters)

## File Location
- Page: `src/pages/step-sequencer.astro`
- Container: `src/containers/StepSequencerContainer.tsx`
- Scheduler: `src/libs/AudioScheduler.ts` (new - precise timing)

## Component Dependencies
- ✅ ToggleButton (from issue #1)
- ✅ Slider (from issue #1)
- ✅ NumberInput (from issue #4)
- ✅ VUMeter (from issue #2)
- ✅ FileUploader (from issue #3)
- ✅ PresetManager (from issue #3)
- Custom: StepGrid component (create inline)
- Custom: AudioScheduler for precise timing

## Priority
**Phase 4** - Medium priority (complex timing implementation)

## Technical Notes
### Precise Timing
- **DO NOT** use `setTimeout` or `setInterval` for audio scheduling
- Use Web Audio API's `currentTime` for sample-accurate timing
- Implement look-ahead scheduler (schedules events ~50ms in advance)
- Schedule pattern from Chris Wilson's article: https://www.html5rocks.com/en/tutorials/audio/scheduling/

### Timing Algorithm
```javascript
// Pseudocode
function scheduler() {
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    scheduleNote(currentStep, nextNoteTime);
    advanceStep();
  }
  setTimeout(scheduler, lookahead);
}
```

### Swing Implementation
- Delay every other 16th note by swing percentage
- Example: 50% swing = every even step delayed by half a 16th note

## User Flow
1. User lands on `/step-sequencer` page
2. Clicks grid cells to program pattern
3. Presses play to hear pattern loop
4. Adjusts BPM and swing
5. Modifies per-step velocity by dragging
6. Changes samples per track
7. Uses mute/solo for arrangement
8. Saves pattern as preset
9. Loads and modifies existing patterns

## Acceptance Criteria
- [ ] 16-step grid functional (toggle steps on/off)
- [ ] 4+ drum tracks working
- [ ] Playback timing precise (no drift)
- [ ] BPM control accurate
- [ ] Swing implementation working
- [ ] Per-step velocity adjustable
- [ ] Sample upload/assignment working
- [ ] Mute/Solo functional
- [ ] Pattern save/load working
- [ ] Visual playhead synchronized
- [ ] No audio glitches during playback
- [ ] Works at all BPM ranges (40-300)

## Default Patterns to Include
1. **Basic Beat** - Kick on 1 & 3, snare on 2 & 4, 8th note hats
2. **Hip Hop** - Syncopated kick, snare on 2 & 4, swing hats
3. **House** - 4-on-the-floor kick, open hats, claps
4. **Breakbeat** - Amen break style pattern

## Default Sample Pack
- Include 808-style samples (Creative Commons):
  - Kick drum (2 variations)
  - Snare drum (2 variations)
  - Closed hi-hat
  - Open hi-hat
  - Clap
  - Tom (high, mid, low)

## Design Mockup Notes
- Grid layout: 16 columns × 4-8 rows
- Transport controls at top (play, stop, BPM)
- Track controls on left side (volume, pan, mute, solo)
- Pattern selector/manager on right side
- Master controls at bottom
- Color-coded tracks for visual clarity
- Highlight active step with animation
