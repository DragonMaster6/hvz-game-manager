var rootPath = '/home/ben/Sites/htdocs/hvz/angular';
var nodeMods = rootPath + '/node_modules';
var sourcePath = rootPath + '/app/src';

require('../../node_modules/angular/angular.js');
require('../../node_modules/angular-route/angular-route.min.js');
require('../../node_modules/angular-sanitize/angular-sanitize.min.js');

require('./app.module.js');
require('./sections');
require('./shared');
require('./components');
