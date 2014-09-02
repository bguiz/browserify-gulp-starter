var app = require('./components/flickr-client');
app.controller('MainCtrl', require('./components/main/main-ctrl'));
app.directive('faCuboid', require('./components/lib/fa-cuboid'));
app.directive('photoCube', require('./components/photo-cube/photo-cube-dir'));
app.controller('PhotoCubeCtrl', require('./components/photo-cube/photo-cube-ctrl'));
app.directive('photoFit', require('./components/photo-fit/photo-fit-dir'));
app.factory('flickr', require('./components/data/flickr-svc'));
app.factory('config', require('./components/data/config-svc'));
