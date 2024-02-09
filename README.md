[![CircleCI](https://dl.circleci.com/status-badge/img/gh/jayasurian123/fen-validator/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/jayasurian123/fen-validator/tree/master)

# fen-validator

Library to validate the Chess [FEN notation](https://en.wikipedia.org/wiki/Forsyth–Edwards_Notation)

# install

`npm install fen-validator`

# usage

```javaScript

// ES6
import validateFEN from 'fen-validator';

// commonJS
const validateFEN = require('fen-validator');

validateFEN('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1'); // true
```

# License

GNU GENERAL PUBLIC LICENSE V3
