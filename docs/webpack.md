# Webpack

Webpack is a compiling tool to bundle all of our JS files into one single file. This includes any libraries we are using such as [jQuery](https://www.npmjs.com/package/jquery), [moment](https://www.npmjs.com/package/moment), [axios](https://www.npmjs.com/package/axios), or [loadash](https://www.npmjs.com/package/lodash).

Webpack is often used in conjunction with with [Babel](https://babeljs.io/). THese 2 tools make a powerful combination that allows us to use the most current syntax, minimizing the concerns around browser compatibility.

_Webpack is not a true "compiler". People with nothing better to do will give you flack if you call it a compiler, because it doesn't translate JavaScript to byte code. Politely ask them to kick the nearest rock available._

## Configuring Webpack

The configuration is stored at the root level of your project, always\* at the level of `package.json`.

It is possible to store the configuration inside of `package.json` but it makes for a cluttered space.

There are usually 3 files that drive the setup of webpack.

## Common

`webpack.common.js` is a file that stores universal configurations. These values are the same regardless of any other environment intentions.

Lets break down the various options.

### Imports / requires

At the top we are bringing in `path` via `const path = require("path");`.

This allows us to get an **absolute** path to where we're pointing. The reason we want an absolute path is to elimate any confusing about where something might be.

### Exports

Towards the top, we can see `module.exports = {...}`.

In doing this, we can import the object in some other file, which we will get to in a little bit.

### Entry

[Docs](https://webpack.js.org/concepts/entry-points/)

This is of course where we are telling webpack to start looking. This is the absolute root of our project.

As you can see, the value is an array, `["babel-polyfill", "./src/index.js"]`.

The reason for this extra inclusion is to ask Babel to add something to the code before starting to compile it together.

In this case, it is the `babel-polyfill` package. This particular package allows for the usage of `async / await` and `fetch`.

### Output

[Docs](https://webpack.js.org/concepts/output/)

This is the file name and directory location webpack will output the bundled code. Often called `bundle.js` or `chunk.js`. Any name will do, as long as it's communicated to the team.

The reason we put it in the `public/` folder, is because that's where the `index.html` is that will load the JS.

Take a look at `index.html` and see where the script tag is pulling in the JS.

### Target

This is the environment we intend to use our outputted code. Another option is `node` which is intended to be used as server side code.

See some [other options here](https://webpack.js.org/configuration/target/).

### Module

[Docs](https://webpack.js.org/configuration/module/#root)

This is the heart of the configuration. Almost all of the impactful settings live here.

We can see `rules` which is an array. It includes all of the rules we are imposing on the code, through babel and webpack.

#### Test

This is a regex string matching all files that end in `.js`. Some other options are for `.css` if you are including `css` inside, through a React app for example.

#### Exclude

These are the files we **DO NOT** want to include. Just like a `.gitignore`, `node_modules` will never be included in our source code, unless specifically request through a `require("..") or and`import`.

#### Loader

[Docs](https://webpack.js.org/loaders/)

There are ton of different loader options. They are pre-proccesors that load the code in a spefic way. Don't worry too much about these for now, they are usually plug and play.

#### Query / Presets

Here is how we tell babel exactly what to do with our code. There are severl different options for this as well. These are all included in our `devDependencies` inside of `package.json`.

To install a preset, loader, or other package, run `npm i -D PACKAGE_NAME@VERSION`.

If you want to install a specific version, have a good reason!

The preset we use is `@babel/env`, so the install would look like this: `npm i -D @babel/env@latest`. This will install the latest version available.

## Dev

Here is where the configuration is stored for local development. This is for looking through the source, debugging, without caring too much about performance.

### Mode

[Docs](https://webpack.js.org/configuration/mode/)

This is what Webpack looks for the see which mode we would like it to use.

### Dev Tool

[Docs](https://webpack.js.org/configuration/devtool/)

This allows up to see the source maps ( un-altered files, we personally wrote ) inside of the browser. This is good for development, but not for production. We want to restrict who has access to see our `src` on the wild wild web.

Another option for source maps is to include them, but limit access. That's not really at our level of concern right now though.

### Dev Server

[Docs](https://webpack.js.org/configuration/dev-server/)

The `devServer` is what serves our content. We set it up to be able to see what `index.html` looks like.

#### Content Base

This is the root of the server. It should closely mirror the output in the `webpack.common.js` file, and is very often the `public/` folder.

#### Port

This is the port we are using to serve our app. `http://localhost:1313` is where `index.html` will be served.

#### Compress

According to the [docs](https://webpack.js.org/configuration/dev-server/#devservercompress), this allows for `gzip` compression on everything being served

#### Watch Content Base

[Docs](https://webpack.js.org/configuration/dev-server/#devserverwatchcontentbase)

When enabled, any file changes will trigger a full page reload.

#### Proxy

This is what allows us to send `fetch` requests to the `json-server` that is fed by `db.json`.

When you send a fetch request to `/api/a/sweet/url`, this is all relative. If you sent the request from `http://localhost:1313`, your request would go to `http://localhost:1313//api/a/sweet/url`.

This isn't what we want in this case, as the `json-server` is running on `http://localhost:3000`. So to fix this, we are proxying requests to the proper server, allowing us to make the relative pathing `fetch` requests.
