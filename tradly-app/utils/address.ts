import { UserAddress } from "@/interfaces";

export const generateDeliveryInfo = ({
  name,
  zipcode,
  streetAddress,
  city,
  state,
}: UserAddress) =>
  `Deliver to ${name}, ${zipcode}, ${streetAddress}, ${city}, ${state}`;
