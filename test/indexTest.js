import { expect } from 'chai';
import parse from '../src/index';

describe('Parsing FEN function', () => {

  context('checking "side to move"', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    let postString = 'KQkq - 0 1';

    it('checks contains more than 1 letter', () => {
      const notation = `${preString} wb ${postString}`;
      const result = parse(notation);
      expect(result).to.be.false;
    });

    it('checks valid letters', () => {
      const notation1 = `${preString} w ${postString}`;
      const notation2 = `${preString} b ${postString}`;

      expect(parse(notation1)).to.be.true;
      expect(parse(notation2)).to.be.true;
    });

    it('checks invalid letters', () => {
      const inValidLetters = ['a', 'c', 'd', 'e', 'f', 'g', 'h'];
      inValidLetters.forEach((letter) => {
        const notation = `${preString} ${letter} ${postString}`;
        const result = parse(notation);
        expect(result).to.be.false;
      });
    });
  });

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

  context('checking half move clock', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';
    let postString = '1';

    it('checks its valid in between 0 and 99', () => {
      const validNumbers = [0, 1, 9, 66, 99, 53, 73, 10];
      validNumbers.forEach((num) => {
        const notation = `${preString} ${num} ${postString}`;
        const result = parse(notation);
        expect(result).to.be.true;
      });
    });
    it('checks invalid range', () => {
      const inValidNumbers = [-20, 222, 100, 700];
      inValidNumbers.forEach((num) => {
        const notation = `${preString} ${num} ${postString}`;
        const result = parse(notation);
        expect(result).to.be.false;
      });
    });
  });

  context('checking full move counter', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 88';

    it('checks its valid in between 1 and 99', () => {
      const validNumbers = [1, 9, 66, 99, 53, 73, 10];
      validNumbers.forEach((num) => {
        const notation = `${preString} ${num}`;
        const result = parse(notation);
        expect(result).to.be.true;
      });
    });
    it('checks invalid range', () => {
      const inValidNumbers = [-20, 222, 100, 700, 0];
      inValidNumbers.forEach((num) => {
        const notation = `${preString} ${num}`;
        const result = parse(notation);
        expect(result).to.be.false;
      });
    });
  });

});
