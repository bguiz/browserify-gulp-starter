/*globals angular*/
var fa = angular.module('app', [
]);
var faCtrl = require('./fa-ctrl');
fa.controller('FaCtrl', faCtrl);
// fa.controller('FaCtrl', require('./fa-ctrl'));
module.exports = fa;
