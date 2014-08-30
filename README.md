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

## How to start

### Bootstrap your framework

Firstly clone this repository, and reset its git history.

    git clone git@github.com:bguiz/browserify-gulp-starter.git
    mv browserify-gulp-starter my-app
    cd my-app
    rm -rf .git
    git init
    # edit package.json and bower.json to use your project details

Next, decide which framework you are using,
and use that framework's demo app

For AngularJs:

    rm src #don't worry, it is a symlink!
    ln -s src-angularjs src
    bower install --save angular angular-route

For Famo.us:

    rm src
    ln -s src-famous src
    npm install --save famous-polyfill famous

For any other web application, you will need to create the initial project yourself.
Use the AngularJs one as a reference for when you need to include dependencies using `bower`.
Use the Famo.us one as a reference for when you need to include dependencies using `npm`.

    rm src
    mkdir -p src-otherframework/app
    ln -s src-otherframework
    touch src-otherframework/app/index.html
    touch src-otherframework/app/app.js
    touch src-otherframework/app/app.scss
    # npm install --save ...
    # bower install --save ...

If you do do this, and think that others might benefit from it,
why not create a pull request and submit your `src-otherframework`?

### Running build tasks

This project is built using gulp,
and the commands that you will run most often should be:

    gulp build  # assembles project for development
    gulp dist   # does build task, and then optimises for ditribution (concatenation, minification)
    gulp serve  # does build task, and then listens for changes on project files, doing selective rebuilds
    gulp clean  # deletes files created by build or dist tasks

There are many others - look through `gulpfiles/tasks/*.js` to find them all.

## Timeline

Additional features in the works:

- [x] Able to include dependencies as either globals (`vendor.js`)
- [ ] Add a task for test runners
- [ ] Cache-buster file names in `dist` builds
- [ ] Image sprites
- [x] More demo projects
  - [x] AngularJs
  - [x] famo.us

## Licence

GPLv3
