import {
  commands,
  type ExtensionContext,
  type LanguageClientOptions,
  LanguageClient,
  type ServerOptions,
  window,
  services,
  workspace,
} from "coc.nvim";

export async function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration("goose");

  if (!config.get('enabled', true)) {
  	return;
  }

  const command = config.get("path", "/home/exaroth/goose/build/goose");

  //todo add stdlib
  const opts: ServerOptions = {
    command,
    args: ["lsp", "--stdlib", "/home/exaroth/goose/stdlib"],
  };

  const clientOpts: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "goose" }],
    outputChannel: window.createOutputChannel("Goose Language Server"),
  };

  const client = new LanguageClient(
    "gooseLsp",
    "goose-language-server",
    opts,
    clientOpts,
  );

  context.subscriptions.push(services.registLanguageClient(client));

  commands.registerCommand("start", () => {
    client.start();
  });

  commands.registerCommand("stop", () => {
    void client.stop();
  });

  commands.registerCommand("restart", () => {
    void client.stop().then(() => {
      client.start();
    });
  });

  commands.registerCommand("depro", async (name?: string) => {
    window.showInformationMessage("hery");
    return "hey";
  });


  // const command = config.get('path', '');

  // if (command === '') {
  // 	return window.showErrorMessage(
  // 		'Failed to find the zls executable! Please specify its path in
  // your settings.',
  // 	);
  // }
  // context.subscriptions.push(commands.registerCommand(commandId, async
  // (name?: string) => {

  //   const message = `Hello from ${name ?? 'coc.nvim'}!`
  //   await window.showInformationMessage(message)

  //   return message
  // })

  // if (config.get('enabled', true)) {
  // 	return;
  // }
}
