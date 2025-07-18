export const formatNumberWithThousandSeparator = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

export const parseToInt = (value: string, min: number, max: number) => {
  if (!value || value === "NaN") {
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

export const maskCardNumber = (cardNumber: string) => {
  const clean = cardNumber.replace(/\s+/g, "");

  if (clean.length !== 16) return cardNumber;

  return [
    cardNumber.slice(0, 4),
    cardNumber.slice(4, 6) + "**",
    "****",
    cardNumber.slice(12, 16),
  ].join(" ");
};
