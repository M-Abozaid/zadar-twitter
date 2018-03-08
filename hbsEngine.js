/** 
 * initialize handlebars engine 
*/
var exphbs = require('express-handlebars')
const path = require('path')
const fs = require('fs')

var helpers = {};

// initialize helpers from the hbs_helpers folder
// (function initHelpers() {
//     var helpersPath = path.join(__dirname, './hbs_helpers');
//     var helpersFile = fs.readdirSync(helpersPath);

//     helpersFile.forEach(function (js) {
//     	const helperName = path.basename(js,'.js');
      
//         helpers[helperName] = require(path.join(helpersPath, js));
//     });
// })();

// register the helpers
var hbs = exphbs.create({
    extname: '.hbs',
    // defaultLayout: 'layout',
    // layoutsDir: path.join(__dirname , './views/layout'),
    // helpers: helpers
  })

module.exports = hbs
