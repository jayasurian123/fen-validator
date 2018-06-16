import parse from '../src/index';

describe('Parsing FEN function', () => {

  describe('validate piece placement', () => {
    let postString = 'w KQkq - 0 1';

    test('checks it contains 8 segments', () => {
      let notation = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP ${postString}`;
      let result = parse(notation);
      expect(result).toBe(false);

      notation = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR ${postString}`;
      result = parse(notation);
      expect(result).toBe(true);
    });

    describe('rank', () => {
      test('adds upto 8 in total', () => {
        let result = parse(`rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR ${postString}`);
        expect(result).toBe(true);

        result = parse(`rnbqkbnr/pppppppp/7/8/8/8/PPPPPPPP/RNBQKBNR ${postString}`);
        expect(result).toBe(false);

        result = parse(`rnb4r/p1pp1ppp/8/8/8/8/2PPPP2/R3KB1R ${postString}`);
        expect(result).toBe(true);

        result = parse(`rnbq2nr/pppppppp/8/8/8/8/PPP1PPP1/R3KB1R ${postString}`);
        expect(result).toBe(true);

        result = parse(`rnbqkbnr/pppppppp/8/8/8/8/PP2PPPP/R3K2NR ${postString}`);
        expect(result).toBe(false);
      });

      test('checks for continuous numbers', () => {
        let result = parse(`rnbq11nr/ppp3pp/17/8/8/8/PPPPPPPP/RNBQKBNR ${postString}`);
        expect(result).toBe(false);

        result = parse(`rnbq1bn1/ppp31p/17/8/8/8/5PP1/RNBQKBNR ${postString}`);
        expect(result).toBe(false);
      });

      test('checks for valid letters', () => {
        let result = parse(`rnbq9bnr/8/8/8/8/8/8/8 ${postString}`);
        expect(result).toBe(false);

        result = parse(`rnbq7Tnr/8/8/8/8/8/8/8 ${postString}`);
        expect(result).toBe(false);

        result = parse(`8/rnbq1nnr/8/8/KQB2pRN/8/8/8 ${postString}`);
        expect(result).toBe(true);

        result = parse(`8/LnbqQnKr/8/8/8/8/8/8 ${postString}`);
        expect(result).toBe(false);

        result = parse(`8/8/8/8/8/8/8/KnbqQnKr ${postString}`);
        expect(result).toBe(true);

      });
    });
  });

  describe('checking "side to move"', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    let postString = 'KQkq - 0 1';

    test('checks contains more than 1 letter', () => {
      const notation = `${preString} wb ${postString}`;
      const result = parse(notation);
      expect(result).toBe(false);
    });

    test('checks valid letters', () => {
      const notation1 = `${preString} w ${postString}`;
      const notation2 = `${preString} b ${postString}`;

      expect(parse(notation1)).toBe(true);
      expect(parse(notation2)).toBe(true);
    });

    test('checks invalid letters', () => {
      const inValidLetters = ['a', 'c', 'd', 'e', 'f', 'g', 'h'];
      inValidLetters.forEach((letter) => {
        const notation = `${preString} ${letter} ${postString}`;
        const result = parse(notation);
        expect(result).toBe(false);
      });
    });
  });

  describe('checking castling ability', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w';
    let postString = '- 0 1';

    test('checks more than 4 letters', () => {
      const notation = `${preString} KQkqq ${postString}`;
      const result = parse(notation);
      expect(result).toBe(false);
    });
    test('checks repeating letters', () => {
      const notation = `${preString} KQqq ${postString}`;
      const result = parse(notation);
      expect(result).toBe(false);
    });
    test('checks the right order', () => {
      const notation = `${preString} QKkq ${postString}`;
      const result = parse(notation);
      expect(result).toBe(false);
    });
    test('checks the denoting letters', () => {
      const notation = `${preString} JQkq ${postString}`;
      const result = parse(notation);
      expect(result).toBe(false);
    });
    test('checks the non castling ability', () => {
      const notation = `${preString} - ${postString}`;
      const result = parse(notation);
      expect(result).toBe(true);
    });
  });

  describe('checking en passant target square', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq';
    let postString = '0 1';

    test('checks the non en passant for both players', () => {
      const notation = `${preString} - ${postString}`;
      const result = parse(notation);
      expect(result).toBe(true);
    });

    test('checks no more than 2 letters possible', () => {
      const notation = `${preString} a11 ${postString}`;
      const result = parse(notation);
      expect(result).toBe(false);
    });

    test('checks for invalid combinations', () => {
      const invalidComb = ['1a', 'i1', 'a2', 'h7', ''];
      invalidComb.forEach((pair) => {
        const notation = `${preString} ${pair} ${postString}`;
        const result = parse(notation);
        expect(result).toBe(false);
      });

    });
    describe('when has 2 letters', () => {
      test('checks the first letter is from the range [a - h]', () => {
        const validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        validLetters.forEach((letter) => {
          const notation = `${preString} ${letter}3 ${postString}`;
          const result = parse(notation);
          expect(result).toBe(true);
        });
      });

      test('checks the first letter is either 3 or 6', () => {
        const validLetters = [3, 6];
        validLetters.forEach((letter) => {
          const notation = `${preString} a${letter} ${postString}`;
          const result = parse(notation);
          expect(result).toBe(true);
        });
      });
    });
  });

  describe('checking half move clock', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -';
    let postString = '1';

    test('checks its valid in between 0 and 99', () => {
      const validNumbers = [0, 1, 9, 66, 99, 53, 73, 10];
      validNumbers.forEach((num) => {
        const notation = `${preString} ${num} ${postString}`;
        const result = parse(notation);
        expect(result).toBe(true);
      });
    });
    test('checks invalid range', () => {
      const inValidNumbers = [-20, 222, 100, 700];
      inValidNumbers.forEach((num) => {
        const notation = `${preString} ${num} ${postString}`;
        const result = parse(notation);
        expect(result).toBe(false);
      });
    });
  });

  describe('checking full move counter', () => {
    let preString = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 88';

    test('checks its valid in between 1 and 99', () => {
      const validNumbers = [1, 9, 66, 99, 53, 73, 10];
      validNumbers.forEach((num) => {
        const notation = `${preString} ${num}`;
        const result = parse(notation);
        expect(result).toBe(true);
      });
    });
    test('checks invalid range', () => {
      const inValidNumbers = [-20, 222, 100, 700, 0];
      inValidNumbers.forEach((num) => {
        const notation = `${preString} ${num}`;
        const result = parse(notation);
        expect(result).toBe(false);
      });
    });
  });

  describe('acid test', () => {
    test('passes real examples', () => {
      let notation ='4k3/8/8/8/8/8/4P3/4K3 w - - 5 39';
      expect(parse(notation)).toBe(true);

      notation ='8/8/8/8/5R2/2pk4/5K2/8 b - - 0 1';
      expect(parse(notation)).toBe(true);

      notation ='k7/8/8/4N3/8/8/8/3K4 b - - 13 56';
      expect(parse(notation)).toBe(true);

      notation ='1r2k1r1/pbppnp1p/1b3P2/8/Q7/B1PB1q2/P4PPP/3R2K1 w - - 0 21';
      expect(parse(notation)).toBe(true);

      notation ='rnbqkbnr/pp2pppp/8/2ppP3/8/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 3';
      expect(parse(notation)).toBe(true);

      notation ='rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2';
      expect(parse(notation)).toBe(true);
    });
  });

});
