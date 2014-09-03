hi clear
if exists("syntax_on")
  syntax reset
endif

"Load the 'base' colorscheme
runtime colors/desert.vim

"Override the name of the base colorscheme with the name of this custom one
let g:colors_name = "md-desert"

highlight clear NonText
highlight clear SpecialKey
highlight NonText ctermfg=darkgray
highlight SpecialKey ctermfg=darkgray
