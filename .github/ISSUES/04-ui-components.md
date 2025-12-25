# 🎨 Component Library: UI Components

**Labels:** `enhancement`, `component`, `ui`, `priority-medium`

## Overview
Create general-purpose UI components for consistent layout and interaction patterns.

## Components to Implement

### 1. Panel.tsx (Container with Header)
- Collapsible sections
- Header with optional actions
- Consistent padding and styling
- Dark theme compatible
- Props: `title`, `collapsible`, `defaultOpen`, `children`, `actions`

### 2. NumberInput.tsx (Enhanced Numeric Input)
- Click to edit inline
- Scroll to adjust value
- Validation with min/max
- Step increment support
- Format function for display
- Unit display (Hz, ms, dB, etc.)
- Props: `value`, `min`, `max`, `step`, `unit`, `onChange`, `format`

### 3. Tooltip.tsx (Enhanced Tooltips)
- Hover and focus support
- Configurable position (top, bottom, left, right)
- Delay before showing
- Props: `content`, `children`, `position`, `delay`

### 4. Modal.tsx (Dialog/Modal)
- Backdrop with blur
- Close on ESC key
- Focus trap
- Animation on open/close
- Props: `isOpen`, `onClose`, `title`, `children`

### 5. Tabs.tsx (Tab Navigation)
- Horizontal tab bar
- Keyboard navigation (arrow keys)
- Active tab indicator
- Props: `tabs`, `activeTab`, `onChange`

## File Location
`src/components/ui/`

## Dependencies
- React
- TypeScript
- Tailwind CSS
- @headlessui/react (optional, for accessible modals)

## Priority
**Medium** - Improves UX across all pages

## Technical Notes
- Follow existing color scheme (green accent)
- Ensure accessibility (ARIA attributes, keyboard navigation)
- Use Tailwind utility classes
- Make components responsive

## Acceptance Criteria
- [ ] All 5 components implemented
- [ ] Fully accessible (keyboard + screen reader)
- [ ] Responsive design verified
- [ ] Consistent with existing design system
- [ ] Animations smooth (60fps)
- [ ] Modal prevents body scroll when open
