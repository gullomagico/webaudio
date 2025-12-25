# GitHub Issues for Web Audio Project Upgrade

This directory contains comprehensive issue templates for upgrading the Web Audio API showcase project.

## 📂 Files in This Directory

### Roadmap
- **00-PROJECT-ROADMAP.md** - Master plan with all phases, dependencies, and timeline

### Component Library Issues
- **01-control-components.md** - Knob, Slider, XYPad, ToggleButton, RadioGroup
- **02-visualization-components.md** - Oscilloscope, SpectrumAnalyzer, Waveform, VUMeter, Spectrogram
- **03-audio-utility-components.md** - ADSREnvelope, PianoKeyboard, FileUploader, PresetManager, EffectsChain
- **04-ui-components.md** - Panel, NumberInput, Tooltip, Modal, Tabs

### Utilities Issue
- **05-shared-utilities.md** - Audio helpers, file helpers, preset helpers, visual helpers

### Demo Page Issues
- **06-sample-player-page.md** - Audio sample player with 8-pad grid
- **07-audio-effects-page.md** - Multi-effects processor with chainable effects
- **08-synthesizer-page.md** - Polyphonic subtractive synthesizer
- **09-step-sequencer-page.md** - 16-step rhythm sequencer
- **10-spatial-audio-page.md** - 3D audio panner with spatial positioning
- **11-frequency-analyzer-page.md** - Professional spectrum analyzer with multiple modes
- **12-biquad-filter-page.md** - Complete the existing biquad filter demo

## 🚀 How to Create GitHub Issues

Since the `gh` CLI is not installed, create issues manually:

### Option 1: GitHub Web Interface
1. Go to https://github.com/gullomagico/webaudio/issues
2. Click "New Issue"
3. Copy the title from each markdown file (first heading)
4. Copy the entire content (excluding the title)
5. Add labels as specified in each file
6. Submit the issue

### Option 2: GitHub CLI (if available)
```bash
# Install gh CLI first: https://cli.github.com/

# Then create all issues at once:
for file in .github/ISSUES/*.md; do
  if [[ "$file" != *"00-PROJECT-ROADMAP"* ]] && [[ "$file" != *"README"* ]]; then
    title=$(head -n 1 "$file" | sed 's/# //')
    body=$(tail -n +3 "$file")
    gh issue create --title "$title" --body "$body"
  fi
done
```

### Option 3: GitHub API (with curl)
```bash
# Create a personal access token first
# Then use the script below (example for issue #1)

REPO="gullomagico/webaudio"
TOKEN="your_github_token"
TITLE=$(head -n 1 .github/ISSUES/01-control-components.md | sed 's/# //')
BODY=$(tail -n +3 .github/ISSUES/01-control-components.md)

curl -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$REPO/issues \
  -d "{\"title\":\"$TITLE\",\"body\":\"$BODY\",\"labels\":[\"enhancement\",\"component\"]}"
```

## 🏷️ Recommended Labels

Create these labels in your repository:

| Label | Color | Description |
|-------|-------|-------------|
| `enhancement` | #a2eeef | New feature or request |
| `component` | #7057ff | Component library work |
| `demo-page` | #0075ca | New demo page |
| `utilities` | #d4c5f9 | Utility functions |
| `visualization` | #fbca04 | Audio visualization |
| `audio` | #d93f0b | Web Audio API specific |
| `ui` | #c5def5 | User interface |
| `priority-high` | #d73a4a | High priority |
| `priority-medium` | #fbca04 | Medium priority |
| `priority-low` | #0e8a16 | Low priority |
| `in-progress` | #ededed | Currently being worked on |

## 📋 Suggested Milestones

Create these milestones to track phases:

1. **Phase 1: Foundation**
   - Due: 3 weeks from start
   - Issues: #01, #02, #04, #05, #12

2. **Phase 2: First Demos**
   - Due: 6 weeks from start
   - Issues: #06, #07

3. **Phase 3: Advanced Components**
   - Due: 10 weeks from start
   - Issues: #03, #08

4. **Phase 4: Advanced Demos**
   - Due: 14 weeks from start
   - Issues: #09, #10, #11

## 🔄 Issue Dependencies

Some issues depend on others being completed first. See the dependency graph in `00-PROJECT-ROADMAP.md`.

**Key Dependencies:**
- Issues #06-#12 (demo pages) require issues #01, #02, #05 (foundation)
- Issue #08 (synthesizer) requires issue #03 (audio components)
- All issues benefit from issue #05 (shared utilities)

## 📝 Issue Numbering

The numbering in filenames is for organization only. GitHub will assign its own issue numbers when created.

Suggested mapping:
- #01-05: Component and utility library
- #06-12: Demo pages

## ✅ Issue Template Checklist

Each issue template includes:
- [x] Clear title with emoji
- [x] Suggested labels
- [x] Detailed feature list
- [x] Technical implementation notes
- [x] Component dependencies
- [x] Priority level
- [x] Acceptance criteria
- [x] User flow
- [x] Design notes

## 🤝 Contributing

When working on issues:
1. Assign yourself to the issue
2. Move it to "In Progress" on project board
3. Create a feature branch: `feature/issue-XX-brief-description`
4. Follow acceptance criteria
5. Submit PR referencing the issue: "Closes #XX"
6. Request review from team

## 📞 Questions?

If you have questions about any issue:
- Comment on the issue in GitHub
- Reference the roadmap for context
- Check existing code patterns in `src/` directory
- Review the main README.md

---

**Created**: 2025-12-25
**Total Issues**: 12
**Project Duration**: ~3-4 months (estimated)
