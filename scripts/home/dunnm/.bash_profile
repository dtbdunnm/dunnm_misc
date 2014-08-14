if [ -f ~/.bashrc ]; then . ~/.bashrc; fi

export CLICOLOR=1
export LSCOLORS=gxBxhxDxfxhxhxhxhxcxcx

PS1="[\\u@\h \\W]\\$ "

if [ -f ~/.git-completion.bash ]; then
	. ~/.git-completion.bash
fi
