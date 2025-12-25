# 🛠️ Shared Utilities: Audio & File Helpers

**Labels:** `enhancement`, `utilities`, `priority-high`

## Overview
Create shared utility functions for audio processing, file handling, and common operations.

## Utilities to Implement

### 1. audioHelpers.ts
```typescript
// Singleton AudioContext management
createAudioContext(): AudioContext

// Node connection helper
connectNodes(...nodes: AudioNode[]): void

// MIDI/Frequency conversion
noteToFrequency(note: number): number  // MIDI note to Hz
frequencyToNote(freq: number): number   // Hz to MIDI note
getNoteNameFromMIDI(note: number): string  // e.g., "A4", "C#5"

// Decibel/Gain conversion
decibelToGain(db: number): number
gainToDecibel(gain: number): number

// Clock/Timing utilities
scheduledNote(context: AudioContext, time: number, duration: number): void
getCurrentBeat(bpm: number, startTime: number): number
```

### 2. fileHelpers.ts
```typescript
// Decode uploaded audio files
decodeAudioFile(file: File, context: AudioContext): Promise<AudioBuffer>

// Export audio buffer to various formats
downloadAudioBuffer(buffer: AudioBuffer, filename: string, format: 'wav' | 'mp3'): void

// Convert AudioBuffer to WAV blob
audioBufferToWav(buffer: AudioBuffer): Blob

// Validate audio file
isValidAudioFile(file: File): boolean
```

### 3. presetHelpers.ts
```typescript
// LocalStorage management
saveToLocalStorage(key: string, data: any): void
loadFromLocalStorage<T>(key: string): T | null
getAllPresets(prefix: string): Preset[]

// Import/Export JSON
exportPreset(data: any, filename: string): void
importPreset(file: File): Promise<any>
```

### 4. visualHelpers.ts
```typescript
// Analyser data extraction
getFrequencyData(analyser: AnalyserNode): Uint8Array
getTimeDomainData(analyser: AnalyserNode): Float32Array

// Analysis utilities
getPeakFrequency(analyser: AnalyserNode): number
getRMSLevel(analyser: AnalyserNode): number
getAverageFrequency(analyser: AnalyserNode): number

// Canvas utilities
drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, divisions?: number): void
drawFrequencyLabels(ctx: CanvasRenderingContext2D, sampleRate: number): void
drawdBScale(ctx: CanvasRenderingContext2D, height: number): void
```

### 5. Enhance existing funcs.ts
- Add more curve generation functions (logarithmic, S-curve)
- Add note name formatting utilities
- Add time formatting utilities (ms to "1m 30s" format)
- Add BPM/tempo calculations

## File Location
`src/libs/`

## Dependencies
- standardized-audio-context
- lamejs (for MP3 encoding) - add to package.json
- audiobuffer-to-wav - add to package.json

## Priority
**High** - Needed by all other features

## Technical Notes
- Ensure singleton AudioContext to avoid multiple instances
- Handle browser compatibility for audio file encoding
- Add proper error handling for file operations
- Document all functions with JSDoc
- Use TypeScript strict mode

## Acceptance Criteria
- [ ] All helper functions implemented with TypeScript
- [ ] Comprehensive error handling
- [ ] Unit tests for pure functions (optional but recommended)
- [ ] JSDoc documentation for all public functions
- [ ] Browser compatibility verified (Chrome, Firefox, Safari)
- [ ] No memory leaks in AudioContext management

## Package Dependencies to Add
```json
{
  "dependencies": {
    "lamejs": "^1.2.1",
    "audiobuffer-to-wav": "^1.0.0"
  }
}
```
