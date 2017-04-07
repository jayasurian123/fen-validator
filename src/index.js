
const validateSideToMove = (notation) => /w|b/.test(notation);

const validateCastlingAbility = (notation) => /^-$|^(KQ?k?q?|Qk?q?|kq?|q)$/.test(notation);

const parseFEN = (fen) => {
  const fenArr = fen.split(' ');
  const [piecePlacement, sideToMove,
         castlingAbility, enPassantTarget,
         ...rest] = fenArr;

  return (fenArr.length === 6) &&
          validateSideToMove(fenArr[1]) &&
          validateCastlingAbility(castlingAbility);
}


export default parseFEN;


// https://github.com/oakmac/chessboardjs/blob/master/www/js/chess.js
// https://chessprogramming.wikispaces.com/Forsyth-Edwards+Notation
