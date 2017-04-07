
const validateSideToMove = (notation) => /^(w|b)$/.test(notation);

const validateCastlingAbility = (notation) => /^-$|^(KQ?k?q?|Qk?q?|kq?|q)$/.test(notation);

const validateEnPassantTarget = (notation) => /^(-|[a-h][36])$/.test(notation);

const validateHalfMoveClock = (notation) => /^([0-9]|[1-9][0-9])$/.test(notation);

const parseFEN = (fen) => {
  const fenArr = fen.split(' ');
  const [piecePlacement, sideToMove,
         castlingAbility, enPassantTarget,
         halfMoveClock, ...rest] = fenArr;

  return (fenArr.length === 6) &&
          validateSideToMove(fenArr[1]) &&
          validateCastlingAbility(castlingAbility) &&
          validateEnPassantTarget(enPassantTarget) &&
          validateHalfMoveClock(halfMoveClock);
}


export default parseFEN;
