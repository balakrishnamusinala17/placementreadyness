## KodNest Premium Build System

A calm, intentional design system shell for serious B2C products. This repository currently contains the visual system only – no product features or business flows.

### Philosophy

- **Calm**: off-white backgrounds, restrained typography, and minimal chrome.
- **Intentional**: every element exists to support a clear decision or proof of work.
- **Coherent**: one spacing scale, one motion curve, one border style across the app.
- **Confident**: large serif headings paired with clean sans-serif body text.

### Visual System

- **Color**:
  - Background: `#F7F6F3`
  - Primary text: `#111111`
  - Accent (primary actions): `#8B0000`
  - Success: muted green
  - Warning: muted amber
- **Typography**:
  - Headings: `Georgia, "Times New Roman", serif`
  - Body: system sans-serif at 17px, line-height 1.7
  - Max readable width for body text: 720px
- **Spacing scale**:
  - `8px, 16px, 24px, 40px, 64px` (no off-scale values)
- **Motion**:
  - Transitions: 180ms ease-in-out, subtle and functional only.

### Layout Structure

Every page follows the same high-level structure:

1. **Top Bar**
   - Left: `KodNest Premium Build System` product name
   - Center: progress indicator (`Step X / Y`)
   - Right: status badge (`Not Started`, `In Progress`, `Shipped`)
2. **Context Header**
   - Large serif headline
   - One-line subtext describing the purpose of the page
3. **Primary Workspace (70% width)**
   - Cards for the main interaction surface
   - Consistent typography, buttons, inputs, empty and error states
4. **Secondary Panel (30% width)**
   - Step explanation
   - Copyable prompt box
   - Calmly styled utility buttons:
     - Copy prompt
     - Build in Lovable
     - It worked
     - Error
     - Add screenshot
5. **Proof Footer**
   - Persistent checklist:
     - UI Built
     - Logic Working
     - Test Passed
     - Deployed
   - Each item includes a text field for concrete proof or references.

### Files

- `index.html` – The layout shell wired to the design system.
- `styles.css` – Design tokens (colors, type, spacing, motion) and component styles.
- `package.json` – Minimal Node metadata and a local static server script.

### Running Locally

From the project root:

```bash
npm install
npm run start
```

Then open the printed `localhost` URL in your browser.

### Extending Safely

- **Do not** introduce additional colors without updating the core token set.
- **Do not** add new spacing values; compose from the existing scale instead.
- **Do** reuse the existing classes (`kn-top-bar`, `kn-card`, `kn-button`, `kn-input`, `kn-proof-footer`, etc.) when adding new views.
- **Do** keep new copy factual and direct – no hype language.

Product features, actual logic, and data integrations should be added on top of this system in future steps, reusing these primitives rather than redefining them.

