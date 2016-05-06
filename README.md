# Enum JS

Enum JS is a library to work with enum types easily in javascript.

## How to use it

```
var enum = require('enum');
var MyEnum = enum.build(['RED', 'GREEN', 'BLUE']);
var myEnumInstance = new MyEnum(MyEnum.RED);
```

## Roadmap

### 0.1

* Inital code
    * Base (to be extended)
    * Enum
    * Flag
* Some testing