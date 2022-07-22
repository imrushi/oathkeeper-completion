// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

async function getDignostics(doc: vscode.TextDocument): Promise<vscode.Diagnostic[]> {
	console.log("Reading Text");
	const text = doc.getText();
	const diagnostics = new Array<vscode.Diagnostic>();
	console.log({ text });

	return diagnostics;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	console.log("Hello Activated");
	const diagnosticCollection = vscode.languages.createDiagnosticCollection("ory-diagnostics");
	
	const provider = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'yaml' }, {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			// Id completion
			const id = new vscode.CompletionItem('id');
			id.documentation = new vscode.MarkdownString('`string` \n\nThe unique ID of the Access Rule.');
			id.insertText = new vscode.SnippetString(`- id: '${1}'`);

			// version completion 
			// TODO: create api from which fetch api version and use here
			const version = new vscode.CompletionItem('version');
			version.insertText = new vscode.SnippetString('version: "${1|v0.38.20-beta.1,v0.38.19-beta.1,v0.38.17-beta.1,v0.38.15-beta.1,v0.38.14-beta.1,v0.38.9-beta.1,v0.38.5-beta.1,v0.38.4-beta.1|}"');
			version.documentation = new vscode.MarkdownString("`string` \n\nThe version of Ory Oathkeeper uses [Semantic Versioning](https://semver.org/).  \nPlease use ***vMAJOR.MINOR.PATCH*** notation format. Ory Oathkeeper can migrate access rules across versions. If left empty Ory Oathkeeper will assume that the rule uses the same tag as the running version. Examples: *v0.1.3* or *v1.2.3*");

			const upstream = new vscode.CompletionItem('upstream');
			upstream.insertText = new vscode.SnippetString('upstream:');
			upstream.documentation = new vscode.MarkdownString("`object` \n\nThe location of the server where requests matching this rule should be forwarded to. This only needs to be set when using the Ory Oathkeeper Proxy as the Decision API doesn't forward the request to the upstream.")
			// a completion item that inserts its text as snippet,
			// the `insertText`-property is a `SnippetString` which will be
			// honored by the editor.
			const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
			const docs: any = new vscode.MarkdownString("Inserts a snippet that lets you select [link](x.ts).");
			snippetCompletion.documentation = docs;
			docs.baseUri = vscode.Uri.parse('http://example.com/a/b/c/');

			// a completion item that can be accepted by a commit character,
			// the `commitCharacters`-property is set which means that the completion will
			// be inserted and then the character will be typed.
			const commitCharacterCompletion = new vscode.CompletionItem('console');
			commitCharacterCompletion.commitCharacters = ['.'];
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

			// a completion item that retriggers IntelliSense when being accepted,
			// the `command`-property is set which the editor will execute after 
			// completion has been inserted. Also, the `insertText` is set so that 
			// a space is inserted after `new`
			const commandCompletion = new vscode.CompletionItem('new');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'new ';
			commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

			return [
				id,
				version,
				upstream,
				snippetCompletion,
				commitCharacterCompletion,
				commandCompletion
			];
		}
	});

	// const handler = async (doc:vscode.TextDocument) => {
	// 	console.log("Logic to be added here to check file");
	// 	if(!doc.fileName.endsWith("access-rules.yml")){
	// 		console.log("return");
	// 		return;
	// 	}

	// 	// const diagnostics = await getDignostics(doc);



	// 	// diagnosticCollection.set(doc.uri, diagnostics);
	// };

	// const didOpen = vscode.workspace.onDidOpenTextDocument(doc => handler(doc));
	// const didChange = vscode.workspace.onDidChangeTextDocument(e => handler(e.document));




	// context.subscriptions.push(diagnosticCollection,didOpen,didChange);
	context.subscriptions.push(provider);
}

// this method is called when your extension is deactivated
export function deactivate() { }
