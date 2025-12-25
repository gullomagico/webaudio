# 🧩 Component Library: Audio Control Components

**Labels:** `enhancement`, `component`, `priority-high`

## Overview
Create reusable audio control components for consistent UI across all demo pages.

## Components to Implement

### 1. Knob.tsx (Rotary Control)
- Circular drag interaction
- Fine control with shift key modifier
- Double-click to reset
- Logarithmic scaling option
- Value tooltip
- Props: `value`, `min`, `max`, `label`, `onChange`, `unit`, `logarithmic`

### 2. Slider.tsx (Enhanced Linear Control)
- Horizontal and vertical orientation
- Keyboard control (arrow keys)
- Tooltip with current value
- Optional snap points
- Logarithmic scaling option
- Props: `value`, `min`, `max`, `label`, `onChange`, `orientation`, `logarithmic`, `unit`

### 3. XYPad.tsx (2D Control Surface)
- Touch and mouse support
- Crosshair indicator
- Bounds visualization
- Grid overlay option
- Props: `x`, `y`, `xLabel`, `yLabel`, `onXChange`, `onYChange`

### 4. ToggleButton.tsx (Enhanced Toggle)
- Multiple visual variants (play, mute, solo, record)
- Keyboard shortcuts support
- LED indicator animation
- Props: `label`, `active`, `onClick`, `variant`, `keyboardShortcut`

### 5. RadioGroup.tsx (Enhanced Selection)
- Flexible styling (buttons, pills, tabs)
- Icon support
- Keyboard navigation
- Generic type support
- Props: `options`, `selected`, `onChange`, `variant`

## File Location
`src/components/controls/`

## Dependencies
- React
- TypeScript
- Tailwind CSS

## Priority
**High** - Foundation for all other features

## Acceptance Criteria
- [ ] All 5 components implemented with TypeScript
- [ ] Responsive and accessible (ARIA labels)
- [ ] Consistent styling with existing green theme
- [ ] Unit tests for each component (optional)
- [ ] Keyboard accessibility verified
- [ ] Mobile touch support tested

## Implementation Notes
- Follow existing patterns from `OscillatorContainer.tsx`
- Reuse color scheme from `main.css`
- Ensure components are controlled (stateless where possible)
