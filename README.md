## cconverter
A simple command-line application to convert currencies.

    cconverter USD 1 EUR JPY GBP


## Installation
cconverter requires [mongodb](https://www.mongodb.com/)
Follow the [guide](https://docs.mongodb.com/manual/administration/install-community/)
to install mongodb for your operating system.

Once mongodb is installed check that it is running.
On Linux you can do this using systemctl.

    systemctl status mongodb

Next, install the package using npm

    sudo npm install --global 

You should now be able to use cconverter from the terminal.

## Usage
cconverter has four commands

convert .............. convert between currencies
history ............ show conversion history
version ............ show package version
help ............... show help menu for a command

Use the help menu to learn more about commands.

    cconverter help convert

## Development
cconverter uses [standard](https://standardjs.com/) javascript code-style
[jest] is used as the test-runner.

1. Make sure tests are passing
    npm test

2. Make sure code is propertly styled
    standard