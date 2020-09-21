FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update -qqy \
  && apt-get -qqy install \
    curl \
    software-properties-common \
    wget \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Nodejs 10 with npm install
# https://github.com/nodesource/distributions#installation-instructions
# Latest Google Chrome installation package
RUN curl -sL https://deb.nodesource.com/setup_12.x | /bin/bash \
        && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
        && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

RUN apt-get update -qqy \
  && apt-get -qqy install \
    apt-utils \
    build-essential \
    fonts-ipafont-gothic \
    libfontconfig \
    libfreetype6 \
    xvfb \
    google-chrome-stable \
    default-jre \
    ttf-ubuntu-font-family \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-cyrillic \
    xfonts-scalable \
    libxss1 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Nodejs 10 with npm install
# https://github.com/nodesource/distributions#installation-instructions
RUN apt-get update -qqy && apt-get -qqy install nodejs

# Latest Ubuntu Google Chrome, XVFB and JRE installs
RUN apt-mark hold firefox

# 1. Step to fixing the error for Node.js native addon build tool (node-gyp)
# https://github.com/nodejs/node-gyp/issues/454
# https://github.com/npm/npm/issues/2952
RUN rm -fr /root/tmp
# Jasmine and protractor global install
# 2. Step to fixing the error for Node.js native addon build tool (node-gyp)
# https://github.com/nodejs/node-gyp/issues/454
# Get the latest Google Chrome driver
# Get the latest WebDriver Manager
RUN npm install --unsafe-perm --save-exact -g protractor \
  && npm update \
  && webdriver-manager update

# Set the path to the global npm install directory. This is vital for Jasmine Reporters
# http://stackoverflow.com/questions/31534698/cannot-find-module-jasmine-reporters
# https://docs.npmjs.com/getting-started/fixing-npm-permissions
ENV NODE_PATH /usr/lib/node_modules
# Global reporters for protractor
RUN npm install --unsafe-perm -g \
    jasmine-reporters \
    jasmine-spec-reporter \
    protractor-jasmine2-html-reporter \
    jasmine-allure-reporter \
    protractor-console

# Set the working directory
WORKDIR /workspace

RUN npm install -g @angular/cli

COPY package.json .

RUN npm install

COPY . .

# Set the HOME environment variable for the test project
ENV HOME=/workspace

ENV DISPLAY=:10.0

RUN node ./node_modules/protractor/bin/webdriver-manager update

RUN node --version
