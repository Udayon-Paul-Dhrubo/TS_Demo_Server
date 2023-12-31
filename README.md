## Creating an express project.

We are going to start with a new project. Initialize npm with command:

```bash
npm init -y
npm install --save express
npm install --save-dev typescript ts-node @types/node @types/express
```



> There is one additional step that needs to be done in order to run TypeScript code. Typescript requires a configuration file. So generate a tsconfig.json file with command:

```bash
npx tsc --init
```

A file called tsconfig.json will be created which holds the configuration for TypeScript. Newly created file contains a lot of configuration but we will consider only few of them.

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "./src",
    "esModuleInterop": true
  }
}

```

>target: specifies which ECMAScript version should be used in the project. The available versions are ES3 (default), ES5, ES2015, ES2016, ES2017, ES2018, ES2019, ES2020, or ESNEXT.

>module: specifies which module manager to use in the generated JavaScript code. Available options are none, commonjs, amd, system, umd, es2015, es2020, or ESNext. The most common module manager and the default one is commonjs.

>outDir: specifies where to output JavaScript code after build.

>rootDir: specifies where the TypeScript files are located.

>baseUrl: specifies what is the relative path when including files in the application.

>esModuleInterop: this option is true by default; it controls interoperability between CommonJS and ES modules. It does this by creating namespace objects for all imports.


## Building & running the project

Now we are ready to start and build our project. We are going to add scripts for starting and building the application inside package.json file. Change your package.json script object to look like:

```json
"scripts": {
  "start": "ts-node ./src/server.ts",
  "start:prod": "npm run build && node ./dist/src/server.js",
  "build": "npx tsc"
},
```

> Building the application is pretty simple. We need to run command 
```bash
npm run build.
``` 

TypeScript will consider tsconfig.json file for configuration. Earlier we set `"outDir": "./dist",` in configuration which means that TypeScript will build application inside dist folder.

> We can run the application with commands:

- `npm run start` or just `npm start` (development)
- npm run start:prod (production)


## Nodemon

Nodemon is a tool which is widely used and which tracks changes and automatically restarts the application. If we do not use Nodemon then after each change we have to stop the application and run it again.

We can install Nodemon with command:

```bash
npm install --save-dev nodemon
```

Create nodemon.json configuration file inside root directory.

```json
{
  "ignore": [".git", "node_modules", "dist"],
  "watch": ["./src"], // <- files inside folder to watch
  "exec": "npm start", // <- command that will be executed when nodemon starts
  "ext": "ts" // <- files to watch
}
```

Remove the comments of course. Add additional script for nodemon inside package.json scripts.

```json
"start:nodemon": "./node_modules/nodemon/bin/nodemon.js",
```

Now we can start watching the application with command 
```bash 
npm run start:nodemon
```

Application will be restarted after we change any TypeScript file inside `src` folder.

## Using ESLint with prettier

Eslint is a linter for JavaScript/TypeScript which finds problems inside your code. I cannot imagine writing TypeScript code without using ESLint. Previously I was using TSLint for TypeScript but now it is deprecated and ESLint should be used instead. Additional package which I would recommend to use is prettier together with ESLint.
NOTE: Prettier can be used also to automatically format your code (which I prefer) but we will not cover it in this tutorial.

Install dependencies:

```
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
```

ESLint also uses configuration file. For this purpose create .eslintrc.json file in root directory. We can arrange rules to our needs.

```json
{
  "root": true,
  "ignorePatterns": [],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
      "rules": {
        "max-len": "off",
        "no-underscore-dangle": "off",
        "arrow-body-style": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/restrict-template-expressions": "warn",
        "jsdoc/newline-after-description": "off"
      }
    }
  ]
}
```

If we need to ignore any folder/file for ESLint then add .eslintignore file inside root directory with configuration. For demonstration purpose I added the file with content.

```
/dist
```

Now ESLint will ignore all files inside dist folder.

We added plugin for prettier as well so the linter will tell us when something is not formatted by the prettier configuration. Add `.pretterrc` file inside root directory and adjust it to your needs. My config looks like:

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 130
}

```

Now we are able to see if there is any error/warning inside our code. Restart your IDE if needed.