var EventHandler = require('famous/core/EventHandler');

/* @ngInject */ module.exports = function($http) {
    'use strict';
    var vm = this;
    vm.items = [];
    $http.get('http://www.reddit.com/r/node.json')
    .then(function(data) {
        console.log('$http.get', arguments);
        vm.items = data.data.data.children.map(function(c) {
            return {
                url: c.data.url,
                title: c.data.title,
            };
        });
    });
    vm.contentScrollViewHandler = new EventHandler();
};
