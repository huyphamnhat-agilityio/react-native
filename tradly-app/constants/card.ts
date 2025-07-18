import { UserCard } from "@/interfaces";

export const EMPTY_CARD: UserCard = {
  id: "",
  holderName: "",
  cardNumber: "",
  expiresDates: "",
  cvc: "",
};

export const MOCK_CARDS: UserCard[] = [
  {
    id: "1",
    holderName: "Tradly Team",
    cardNumber: "5501 22** **** 4487",
    expiresDates: "16/19",
    cvc: "111",
  },
  { id: "", holderName: "", cardNumber: "", expiresDates: "", cvc: "" },
];
