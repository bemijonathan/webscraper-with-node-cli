const { Buffer } = require('buffer');
const chalk = require('chalk');
const fs = require('fs').promises;

/**
 * @param {string} fileName name of the file
 * @param {array} fileContent content of the file
 * 
 */

const writefile = async (fileName, fileContent) => {
    try {
        await fs.writeFile('data/' + fileName + '.json', JSON.stringify(fileContent))
    } catch (error) {
        if (error) {
            console.log(chalk.redBright(`\n err: failed to write the file`, error))
            process.exit()
        } else {
            console.log(chalk.greenBright(`\n saved: response is saved here data/${fileName}.json`))
        }
    }
}


module.exports = writefile
