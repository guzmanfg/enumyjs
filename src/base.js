/*global exports*/

/**
 *
 * @param {{}} params
 * @param {string[]} params.names Enumerator value names.
 * @param {function} params.generator
 * @param {function} params.parse
 * @constructor
 */
function EnumBuilder(params) {
    var names = params.names || [];
    this._values = {};
    this._index = 0;
    this._generator = params.generator || function(index) {
            return index;
        };
    this._setValue = params.setValue || function(Enum, value) {
            return value || 0;
        };

    names.forEach(this._addValue.bind(this));
}

EnumBuilder.prototype = {
    /**
     * Adds a value to enum type builder.
     * @param {string} name Name of new enum value.
     * @private
     */
    _addValue: function(name) {
        this._values[name] = this._generator(this._index++);
    },

    /**
     * Get new enum type.
     * @returns {*}
     */
    getType: function() {
        return this._appendValues(this._create());
    },

    /**
     * Appends enum _values to new enum type.
     * @param type
     * @returns {*}
     * @private
     */
    _appendValues: function(type) {
        var keys = Object.keys(this._values);
        var k;
        var name;
        for (k = 0; k < keys.length; k++) {
            name = keys[k];
            type[name] = this._values[name];
        }

        return type;
    },

    /**
     * Parse enum _values to array.
     * @returns {Array<Number>}
     */
    getValues: function() {
        var k;
        var key;
        var keys;

        if (!this._valueArray) {
            this._valueArray = [];
            keys = Object.keys(this._values);
            for (k = 0; k < keys.length; k++) {
                key = keys[k];
                this._valueArray.push(this._values[key]);
            }
        }

        return this._valueArray.slice();
    },

    /**
     * Enum builder.
     * @returns {function} Enum class constructor.
     * @private
     */
    _create: function() {
        var values = this.getValues();
        var setValue = this._setValue;

        /**
         * @class Enum
         */
        return function() {
            var params = [].slice.call(arguments, 0);
            /**
             * Value of enum
             */
            this.value = setValue.apply(this, [values].concat(params));
        };
    }
}
;

exports.builder = EnumBuilder;
/**
 * { names: names, valueGenerator: valueGenerator, constructor: constructor }
 * @param params
 * @returns {*}
 */
exports.build = function(params) {
    return new EnumBuilder(params).getType();
};
