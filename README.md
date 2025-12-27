# Auto Semicolon Extension

A VS Code/Codium extension by **da1shiq** that helps you quickly add semicolons at the end of lines with customizable keyboard shortcuts. Perfect for PHP, JavaScript, TypeScript, and other semicolon-required languages.

## Features

- **Add semicolon to current line** - Quickly append a semicolon to the line where your cursor is
- **Add semicolon to multiple lines** - Select multiple lines and add semicolons to all of them at once
- **Add semicolon and move to next line** - Add semicolon and automatically jump to the next line
- **Toggle semicolon** - Add or remove semicolon from current line
- **Language-specific** - Optionally enable only for specific programming languages
- **Customizable shortcuts** - Change default keybindings to your preference

## Default Keyboard Shortcuts

| Command | Windows/Linux | macOS | Description |
|---------|---------------|-------|-------------|
| Add semicolon to current line | `Ctrl+;` | `Cmd+;` | Adds semicolon at end of current line |
| Add semicolon to selected lines | `Ctrl+Shift+;` | `Cmd+Shift+;` | Adds semicolon to all selected lines |
| Add semicolon and move to next line | `Ctrl+Alt+;` | `Cmd+Alt+;` | Adds semicolon and moves cursor to next line |
| Toggle semicolon | `Ctrl+K Ctrl+;` | `Cmd+K Cmd+;` | Adds or removes semicolon from current line |

## Installation

### From Source

1. Create the extension folder structure:
   ```bash
   mkdir -p auto-semicolon/src
   cd auto-semicolon
   ```

2. Create the files in their correct locations:
   - `src/extension.ts` - Main extension code (must be in src folder!)
   - `package.json` - Extension configuration (root folder)
   - `tsconfig.json` - TypeScript config (root folder)
   - `README.md` - Documentation (root folder)

3. Install dependencies:
   ```bash
   npm install
   ```

4. Compile the extension:
   ```bash
   npm run compile
   ```

5. Copy the entire folder to your extensions directory:
   - **VS Code**: `~/.vscode/extensions/` (Linux/macOS) or `%USERPROFILE%\.vscode\extensions\` (Windows)
   - **Codium**: `~/.vscode-oss/extensions/` (Linux/macOS) or `%USERPROFILE%\.vscode-oss\extensions\` (Windows)

6. Reload VS Code/Codium (Ctrl+Shift+P → "Developer: Reload Window")

### From VSIX (if packaged)

1. Open VS Code/Codium
2. Go to Extensions view (`Ctrl+Shift+X`)
3. Click the `...` menu → "Install from VSIX"
4. Select the `.vsix` file

## Customizing Keyboard Shortcuts

You can customize the keyboard shortcuts in two ways:

### Method 1: Using Keyboard Shortcuts Editor

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Preferences: Open Keyboard Shortcuts"
3. Search for "semicolon"
4. Click the pencil icon next to any command
5. Press your desired key combination

### Method 2: Editing keybindings.json

1. Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "Preferences: Open Keyboard Shortcuts (JSON)"
3. Add your custom keybindings:

```json
[
  {
    "key": "ctrl+enter",
    "command": "auto-semicolon.addSemicolonCurrentLine",
    "when": "editorTextFocus"
  },
  {
    "key": "alt+s",
    "command": "auto-semicolon.toggleSemicolon",
    "when": "editorTextFocus"
  }
]
```

## Configuration

Access settings via `File > Preferences > Settings` and search for "Auto Semicolon":

- **Language Specific**: Enable/disable language-specific behavior
- **Enabled Languages**: Choose which languages the extension works with

### Example settings.json configuration:

```json
{
  "autoSemicolon.languageSpecific": true,
  "autoSemicolon.enabledLanguages": [
    "php",
    "javascript",
    "typescript",
    "java",
    "c",
    "cpp",
    "csharp"
  ]
}
```

## Usage Examples

### Basic Usage
Place your cursor at the end of a line and press `Ctrl+;` (or `Cmd+;` on macOS):
```php
// Before:
$name = "John"

// After (press Ctrl+;):
$name = "John";
```

### Multiple Lines
Select multiple lines and press `Ctrl+Shift+;`:
```php
// Before (select these lines):
$firstName = "John"
$lastName = "Doe"
$age = 30

// After (press Ctrl+Shift+;):
$firstName = "John";
$lastName = "Doe";
$age = 30;
```

### Quick Line Completion
Use `Ctrl+Alt+;` to add semicolon and move to next line - great for quick coding!

## Development

### Building from Source

```bash
# Install dependencies
npm install

# Compile
npm run compile

# Watch mode (auto-compile on changes)
npm run watch

# Package extension
vsce package
```

### Project Structure

```
auto-semicolon/
├── src/
│   └── extension.ts      # Main extension code (MUST be in src/)
├── out/                  # Compiled output (generated)
│   └── extension.js
├── package.json          # Extension manifest (root)
├── tsconfig.json        # TypeScript configuration (root)
├── .vscodeignore        # Files to exclude when packaging
└── README.md            # This file (root)
```

**Important:** The `extension.ts` file MUST be placed in the `src/` folder, not in the root directory. The TypeScript compiler expects all source files to be under the `rootDir` specified in `tsconfig.json`.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use and modify as needed.

## Changelog

### 1.0.0
- Initial release
- Add semicolon to current line
- Add semicolon to selected lines
- Add semicolon and move to next line
- Toggle semicolon functionality
- Language-specific configuration