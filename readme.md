# ![](http://cl.ly/dqu3/tint@2x%206.10.01%20PM.png) Tint

**NOTE: This is currently in beta and may break! If it does, please create an issue!**

A not-so-sucky color picker status bar for OSX.

![](https://raw.githubusercontent.com/adaringdesign/tint/master/Screen.png)

A local shortcut to open the color picker is set to `Command + c`


## Download

**[Download the latest release here](https://github.com/adaringdesign/tint/releases)**



## Features

- Support opacity and hue.
- Supports HEX, RGBA and HSLA.
- Local shortcut (`command + c`) to copy color value.
- Supports Dark Mode.

Something else you'd like to see? Create an issue!



## Development

> Want to help make Tint even better?

Tint is developed using [Electron](http://electron.atom.io/) which enables writing native applications using JavaScript.

Pre-reqs:

- Node v5.0.x:

```shell
# On a mac with Homebrew:
brew install nvm

nvm install
nvm use
npm install
```

- Electron:

```shell
# Install electron
npm install --global electron
```

Don't install electron-prebuild! Please see [Stackoverflow](http://stackoverflow.com/questions/41574586/what-is-the-difference-between-electron-and-electron-prebuilt) for an explaination why. 

- Dependencies:
```shell
# Install dependencies prior to running
npm install
```



### Run

Run without compiling a new app:

```shell
npm start
```


### Build

Build a `Tint.app` file:

```shell
npm run package
```

### Regenerate the Icon

~~Create a new `Tint.icns` file by running the following script:~~

This will be removed in next commits as it's no longer needed..

```shell
./scripts/make-icon
```



## To Do:

- [ ] Minor ui fixes
- [ ] Add input shortcut (`Command + V`)
- [ ] Add preferences dialog



## Credits

Updated by Rutger Valk-van de Klundert © 2017. Released under an MIT license.

Started by Dana Woodman in < 2015.

Icon "tint" by useiconic.com from the Noun Project.