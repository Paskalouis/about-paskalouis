#!/usr/bin/env node
"use strict";

var inquirer = require("inquirer");
var chalk = require("chalk");
var figlet = require("figlet");

var response = chalk.bold.green;

var resume = require("./resume.json");

var resumePrompts = {
    type: "list",
    name: "resumeOptions",
    message: 
    `
    ==========================================
    ||  What Do You Want To Know About Me ? ||
    ==========================================
    `,
    choices: [...Object.keys(resume), "Exit"]
};

function main() {
    console.log(`
    ==============================================
    ||     W E L C O M E                        ||
    ||           T O  M Y  C L I  A P P         ||
    ==============================================
    `)
    resumeHandler();
}

function sayBye() {
    figlet.text('Valar Morghulis !', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
}

function resumeHandler() {
    inquirer.prompt(resumePrompts).then(answer => {
        if (answer.resumeOptions == "Exit") {
            sayBye();
            return;
        }
        var option = answer.resumeOptions;
        console.log(response("--------------------------------------"));
        resume[`${option}`].forEach(info => {
            console.log(response("|   => " + info));
        });
        console.log(response("--------------------------------------"));
        // console.log(resume[`${option}`]);
        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
            .then(choice => {
                if (choice.exitBack == "Back") {
                    resumeHandler();
                } else {
                    sayBye();
                    return;
                }
            });
    });
}

main();