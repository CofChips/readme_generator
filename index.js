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
    },
    {
        type: "input",
        name: "questions",
        message: "Any questions you'd like to ask your visitors?"
    }

]).then(data => {
    console.log(data);
    const filename = "README.md";

    writeFileAsync("TEST.md","# "+data.project_title+'\n');

    async function combineData(){
        try{
            if (data.badge.includes("contributions welcome")) {
                await appendFileAsync("TEST.md",contributions+'\n')
            }
            if (data.badge.includes("start with why")) {
                await appendFileAsync("TEST.md",why+'\n')
            }
            const repo = await "![GitHub repo size](https://img.shields.io/github/repo-size/" + data.username + "/" + data.repo + ")"
            if (data.badge.includes("repo size")) {
                await appendFileAsync("TEST.md",repo+'\n')
            }
            const depend = await "![David](https://img.shields.io/david/" + data.username + "/" + data.repo + ")"
            if (data.badge.includes("dependencies")) {
                await appendFileAsync("TEST.md",depend+'\n')
            }
        }
        catch(err) {
            console.log(err);

        }
    }
    combineData();


})





//     fs.writeFile(filename, "", function (err) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("File created");
//         }
//     });

//     const username = data.username;
//     const repository = data.repo;
//     const repo = "![GitHub repo size](https://img.shields.io/github/repo-size/" + username + "/" + repository + ")"

//     // const depend = "![David](https://img.shields.io/david/" + username + "/" + repository + ")"



//     const badges = [];

//     if (data.badge.includes("contributions welcome")) {
//         fs.appendFile(filename, contributions + '\n', function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("Logged: contributions");
//             }
//         });
//     };
//     if (data.badge.includes("start with why")) {
//         fs.appendFile(filename, why + '\n', function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("Logged: why");
//             }
//         });
//     };
//     if (data.badge.includes("repo size")) {
//         fs.appendFile(filename, repo + '\n', function (err) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("Logged: repo");
//             }
//         });
//     };
//     // if (data.badge.includes("dependencies")) {
//     //     badges.push(depend);
//     // };

//     console.log(badges);
//     // console.log(badges[0]);
//     // console.log(badges[1]);
//     // console.log(badges[2]);
//     // // console.log(badges[3]);

//     // fs.appendFile(filename, badges[0] + '\n', function (err) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     else {
//     //         console.log("Logged: " + badges[0]);
//     //     }
//     // })

//     // fs.appendFile(filename, badges[1] + '\n', function (err) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     else {
//     //         console.log("Logged: " + badges[1]);
//     //     }
//     // })
//     // fs.appendFile(filename, badges[2] + '\n', function (err) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     else {
//     //         console.log("Logged: " + badges[2]);
//     //     }
//     // })
//     // fs.appendFile(filename, badges[3] + '\n', function (err) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     else {
//     //         console.log("Logged: " + badges[3]);
//     //     }
//     // })


// if(badges.length>0){
//     for(var i=0; i < badges.length; i++){
//         fs.appendFile(filename, badges[i] +'\n', function(err){
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("Logged: "+ badges[i]);
//             }
//         } )
//     }
// };


//     // if (data.badge[0] === "contributions welcome" && data.badge[1] === "start with why") {
//     //     fs.writeFile(filename, contributions + '\n' + why + '\n' + "# " + data.project_title + '\n', function (err) {
//     //         if (err) {
//     //             console.log(err);
//     //         }
//     //         else {
//     //             console.log("Badges and title logged!");
//     //         }
//     //     });
//     // }
//     // else if (data.badge[0] === "contributions welcome") {

//     //     fs.writeFile(filename, contributions + '\n' + "# " + data.project_title + '\n', function (err) {
//     //         if (err) {
//     //             console.log(err);
//     //         }
//     //         else {
//     //             console.log("Contribution badge and title logged!");
//     //         }
//     //     })
//     // }
//     // else if (data.badge[0] === "start with why") {
//     //     fs.writeFile(filename, why + '\n' + "# " + data.project_title + '\n', function (err) {
//     //         if (err) {
//     //             console.log(err);
//     //         }
//     //         else {
//     //             console.log("Why badge and title logged!");
//     //         }
//     //     })
//     // }
//     // else {
//     //     fs.writeFile(filename, "# " + data.project_title + '\n', function (err) {
//     //         if (err) {
//     //             console.log(err);
//     //         }
//     //         else {
//     //             console.log("Title logged!");
//     //         }
//     //     })
//     // }
//     // fs.appendFile(filename, "## " + "Description" + '\n' + data.description + '\n', function (err) {
//     //     if (err) {
//     //         console.log(err);
//     //     }
//     //     else {
//     //         console.log("Description logged!");
//     //     }
//     // })

//     fs.appendFile(filename, "# " + data.project_title + '\n' + "## " + "Description" + '\n' + data.description + '\n' + "## " + "Table of Contents" + '\n' + "* [Installation](#installation)" + '\n' + "* [Usage](#usage)" + '\n' + "* [License](#license)" + '\n' + "* [Contributing](#contributing)" + '\n' + "* [Tests](#tests)" + '\n' + "* [Questions](#questions)" + '\n' + "## " + "Installation" + '\n' + data.install + '\n' + "## " + "Usage" + '\n' + data.usage + '\n' + "## " + "License" + '\n' + data.license + '\n' + "## " + "Contributing" + '\n' + data.contributing + '\n' + "## " + "Tests" + '\n' + data.tests + '\n' + "## " + "Questions" + '\n' + data.questions + '\n', function (err) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Table of contents, installation, usage, license, contributing, tests, and questions logged!");
//         }
//     })
//     //     * [Installation](#installation)
//     // * [Usage](#usage)
//     // * [License](#license)
//     // * [Contributing](#contributing)
//     // * [Tests](#tests)
//     // * [Questions](#questions)
//     // + "## " + "Installation" + '\n' + data.install + '\n'
// })