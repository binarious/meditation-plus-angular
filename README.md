[![Travis CI](https://api.travis-ci.org/Sirimangalo/meditation-plus-angular.svg)](https://travis-ci.org/Sirimangalo/meditation-plus-angular)
[![Dependency Status](https://david-dm.org/Sirimangalo/meditation-plus-angular.svg)](https://david-dm.org/Sirimangalo/meditation-plus-angular)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

# Angular2 Client for Meditation+ REST API

___

<p align="center">
  <a href="https://meditation.sirimangalo.org/" target="_blank">
    <img alt="Sirimangalo Meditation+ App" src="https://raw.githubusercontent.com/Sirimangalo/meditation-plus-angular/master/src/assets/img/screenshot_readme.png">
  </a>
</p>

## Quick Start

**Make sure you have Node version >= 5.0 and NPM >= 3**
> Clone/Download the repo then edit `app.component.ts` inside [`/src/app/app.component.ts`](/src/app/app.component.ts)

#### Installation
Clone our repo and install dependencies
```bash
git clone https://github.com/Sirimangalo/meditation-plus-angular
cd meditation-plus-angular && npm install
```

add `src/api.config.ts`:
```js
export let ApiConfig = {
  url: 'http://localhost:3002' // our REST endpoint
};
```

#### Development Server
Start the dev-server using
```bash
npm run server
# or if you want to use Hot Module Replacement use
npm run server:dev:hmr
```
