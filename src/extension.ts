// extension.ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Command to add semicolon at end of current line
    let addSemicolonCurrentLine = vscode.commands.registerCommand(
        'auto-semicolon.addSemicolonCurrentLine',
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const position = editor.selection.active;
            const line = editor.document.lineAt(position.line);
            const lineText = line.text.trimEnd();
            
            // Check if line already ends with semicolon
            if (lineText.endsWith(';')) {
                vscode.window.showInformationMessage('Line already ends with semicolon');
                return;
            }

            // Insert semicolon at end of line
            const endPosition = new vscode.Position(line.lineNumber, line.text.trimEnd().length);
            editor.edit(editBuilder => {
                editBuilder.insert(endPosition, ';');
            });
        }
    );

    // Command to add semicolon to all selected lines
    let addSemicolonSelectedLines = vscode.commands.registerCommand(
        'auto-semicolon.addSemicolonSelectedLines',
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const selection = editor.selection;
            const startLine = selection.start.line;
            const endLine = selection.end.line;

            editor.edit(editBuilder => {
                for (let i = startLine; i <= endLine; i++) {
                    const line = editor.document.lineAt(i);
                    const lineText = line.text.trimEnd();
                    
                    // Skip empty lines and lines that already end with semicolon
                    if (lineText.length === 0 || lineText.endsWith(';')) {
                        continue;
                    }

                    const endPosition = new vscode.Position(i, lineText.length);
                    editBuilder.insert(endPosition, ';');
                }
            });
        }
    );

    // Command to add semicolon and move to next line
    let addSemicolonAndNextLine = vscode.commands.registerCommand(
        'auto-semicolon.addSemicolonAndNextLine',
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const position = editor.selection.active;
            const line = editor.document.lineAt(position.line);
            const lineText = line.text.trimEnd();

            editor.edit(editBuilder => {
                // Add semicolon if not present
                if (!lineText.endsWith(';')) {
                    const endPosition = new vscode.Position(line.lineNumber, lineText.length);
                    editBuilder.insert(endPosition, ';');
                }
            }).then(() => {
                // Move cursor to next line
                const nextLine = Math.min(position.line + 1, editor.document.lineCount - 1);
                const newPosition = new vscode.Position(nextLine, 0);
                editor.selection = new vscode.Selection(newPosition, newPosition);
                editor.revealRange(new vscode.Range(newPosition, newPosition));
            });
        }
    );

    // Command to toggle semicolon (add or remove)
    let toggleSemicolon = vscode.commands.registerCommand(
        'auto-semicolon.toggleSemicolon',
        () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const position = editor.selection.active;
            const line = editor.document.lineAt(position.line);
            const lineText = line.text.trimEnd();

            if (lineText.endsWith(';')) {
                // Remove semicolon
                const removePosition = new vscode.Position(line.lineNumber, lineText.length - 1);
                const removeRange = new vscode.Range(removePosition, new vscode.Position(line.lineNumber, lineText.length));
                editor.edit(editBuilder => {
                    editBuilder.delete(removeRange);
                });
            } else {
                // Add semicolon
                const endPosition = new vscode.Position(line.lineNumber, lineText.length);
                editor.edit(editBuilder => {
                    editBuilder.insert(endPosition, ';');
                });
            }
        }
    );

    context.subscriptions.push(
        addSemicolonCurrentLine,
        addSemicolonSelectedLines,
        addSemicolonAndNextLine,
        toggleSemicolon
    );
}

export function deactivate() {}