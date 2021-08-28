const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamArray = [];

const managerQuestions = [

    {
        type: 'input',
        name: 'managerName',
        message: 'Enter the managers name'
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'Enter the managers ID number'
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: 'Enter the managers Email address'
    },
    {
        type: 'input',
        name: 'office',
        message: 'Enter the managers office number?'
    },
]

//Engineer: 
const engineerQuestions = [

    {
        type: 'input',
        name: 'engineerName',
        message: 'Enter the name of the engineer'
    },
    {
        type: 'input',
        name: 'engineerID',
        message: 'Enter the ID number for this engineer'
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: 'Enter email adress of the engineer'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter the engineers GitHub user name'
    },
]

//Intern:
const internQuestions = [

    {
        type: 'input',
        name: 'internName',
        message: 'Enter the name of the intern'
    },
    {
        type: 'input',
        name: 'internID',
        message: 'Enter the ID number for the intern',
    },
    {
        type: 'input',
        name: 'internEmail',
        message: 'Enter the email adress of the intern'
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter the school of the intern',
    },
]

//user can add another employee
const anotherOne = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Select the type of team member you would like to add next, or else select "Done" to generate your team ',
        choices: ['Engineer', 'Intern', 'Done']
    }
]
function init() {
    managerPromt();
}

//This will prompt to add next employee
function next() {
    inquirer.prompt(anotherOne).then((response) => {
        
        console.log(response);
        switch (response.nextEmployee) {
            case 'Engineer':
                engineerPromt();
                break;
            case 'Intern':
                internPromt();
                break;
            case 'Done':
                console.log('Creating your team!')
                makeTeam();
        }
    })
}

//will call the manager questions first
function managerPromt() {
    inquirer.prompt(managerQuestions).then((response) => {
        let name = response.managerName;
        let id = response.managerID;
        let email = response.managerEmail;
        let office = response.office;
       
        const manager = new Manager(name, id, email, office);
        //pushes the new manager object to the empty array to be used later 
        teamArray.push(manager);
        //this will call the next function
        console.log(teamArray);

        next();
    })
}

//Function for Engineer prompts
function engineerPromt() {
    inquirer.prompt(engineerQuestions).then((response) => {
        let name = response. engineerName;
        let id = response.engineerID;
        let email = response.engineerEmail;
        let github = response.github;
        // creats an object for this manager 
        const engineer = new Engineer(name, id, email, github);    
        teamArray.push(engineer);
        console.log(teamArray);
    
        next();
    })
}

function internPromt() {
    inquirer.prompt(internQuestions).then((response) => {

        let name = response. internName;
        let id = response.internID;
        let email = response.internEmail;
        let school = response.school;

        const intern = new Intern (name, id, email, school);
        teamArray.push(intern);
        console.log(teamArray);

        next();
    })
}

//this function generates the file
function makeTeam() {
    fs.writeFile(outputPath, render(teamArray), function(err) {
    if (err) { 
        return console.log(err)
    }
    })
    
    }
    
//calls the initiating function 
init();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
