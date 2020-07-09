const inquirer = require("inquirer");
const fs = require('fs');
const { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } = require("constants");

const contributions = "[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)"

const why = "[![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)"

const hits = "[![HitCount](http://hits.dwyl.com/CofChips/weather_dashboard.svg)](http://hits.dwyl.com/CofChips/weather_dashboard)"

let repo = "![GitHub repo size](https://img.shields.io/github/repo-size/"+username+"/"+repo+")"

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
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
            "repo size"
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
    },{
        type: "input",
        name: "usage",
        message: "How do you use your project? Please provide instructions and examples for use."
    }

]).then(data => {
    console.log(data);
    console.log("badge 0: " + data.badge[0])
    console.log("badge 1: " + data.badge[1])
    const filename = "README.md";

    if (data.badge[0] === "contributions welcome" && data.badge[1] === "start with why") {
        fs.writeFile(filename, contributions + '\n' + why + '\n' + "# " + data.project_title + '\n', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Badges and title logged!");
            }
        });
    }
    else if (data.badge[0] === "contributions welcome") {

        fs.writeFile(filename, contributions + '\n' + "# " + data.project_title + '\n', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Contribution badge and title logged!");
            }
        })
    }
    else if (data.badge[0] === "start with why") {
        fs.writeFile(filename, why + '\n' + "# " + data.project_title + '\n', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Why badge and title logged!");
            }
        })
    }
    else {
        fs.writeFile(filename, "# " + data.project_title + '\n', function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Title logged!");
            }
        })
    }
    fs.appendFile(filename, "## " + "Description" + '\n' + data.description + '\n' + "## " + "Installation" + '\n' + data.install + '\n', function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Description and Installation logged!");
        }
    })

//     * [Installation](#installation)
// * [Usage](#usage)
// * [Credits](#credits)
// * [License](#license)

})