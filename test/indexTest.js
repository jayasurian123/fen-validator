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
});