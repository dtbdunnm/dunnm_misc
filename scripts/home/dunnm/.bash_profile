if [ -f ~/.bashrc ]; then . ~/.bashrc; fi

export CLICOLOR=1
export LSCOLORS=gxBxhxDxfxhxhxhxhxcxcx

# Set PS1 for git
source $(brew --prefix)/etc/bash_completion.d/git-prompt.sh

# Reset
Color_Off="\[\033[0m\]"       # Text Reset

# Regular Colors
Red="\[\033[0;31m\]"
Green="\[\033[0;32m\]"
Yellow="\[\033[0;33m\]"
IYellow="\[\033[0;93m\]"

export PS1=[$Yellow\\u@\\h$Color_Off'$(git branch &>/dev/null;\
if [ $? -eq 0 ]; then \
  echo "$(echo `git status` | grep "nothing to commit" > /dev/null 2>&1; \
  if [ "$?" -eq "0" ]; then \
    # @4 - Clean repository - nothing to commit
    echo "'$Green'"$(__git_ps1 " (%s)"); \
  else \
    # @5 - Changes to working tree
    echo "'$Red'"$(__git_ps1 " {%s}"); \
  fi)'$Color_Off'"; \
fi) '$Yellow\\W$Color_Off]'\$ '

if [ -f ~/.git-completion.bash ]; then
	. ~/.git-completion.bash
fi
