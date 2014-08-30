/* @ngInject */ module.exports = function HelloCtrl($http) {
    'use strict';
    var vm = this;
    vm.displayText = 'World!!';
    vm.xhrData = {};
    $http.get('http://www.reddit.com/r/nodejs.json')
        .then(function(data) {
            console.log('$http.get', arguments);
            vm.xhrData.parsed = data.data.data.children.map(function(c) {
                return {
                    url: c.data.url,
                    title: c.data.title,
                };
            });
        });
};
