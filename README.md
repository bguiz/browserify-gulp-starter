# browserify-gulp-starter

Starter project that builds web apps using browserify and gulp

## Features

There are plenty of write ups and start project repositories
that combine browserify with gulp...
So why another one?

- Use `browserify` without using `gulp-browserify`
  - Because the latter has been "blacklisted"
- Has a `dist` build step
  - Concatenation and minification
- Able to build AngularJs apps
  - Extra steps required to build an AngularJs app due to the dependency injection system

The others usually just satisfy two of these requirements,
so there is room from improvement yet!

## Timeline

Additional features in the works:

- [x] Able to include dependencies as either globals (`vendor.js`)
- [ ] Add a task for test runners
- [ ] Cache-buster file names in `dist` builds
- [ ] More demo projects
  - [x] AngularJs

## Licence

GPLv3
