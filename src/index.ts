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

  const command = config.get("path", "goose");

  let optargs = ["lsp"]
  let stdlib = config.get("stdlib", null)

  if (stdlib != null) {
      optargs.push("--stdlib", stdlib)
  }
  const opts: ServerOptions = {
    command,
    args: ["lsp", "--stdlib", ""],
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

}
