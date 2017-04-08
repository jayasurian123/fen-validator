
const validateRank = (notation) => {
  const letters = notation.split('');

  const totalSquares = letters.reduce((total, letter) => {
    const parsedLetter = parseInt(letter, 10);
    const isInteger = Number.isInteger(parsedLetter);
    return isInteger? (total + parsedLetter) : (total + 1);
  }, 0);

  return (totalSquares === 8);
}

const validatePiecePlacement = (notation) => {
  var ranks = notation.split('/');
  if (ranks.length !== 8) return false;

  return ranks.reduce(
    (lastVal, rank) => lastVal && validateRank(rank),
  true);
}

const validateSideToMove = (notation) => /^(w|b)$/.test(notation);

const validateCastlingAbility = (notation) => /^-$|^(KQ?k?q?|Qk?q?|kq?|q)$/.test(notation);

const validateEnPassantTarget = (notation) => /^(-|[a-h][36])$/.test(notation);

const validateHalfMoveClock = (notation) => /^([0-9]|[1-9][0-9])$/.test(notation);

const validateFullMoveCounter = (notation) => /^([1-9][0-9]{0,1})$/.test(notation);

const parseFEN = (fen) => {
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
