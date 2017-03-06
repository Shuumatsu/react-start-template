Create React apps with no build configuration.

### Creating an App

```
npm install -g clone-react-template

clone-react-template my-app
cd my-app/
npm install && npm start
```

Then open [https://localhost:3000/](https://localhost:3000/) to see your app.

When you’re ready to deploy to production, create a minified bundle with npm run build.

It will create a directory called my-app inside the current folder.

Inside that directory, it will generate the initial project structure:

```
my-app/
  README.md
  config/
  scritps/
  package.json
  .gitignore
  public/
    favicon.ico
    index.html
  src/
    actions/
    reducers/
    routes/
    selectors/
    store/
    DevTools.js
    index.dev.js
    index.js
    index.prod.js
```

### features

- react-hot-loader
- async/await
- decorator
- postcss
- redux
- react-router-dom