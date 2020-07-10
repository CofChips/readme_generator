const inquirer = require("inquirer");
const fs = require('fs');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

const contributions = "[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)"

const why = "[![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)"

const userData = {};


inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
    },
    {
        type: "input",
        name: "questions",
        message: "What is your email address?"
    },
    {
        type: "input",
        name: "repo",
        message: "What is your GitHub respository name for this project?"
    },
    {
        type: "input",
        name: "project_title",
        message: "What is the name of your project?"
    },
    {
        type: "checkbox",
        name: "badge",
        message: "Which badges do you want to include?",
        choices: [
            "contributions welcome",
            "start with why",
            "repo size",
            "dependencies"
        ]
    },
    {
        type: "input",
        name: "description",
        message: "What does your project do? Please describe."
    },
    {
        type: "input",
        name: "install",
        message: "How do you install your project? Please provide a step-by-step description on how to get the development environment running."
    },
    {
        type: "input",
        name: "usage",
        message: "How do you use your project? Please provide instructions and examples for use."
    },
    {
        type: "input",
        name: "usageGif",
        message: "Would you like to include an image or gif on how to use the app?  If so, please enter a URL."
    },
    {
        type: "input",
        name: "contributing",
        message: "Would you like other developers to contribute?  If so, under what guidelines?"
    },
    {
        type: "input",
        name: "license",
        message: "What license are you using?"
    },
    {
        type: "input",
        name: "tests",
        message: "Have you written tests for your app? If so, please provide examples on how to run them."
    }


]).then(data => {
    // console.log(data);
    const filename = "README.md";

    writeFileAsync(filename,"# "+data.project_title+'\n');

    async function combineData(){
        try{
            if (data.badge.includes("contributions welcome")) {
                await appendFileAsync(filename, contributions+'\n')
            }
            if (data.badge.includes("start with why")) {
                await appendFileAsync(filename, why+'\n')
            }
            const repo = await "![GitHub repo size](https://img.shields.io/github/repo-size/" + data.username + "/" + data.repo + ")"
            if (data.badge.includes("repo size")) {
                await appendFileAsync(filename,repo+'\n')
            }
            const depend = await "![David](https://img.shields.io/david/" + data.username + "/" + data.repo + ")"
            if (data.badge.includes("dependencies")) {
                await appendFileAsync(filename,depend+'\n')
            }
            await appendFileAsync(filename,"## " + "Description" + '\n' + data.description + '\n' + "## " + "Table of Contents" + '\n' + "* [Installation](#installation)" + '\n' + "* [Usage](#usage)" + '\n' + "* [License](#license)" + '\n' + "* [Contributing](#contributing)" + '\n' + "* [Tests](#tests)" + '\n' + "* [Questions](#questions)" + '\n' + "## " + "Installation" + '\n' + data.install + '\n' + "## " + "Usage" + '\n' + data.usage + '\n')
            
            if (data.usageGif!=="") {
                await appendFileAsync(filename,'\n'+"![Image]("+data.usageGif+")"+'\n')
            }
            
            await appendFileAsync(filename,"## " + "License" + '\n' + data.license + '\n' + "## " + "Contributing" + '\n' + data.contributing + '\n' + "## " + "Tests" + '\n' + data.tests + '\n' + "## " + "Questions" + '\n' + "If you have any questions regarding this project, please email me at: "+data.questions + '\n')

            console.log("Readme has been successfully created!")
        }
        catch(err) {
            console.log(err);

        }
    }
    combineData();


})

