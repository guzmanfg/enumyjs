/*global require, module*/
var base = require('./base');
module.exports = function(names) {
    return base.build({
        names: names,
        generator: function(index) {
            return index + 1;
        }
    });
};