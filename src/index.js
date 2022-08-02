const validateRank = (notation) => {
  const hasContinuousNumbers = /\d{2}/.test(notation);

  const letters = notation.split('');

  const hasOnlyValidLetters = () => {
    return !letters.some((letter) => {
      return !/[1-8]|[pkqbnrPKQBNR]/.test(letter);
    });
  };

  const totalSquares = letters.reduce((total, letter) => {
    const parsedLetter = parseInt(letter, 10);
    const isInteger = Number.isInteger(parsedLetter);
    return isInteger? (total + parsedLetter) : (total + 1);
  }, 0);

  return ( hasOnlyValidLetters() &&
           !hasContinuousNumbers &&
           totalSquares === 8 );
}

const validatePiecePlacement = (notation) => {
  var ranks = notation.split('/');
  if (ranks.length !== 8) return false;

  return ranks.reduce(
    (lastVal, rank) => lastVal && validateRank(rank),
  true);
}

const curry = f => a => b => f(a, b);

const check = curry((regex, str) => regex.test(str));

const validateSideToMove = check(/^(w|b)$/);

const validateCastlingAbility = check(/^-$|^(KQ?k?q?|Qk?q?|kq?|q)$/);

const validateEnPassantTarget = check(/^(-|[a-h][36])$/);

const validateHalfMoveClock = check(/^([0-9]|[1-9][0-9])$/);

const validateFullMoveCounter = check(/^([1-9][0-9]{0,1})$/);

const validateString = (string) => (typeof(string) === 'string');

const parseFEN = (fen) => {
  if(validateString(fen) === false){
    return false
  }
  const fenArr = fen.split(' ');
  const [piecePlacement, sideToMove,
         castlingAbility, enPassantTarget,
         halfMoveClock, fullMoveCounter] = fenArr;

  return (fenArr.length === 6) &&
          validatePiecePlacement(piecePlacement) &&
          validateSideToMove(sideToMove) &&
          validateCastlingAbility(castlingAbility) &&
          validateEnPassantTarget(enPassantTarget) &&
          validateHalfMoveClock(halfMoveClock) &&
          validateFullMoveCounter(fullMoveCounter);
}


export default parseFEN;
