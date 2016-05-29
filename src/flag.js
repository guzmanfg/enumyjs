/*global require, module*/
var base = require('./base');
module.exports = function(names) {
    var Flag = base.build({
        names: names,
        /**
         * Flag value setter.
         * @param {number[]}    enumValues  All enum values.
         * @param {...number}   values      Flag values.
         * @returns {number}
         */
        setValue: function(enumValues, values) {
            var value = 0;
            var parameters = [].slice.call(arguments, 1);
            for (var i = 0; i < parameters.length; i++) {
                if (enumValues.indexOf(parameters[i]) < 0) {
                    throw new Error("Invalid enum value.");
                }
                value |= parameters[i];
            }

            return value;
        },
        generator: function(index) {
            return 1 << index;
        }
    });

    // Classifiers
    Flag.prototype.equals = function(value) {
        return this.value === value;
    };

    Flag.prototype.hasAny = function(value) {
        return (this.value & value) > 0;
    };

    Flag.prototype.hasAll = function(value) {
        return (this.value & value) === this.value;
    };

    Flag.prototype.intersects = Flag.prototype.hasAny;

    // Flag operators
    Flag.prototype.add = function(value) {
        this.value = this.value | value;
    };

    Flag.prototype.remove = function(value) {
        this.value = this.value & (~value);
    };

    // Logical operators
    Flag.prototype.union = function(flag){
        return this.value | flag.value;
    };
    Flag.prototype.intersection = function(flag){
        return this.value & flag.value;
    }

    return Flag;
};