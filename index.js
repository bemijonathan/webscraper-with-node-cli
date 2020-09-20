const chalk = require('chalk');
var inquirer = require('inquirer');
const { getAllCourses, getSingleCourse } = require('./controllers/course.controller');
const BottomBar = inquirer.ui.BottomBar;


const loader = ['/ loading', '| loading', '\\ loading', '- loading'];
let i = 4;
const ui = new BottomBar({ bottomBar: loader[i % 4] });


inquirer
    .prompt({
        type: 'list',
        name: 'type',
        message: `What's do you want to check out ?`,
        choices: ['featured', 'List all Courses', 'Search for course', 'list all Subjects and Areas'],
    })
    .then((answer) => {
        if (answer.type === 'List all Courses') {
            let load = setInterval(() => {
                ui.updateBottomBar(loader[i++ % 4]);
            }, 300);
            getAllCourses().then(e => {
                clearInterval(load)
                let c = e.map(d => d.title)
                inquirer.prompt({
                    type: 'list',
                    name: 'title',
                    message: 'Select a course to see more detail ?',
                    choices: [...c],
                    loop: false
                }).then(course => {
                    let load = setInterval(() => {
                        ui.updateBottomBar(loader[i++ % 4]);
                    }, 300);
                    let url = e.find(i => i.title === course.title).url
                    getSingleCourse(url).then((detail) => {
                        clearInterval(load)
                        inquirer.prompt({
                            type: 'list',
                            name: 'title',
                            message: `${JSON.stringify(detail)}`,
                            choices: ['home', 'search course'],
                            loop: false
                        })
                    })
                })
            }).catch(err => {

                console.log(chalk.redBright(err))
                process.exit()
            });
        } else {
            console.log(answer)
        }
    });



// cmd.stdout.pipe(ui.log);


// cmd.on('close', () => {
//     ui.updateBottomBar('Installation done!\n');
//     process.exit();
// });