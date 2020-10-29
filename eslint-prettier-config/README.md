# ESLint / Prettier Configuration

We decided to use ESLint for linting and Prettier for formatting in our projects. Both of these need to be installed as extensions in Visual Studio Code and locally in our projects. ESLint and Prettier will also have their own config files where we store our preferred settings.

I set up a new example React project to show how we configure ESLint and Prettier with React. You can see my steps below, and you may view the sample files in the “code” folder.

## Steps:

1. Create folder for new app and open in VS Code
2. Open terminal and run command `npx create-react-app . ` to create app directly in your folder
3. Go to “Extensions” tab and install “ESLint” and “Prettier - Code formatter” in VS Code
4. Install packages locally; run this command in the terminal: `npm i --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier`
    - Note: ESLint React plugins come pre-installed with create-react-app
5. Add Prettier config file
    - “.prettierrc”
    - Inside the file add a JSON object, your Prettier rules will go here
6. Add ESLint config file
    - “.eslintrc.json”
    - Add empty JSON object
    - Add “extends” section with the following: `“extends”: [“eslint:recommended”, “react-app”]`
        - “React-app” extends the React rules that are already included with create-react-app
7. Go to File -> Preferences -> Settings ( or Ctrl + , ) to update settings for Prettier extension
    - Text Editor -> Formatting -> check “Format on Save”
    - Ensure “Format on Save Mode” is set to “File”
    - In the search bar search for“default formatter” and in the dropdown select “esbenp.prettier-vscode”
        - This allows prettier to format all our file types

## ESLint can extend Prettier rules

It is possible to allow ESLint to give error or warning messages when our code does not follow our formatting options set out in our Prettier config file. ESLint will give warnings in real-time and highlight problems directly in the editor. At this time we decided to allow Prettier to format our code on save and let ESLint focus on code quality problems only. We found that the ESLint formatting warnings were distracting and unnecessary when we are allowing our editor to format our code.

## Husky

We can use Husky to lint our code before we commit our code with git.

Install Husky with the following command: `npm i husky --save-dev`

In our package.json, we want to have this in our scripts, so we can run it in the command line:
`"scripts": { "lint": "eslint ." }`

And include this Husky config as well:
`"husky": { "hooks": { "pre-push": "npm run lint" } }`

### Links

[Prettier Docs](https://prettier.io/docs/en/install.html)

[ESLint Docs](https://eslint.org/docs/user-guide/getting-started)

[Helpful youtube tutorial](https://www.youtube.com/watch?v=bfyI9yl3qfE) - NOTE I did not follow this exactly, but it helped me to learn how ESLint and Prettier can be set up with create-react-app
