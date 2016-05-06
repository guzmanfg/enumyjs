/*global require, module*/
var base = require('./base');
module.exports = function(names) {
    return base.build({
        names: names,
        setValue: function(enumValues) {
            var value = 0;
            var values = [].slice.call(arguments, 1);
            for(var i = 0; i < values.length; i++){
                if (enumValues.indexOf(values[i]) < 0) {
                    throw new Error("Invalid enum value.");
                }
                value |= values[i];
            }

            return value;
        },
        generator: function(index) {
            return 1 << index;
        }
    });
};
