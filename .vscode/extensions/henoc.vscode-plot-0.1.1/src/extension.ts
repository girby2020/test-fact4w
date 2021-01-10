import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import {render} from "ejs";

export function activate(context: vscode.ExtensionContext) {

  let previewUri = vscode.Uri.parse("vscode-plot://authority/vscode-plot");
  let readResource = (filename: string) => fs.readFileSync(path.join(__dirname, "..", "resources", filename), "UTF-8");
  let viewer = readResource("viewer.ejs");
  let bundle = readResource("bundle.js");
  let style = readResource("style.css");

  class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
    private _onDidChange: vscode.EventEmitter<vscode.Uri> = new vscode.EventEmitter<vscode.Uri>();

    get onDidChange(): vscode.Event<vscode.Uri> {
      return this._onDidChange.event;
    }

    public update(uri: vscode.Uri) {
      this._onDidChange.fire(uri);
    }

    public provideTextDocumentContent(uri: vscode.Uri): string {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor == null) {
        return "Error: nothing to show";
      }
      const selection = activeEditor.selection;
      const selText = activeEditor.document.getText(selection);
      const html = render(viewer, {
        bundle: bundle,
        style: style,
        text: selText
      });
      return html;
    }
  }

  let provider = new TextDocumentContentProvider();
  let disposables: vscode.Disposable[] = [];
  disposables.push(vscode.workspace.registerTextDocumentContentProvider("vscode-plot", provider));
  disposables.push(vscode.commands.registerCommand("vscodePlot.plot", () => {
    return vscode.commands.executeCommand("vscode.previewHtml", previewUri, vscode.ViewColumn.Two, "VSCode Plot").then((success) => undefined, (reason) => {
      vscode.window.showErrorMessage(reason);
    });
  }));

  context.subscriptions.push(...disposables);

  // 選択文字列が変更されると発動
  vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
    provider.update(previewUri);
  });
}
