# NanoRender for SketchUp — Extension (Step 1)

SketchUp Ruby Extension with HtmlDialog UI. This step establishes the base extension structure only.

## Folder Structure

```
sketchup-extension/
├── nanorender.rb                      # Extension registration (copy to Plugins/)
└── nanorender/
    ├── main.rb                        # Entry point: loads modules, initializes menu
    ├── extension_info.rb              # Name, version, and shared constants
    ├── menu.rb                        # SketchUp Extensions menu registration
    ├── dialogs/
    │   └── main_dialog.rb             # HtmlDialog lifecycle (Ruby side)
    └── html/
        ├── dialog.html                # HtmlDialog markup
        ├── css/
        │   └── dialog.css             # Dialog styles
        └── js/
            └── dialog.js              # Dialog scripts (Ruby↔JS bridge later)
```

### File Roles

| File | Role |
|------|------|
| `nanorender.rb` | Registers the extension with `SketchupExtension` and `Sketchup.register_extension`. |
| `nanorender/main.rb` | Bootstraps the extension when enabled. Defines `PLUGIN_ROOT` and loads other Ruby files. |
| `nanorender/extension_info.rb` | Central place for extension metadata and menu labels. |
| `nanorender/menu.rb` | Adds **NanoRender** to the **Extensions** menu. |
| `nanorender/dialogs/main_dialog.rb` | Creates and shows `UI::HtmlDialog`. No business logic yet. |
| `nanorender/html/*` | Frontend assets loaded by HtmlDialog. |

### Design Notes

- **Ruby ↔ HtmlDialog separation**: Ruby handles SketchUp API and dialog lifecycle; HTML/CSS/JS handle presentation.
- **No API keys**: Gemini and backend integration are intentionally omitted in this step.
- **Modular layout**: Future features (viewport capture, API client, render pipeline) can be added as new Ruby modules and HTML views.

## Installation

### 1. Locate your SketchUp Plugins folder

| OS | Path |
|----|------|
| Windows | `C:\Users\<YourName>\AppData\Roaming\SketchUp\SketchUp 20XX\SketchUp\Plugins` |
| macOS | `~/Library/Application Support/SketchUp 20XX/SketchUp/Plugins` |

Replace `20XX` with your SketchUp version year (e.g. `2024`, `2025`).

### 2. Copy extension files

Copy these from this repository into the **Plugins** folder:

1. `sketchup-extension/nanorender.rb` → `Plugins/nanorender.rb`
2. `sketchup-extension/nanorender/` (entire folder) → `Plugins/nanorender/`

Result:

```
Plugins/
├── nanorender.rb
└── nanorender/
    ├── main.rb
    ├── extension_info.rb
    ├── menu.rb
    ├── dialogs/
    │   └── main_dialog.rb
    └── html/
        ├── dialog.html
        ├── css/
        │   └── dialog.css
        └── js/
            └── dialog.js
```

### 3. Restart SketchUp

Fully quit and reopen SketchUp so the extension loader picks up new files.

## Testing

### Step 1 — Confirm extension is registered

1. Open SketchUp.
2. Go to **Window → Extension Manager** (or **Extension Warehouse → Manage Extensions** depending on version).
3. Find **NanoRender for SketchUp** in the list.
4. Ensure it is **enabled** (checkbox on).

### Step 2 — Open the menu item

1. In the menu bar, open **Extensions**.
2. Click **NanoRender**.
3. A dialog titled **NanoRender for SketchUp** should open.

### Step 3 — Verify dialog content

The dialog should display:

- Title: **NanoRender for SketchUp**
- Message: **Extension successfully loaded.**

### Step 4 — Re-open behavior

1. Close the dialog.
2. Click **Extensions → NanoRender** again.
3. The same dialog should open without errors.

## Troubleshooting

### Extension does not appear in Extension Manager

- Confirm `nanorender.rb` is directly inside `Plugins/`, not nested in a subfolder.
- Confirm the `nanorender/` folder sits next to `nanorender.rb`.
- Check **Window → Ruby Console** for load errors on startup.

### Menu item missing

- Ensure the extension is enabled in Extension Manager.
- Restart SketchUp after copying files.

### Dialog is blank

- Confirm `nanorender/html/dialog.html` exists.
- Confirm `css/dialog.css` and `js/dialog.js` are in the paths referenced by `dialog.html`.
- Open Ruby Console and run:

```ruby
NanoRender::Dialogs::MainDialog.show
```

If an error appears, the message usually points to a missing file path.

## Next Steps (not implemented yet)

- Viewport capture via SketchUp Ruby API
- Node.js backend for API key management
- Google Gemini (`gemini-3.1-flash-image`) integration
- Render workflow UI inside HtmlDialog
