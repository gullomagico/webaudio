# Quick Start Guide - Web Audio Upgrade

## 🎯 TL;DR

We're upgrading the Web Audio project from 1 demo to 8+ demos with a full component library. Start with **Phase 1** (foundation components).

## 🚀 For New Contributors

### 1. Understand the Current Project
- **What it is**: Web Audio API showcase (Astro + React + TypeScript)
- **Current state**: 1 working demo (Tone Generator)
- **Goal**: 8+ interactive demos + reusable components

### 2. Pick a Starting Point

#### Beginner-Friendly
- **Issue #04** - UI Components (Panel, NumberInput, Tooltip)
- **Issue #12** - Complete Biquad Filter (page already started)

#### Intermediate
- **Issue #01** - Control Components (Knob, Slider, XYPad)
- **Issue #05** - Shared Utilities (helper functions)
- **Issue #06** - Sample Player (simpler demo page)

#### Advanced
- **Issue #02** - Visualization Components (Canvas-based)
- **Issue #08** - Synthesizer (complex, polyphonic)
- **Issue #09** - Step Sequencer (precise timing)

### 3. Review Dependencies
Check `00-PROJECT-ROADMAP.md` - some issues require others to be done first!

**Safe to start immediately:**
- Issues #01, #02, #04, #05 (foundation - no dependencies)
- Issue #12 (page skeleton already exists)

**Wait for foundation:**
- Issues #06, #07 (need #01, #02, #05)
- Issue #08 (needs #03 + foundation)

### 4. Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/issue-01-control-components

# 2. Create component files
mkdir -p src/components/controls
touch src/components/controls/Knob.tsx

# 3. Develop following existing patterns
# - Look at OscillatorContainer.tsx for React patterns
# - Look at Canvas.tsx for visualization patterns
# - Use TypeScript strict mode
# - Use Tailwind for styling

# 4. Test your component
npm run dev

# 5. Commit when done
git add .
git commit -m "feat: add Knob component (closes #1)"

# 6. Push and create PR
git push -u origin feature/issue-01-control-components
```

### 5. Code Standards

- **TypeScript**: Strict mode, no `any` types
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS utilities, green theme
- **Accessibility**: ARIA labels, keyboard support
- **Performance**: Clean up effects, cancel animations

## 📚 Key Files to Read

### Before Starting Any Issue
1. `src/containers/OscillatorContainer.tsx` - React + Web Audio patterns
2. `src/components/Canvas.tsx` - Visualization patterns
3. `src/libs/funcs.ts` - Utility function patterns
4. `astro.config.mjs` - Project configuration

### For Component Issues (#01-#04)
- Study existing components in `src/components/`
- Follow controlled component pattern
- Make components reusable (props-based)

### For Utility Issues (#05)
- Check existing `src/libs/funcs.ts`
- Write pure functions where possible
- Add JSDoc comments
- Handle errors gracefully

### For Demo Pages (#06-#12)
- Look at `src/pages/tone-generator.astro`
- Container component pattern (like OscillatorContainer)
- Use `client:only="react"` for React components
- Update `src/pages/index.astro` with new Card

## 🎨 Design Patterns

### Component Structure
```typescript
import React from 'react';

interface KnobProps {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
  unit?: string;
}

const Knob: React.FC<KnobProps> = ({
  value, min, max, label, onChange, unit
}) => {
  // Component logic
  return (
    <div className="flex flex-col items-center">
      {/* JSX */}
    </div>
  );
};

export default Knob;
```

### Web Audio Pattern
```typescript
// Create nodes
const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
const analyser = audioCtx.createAnalyser();

// Connect audio graph
oscillator.connect(gainNode);
gainNode.connect(analyser);
gainNode.connect(audioCtx.destination);

// Start
oscillator.start();
```

### Page Structure
```astro
---
import Layout from '../layouts/Layout.astro';
import MyContainer from '../containers/MyContainer';
---

<Layout title="My Demo - WebAudio">
  <main class="m-auto p-6 max-w-5xl">
    <h1 class="text-4xl font-bold text-center pb-5">
      My <span class="text-gradient">Demo</span>
    </h1>
    <MyContainer client:only="react" />
  </main>
</Layout>
```

## 🐛 Common Pitfalls

### 1. AudioContext Lifecycle
❌ Creating multiple AudioContexts
✅ Use singleton pattern (see existing code)

### 2. Memory Leaks
❌ Forgetting to cleanup animations
```typescript
useEffect(() => {
  const id = requestAnimationFrame(tick);
  // Missing cleanup!
}, []);
```

✅ Always cleanup
```typescript
useEffect(() => {
  const id = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(id);
}, []);
```

### 3. Audio Glitches
❌ Changing parameters directly
```typescript
gainNode.gain.value = 0.5; // Creates click!
```

✅ Use ramping
```typescript
gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.01);
```

## 🧪 Testing Checklist

Before submitting PR:
- [ ] Component works in isolation
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors
- [ ] Responsive on mobile (test in dev tools)
- [ ] Keyboard accessible
- [ ] No memory leaks (check performance tab)
- [ ] No audio artifacts (clicks, pops)
- [ ] Consistent with existing design

## 📖 Learning Resources

### Web Audio API
- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Web Audio API Specification](https://webaudio.github.io/web-audio-api/)
- [Web Audio API Examples](https://github.com/mdn/webaudio-examples)

### Astro
- [Astro Docs](https://docs.astro.build/)
- [Astro Islands](https://docs.astro.build/en/concepts/islands/)

### React + Web Audio
- [Using Web Audio with React](https://www.smashingmagazine.com/2022/03/web-audio-api-react/)

## 💬 Getting Help

- **Question about issue?** → Comment on the GitHub issue
- **Technical question?** → Check existing code first, then ask
- **Bug in existing code?** → Create separate bug issue
- **Suggestion for improvement?** → Discussion in main issue

## ✅ Ready to Start?

1. Read the issue you picked (in `.github/ISSUES/`)
2. Check `00-PROJECT-ROADMAP.md` for dependencies
3. Create feature branch
4. Start coding!
5. Have fun building cool audio stuff! 🎵

---

**Remember**: This is a showcase project. Make it impressive, educational, and fun!
