// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log("Hello Activated");
	const diagnosticCollection = vscode.languages.createDiagnosticCollection("ory-diagnostics");

	const handler = async (doc:vscode.TextDocument) => {
		console.log("Logic to be added here to check file");

		// const provider = vscode.languages.registerCompletionItemProvider({scheme: 'file',language:'yaml'},{
		// 	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
		// 		// a simple completion item which inserts `Hello World!`
		// 		const simpleCompletion = new vscode.CompletionItem('Hello World!');
	
		// 		return [
		// 			simpleCompletion
		// 		];
		// 	}
		// });

		// diagnosticCollection.set(doc.uri, provider);
	};

	const didOpen = vscode.workspace.onDidOpenTextDocument(doc => handler(doc));
	const didChange = vscode.workspace.onDidChangeTextDocument(e => handler(e.document));

	


	context.subscriptions.push(diagnosticCollection,didOpen,didChange);
}

// this method is called when your extension is deactivated
export function deactivate() {}
