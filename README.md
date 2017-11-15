# hopper

![Hopper](image.png?raw=true "Hopper Frontend")

Live filtering react full-stack mini server for data presentation.

## Developing

First grab the code:

    $ git clone git@github.com:docwhite/hopper.git
    $ cd hopper

For developing work on three terminal tabs, where on the first one you edit:

    $ vim

A second one is in charge of building the frontend:

    $ npm install
    $ gulp

A third one will serve the backend:

    $ pip install -r requirements
    $ ./run

## Building

Grab the code:

    $ git clone git@github.com:docwhite/hopper.git
    $ cd hopper

These steps are for making an offline .zip file:

    $ gulp clean
    $ gulp build
    $ gulp dist
    $ gulp zip
    $ cp dist.zip /wherever/you/want/

Then to run it just:

    $ cd /wherever/you/want
    $ ./installDependencies
    $ python app.py

