const { Buffer } = require('buffer');
const fs = require('fs');

/**
 * @param {string} fileName name of the file
 * @param {array} fileContent content of the file
 * 
 */

const writefile = (fileName, fileContent) => {
    fs.writeFile('data/' + fileName + '.json', JSON.stringify(fileContent), (err, data) => {
        console.log('err: failed to write the file')
    })
}


module.exports = writefile