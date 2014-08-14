"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Matt Dunn's .vimrc file
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" Colour scheme
colorscheme md-desert
set background=dark

" Show line numbers
set number

" Show non-printing chars
set list
set list listchars=tab:>-,trail:·,extends:>

" Number of lines for VIM to remember
set history=700

" Auto read when a file is changed outside
set autoread

" Always show current position
set ruler

" Highlight search results
set hlsearch

" Search whilst typing a la Google
set incsearch

" Show matching brackets when under cursor
set showmatch

" Syntax highlighting
syntax enable

" 1 tab = 2 spaces
set shiftwidth=2
set tabstop=2

" Return to last edit position when opening files
autocmd BufReadPost *
	\ if line ("'\"") > 0 && line("'\"") <= line("$") |
	\		exe "normal! g`\"" |
	\ endif

" Format status line
set laststatus=2
set statusline=\ %{HasPaste()}%F%m%r%h\ %w\ \ CWD:\ %r%{getcwd()}%h\ \ \ Line:\ %l

" Helper functions
function! HasPaste()
	if &paste
		return 'PASTE MODE  '
	en
	return ''
endfunction
