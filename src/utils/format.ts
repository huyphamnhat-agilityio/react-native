export const parseToInt = (value: string, min: number, max: number) => {
  if (!value || value === 'NaN') {
    return min;
  }

  const number = parseInt(value, 10);

  if (number <= min) {
    return min;
  }

  if (number >= max) {
    return max;
  }

  return number;
};
