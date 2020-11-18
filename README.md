[![Build Status](https://travis-ci.org/jayasurian123/fen-validator.svg?branch=master)](https://travis-ci.org/jayasurian123/fen-validator)

# fen-validator

Library to validate the Chess [FEN notation](https://en.wikipedia.org/wiki/Forsyth–Edwards_Notation)

# install

`npm install fen-validator`

# usage

```javaScript
const validateFEN = require('fen-validator').default;

// ES6
import validateFEN from 'fen-validator';

validateFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1'); // true
```

# License

GNU GENERAL PUBLIC LICENSE V3
