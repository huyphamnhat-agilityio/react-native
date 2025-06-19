import { ShippingAddress } from 'src/interfaces';

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

/**
 * Combine address fields into a single string.
 * @param shippingAddress The shipping address object.
 * @returns The combined address string.
 */
export const formatFullAddress = (shippingAddress: ShippingAddress): string => {
  const { address, city, district, country } = shippingAddress;

  // Combine with commas, filter out empty strings just in case
  return [address, city, district, country].filter(Boolean).join(', ');
};
