## CoC Goose

<img align="center" width="900"  src="https://github.com/user-attachments/assets/1a52cee2-cec9-4481-b828-faceee198c78" alt=""><br/>

[Goose Programming Language](https://github.com/aardappel/goose) LSP integration for [CoC.nvim](https://github.com/neoclide/coc.nvim).

> [!IMPORTANT]
> Vim/NeoVim does not yet offer proper filetype detection for Goose language by default, in order for the extension to work properly either:
> 1. Install [goose-lang.vim](https://github.com/exaroth/goose-lang.vim)
> 
> or
> 
> 3. Add `au BufRead,BufNewFile *.goose setfiletype goose` line to your `.vimrc` on `init.vim`


### Installation

Add following to your `coc-settings.json`

```json
  "goose.enabled": true,
  "goose.path": "<path_to_goose_compiler>",
  "goose.stdlib": "<path_to_goose_stdlib_dir>"
```

Run `:CocInstall coc-goose`


### Licence

See LICENSE file for details.
