import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.createTestFile",
    (fileUri: vscode.Uri) => {
      // If no fileUri is provided, show an error message
      if (!fileUri) {
        vscode.window.showErrorMessage(
          "No file selected. Please select a file to create a corresponding .test file."
        );
        return;
      }

      // Get the original file path and extension
      const originalFilePath = fileUri.fsPath;
      const originalFileName = path.basename(originalFilePath);
      const originalFileDir = path.dirname(originalFilePath);

      // Extract file name and extension
      const fileNameWithoutExt = path.parse(originalFileName).name;
      const fileExt = path.extname(originalFileName);

      // Construct the new file name with .test before the extension
      const newFileName = `${fileNameWithoutExt}.test${fileExt}`;
      const newFilePath = path.join(originalFileDir, newFileName);

      // Create an empty file at the new file path
      fs.writeFileSync(newFilePath, "", "utf8");

      // Open the new file in the editor
      vscode.window.showTextDocument(vscode.Uri.file(newFilePath));

      vscode.window.showInformationMessage(`Created ${newFileName}`);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
