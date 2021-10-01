#!/bin/bash

# Install ruby, ruby-devel
# https://jekyllrb.com/docs/installation/other-linux/

# Add gem location to your .bashrc
# echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
# echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
# echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
# source ~/.bashrc
# https://jekyllrb.com/docs/installation/ubuntu/

# Install Jekyll and Bundler
# `gem install jekyll bundler`

# Install dependencies
bundle install

# Build and serve the website
bundle exec jekyll serve --livereload