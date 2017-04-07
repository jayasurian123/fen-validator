
const validateSideToMove = (notation) => /w|b/.test(notation);

const validateCastlingAbility = (notation) => /^-$|^(KQ?k?q?|Qk?q?|kq?|q)$/.test(notation);

const validateEnPassantTarget = (notation) => /^(-|[a-h][36])$/.test(notation);

const parseFEN = (fen) => {
  const fenArr = fen.split(' ');
  const [piecePlacement, sideToMove,
         castlingAbility, enPassantTarget,
         ...rest] = fenArr;

  return (fenArr.length === 6) &&
          validateSideToMove(fenArr[1]) &&
          validateCastlingAbility(castlingAbility) &&
          validateEnPassantTarget(enPassantTarget);
}


export default parseFEN;
