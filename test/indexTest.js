import { expect } from 'chai';
import parse from '../src/index';

describe('Parsing FEN function', () => {

  context('checking castling ability', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w';
    let postString = '- 0 1';

    it('checks more than 4 letters', () => {
      const notation = `${preString} KQkqq ${postString}`;
      const result = parse(notation);
      expect(result).to.be.false;
    });
    it('checks repeating letters', () => {
      const notation = `${preString} KQqq ${postString}`;
      const result = parse(notation);
      expect(result).to.be.false;
    });
    it('checks the right order', () => {
      const notation = `${preString} QKkq ${postString}`;
      const result = parse(notation);
      expect(result).to.be.false;
    });
    it('checks the denoting lettres', () => {
      const notation = `${preString} JQkq ${postString}`;
      const result = parse(notation);
      expect(result).to.be.false;
    });
    it('checks the non castling ability', () => {
      const notation = `${preString} - ${postString}`;
      const result = parse(notation);
      expect(result).to.be.true;
    });
  });

  context('checking en passant target square', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq';
    let postString = '0 1';

    it('checks the non en passant for both players', () => {
      const notation = `${preString} - ${postString}`;
      const result = parse(notation);
      expect(result).to.be.true;
    });

    it('checks no more than 2 letters possible', () => {
      const notation = `${preString} a11 ${postString}`;
      const result = parse(notation);
      expect(result).to.be.false;
    });

    it('checks for invalid combinations', () => {
      const invalidComb = ['1a', 'i1', 'a2', 'h7', ''];
      invalidComb.forEach((pair) => {
        const notation = `${preString} ${pair} ${postString}`;
        const result = parse(notation);
        expect(result).to.be.false;
      });

    });
    context('when has 2 letters', () => {
      it('checks the first letter is from the range [a - h]', () => {
        const validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        validLetters.forEach((letter) => {
          const notation = `${preString} ${letter}3 ${postString}`;
          const result = parse(notation);
          expect(result).to.be.true;
        });
      });

      it('checks the first letter is either 3 or 6', () => {
        const validLetters = [3, 6];
        validLetters.forEach((letter) => {
          const notation = `${preString} a${letter} ${postString}`;
          const result = parse(notation);
          expect(result).to.be.true;
        });
      });
    });

  });
});
