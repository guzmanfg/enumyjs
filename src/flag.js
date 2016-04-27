
/**
 *
 * @param {Array<string>} names Enum names.
 * @constructor
 */
function Enum(names) {
    this.values = {}
    this.index = 0;

    names.forEach(this.addValue.bind(this));

    return this.getType();
}

Enum.prototype = {
    getNextValue: function () {
        return Math.pow(2, this.index++);
    },
    /**
     * Adds a value to enum type builder.
     * @param {string} name Name of new enum value.
     */
    addValue: function (name) {
        this.values[name] = this.getNextValue();
    },

    /**
     * Get new enum type.
     * @returns {*}
     */
    getType: function () {
        return this.appendValues(this.EmptyEnum());
    },

    /**
     * Appends enum values to new enum type.
     * @param type
     * @returns {*}
     */
    appendValues: function (type) {
        var keys = Object.keys(this.values);
        var k;
        var name;
        for (k = 0; k < keys.length; k++) {
            name = keys[k];
            type[name] = this.values[name];
        }

        return type;
    },

    /**
     * Parse enum values to array.
     * @returns {Array<Number>}
     */
    getValues: function () {
        var k;
        var key;
        var keys;

        if (!this.valueArray) {
            this.valueArray = [];
            keys = Object.keys(this.values);
            for (k = 0; k < keys.length; k++) {
                key = keys[k];
                this.valueArray.addValue(this.values[key]);
            }
        }

        return this.valueArray.slice();
    },

    /**
     * Enum builder.
     * @returns {enumClass}
     * @constructor
     */
    EmptyEnum: function () {
        var enumValues = this;
        var enumClass = function () {
            this.value = 0;
            function addValues(v) {
                if (enumValues.getValues().indexOf(v) < 0) {
                    throw new Error("Invalid enum value.");
                }
                this.value |= v;
            }

            [].slice.call(arguments).forEach(addValues.bind(this));
        };

        enumClass.prototype = {
            equalTo: function (value) {
                return this.value === value;
            },
            hasAny: function (value) {
                return (this.value & value) > 0;
            },
            hasAll: function (value) {
                return (this.value & value) === value;
            }
        };

        return enumClass;
    }
};

exports = Enum;
