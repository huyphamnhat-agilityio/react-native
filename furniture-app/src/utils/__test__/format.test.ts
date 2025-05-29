import {parseToInt} from '../format';

describe('parseToInt', () => {
  it('should return min if value is an empty string', () => {
    expect(parseToInt('', 10, 100)).toBe(10);
  });

  it("should return min if value is 'NaN'", () => {
    expect(parseToInt('NaN', 10, 100)).toBe(10);
  });

  it('should return min if the parsed number is less than or equal to min', () => {
    expect(parseToInt('5', 10, 100)).toBe(10);
    expect(parseToInt('10', 10, 100)).toBe(10); // Edge case
  });

  it('should return max if the parsed number is greater than or equal to max', () => {
    expect(parseToInt('150', 10, 100)).toBe(100);
    expect(parseToInt('100', 10, 100)).toBe(100); // Edge case
  });

  it('should return the parsed number if it is within the range [min, max]', () => {
    expect(parseToInt('50', 10, 100)).toBe(50);
    expect(parseToInt('75', 10, 100)).toBe(75);
  });
});
