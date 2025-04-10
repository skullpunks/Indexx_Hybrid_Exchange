import { create } from 'zustand';

interface CardDetail {
  id: number;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message: string;
  selectedGiftCard: any | null;
  amountInUsd?: number;
  selectedImg?: string | null;
  selectedImgUrl?: string | null;
}

interface CardState {
  cardDetails: CardDetail[];
  amountInUsd: number;
  selectedImg: string | null;
  selectedImgUrl: string | null;

  addCard: () => void;
  removeCard: (indexToRemove: number) => void;
  updateCardDetail: (
    index: number,
    field: keyof CardDetail,
    value: any
  ) => void;
  clearCardDetails: () => void;
  setAmountInUsd: (amount: number) => void;
  setSelectedImg: (img: string | null) => void;
  setSelectedImgUrl: (url: string | null) => void;
}

const defaultMessage = `Hey [Receiver's Name],

This is [Your Name], and I'm excited to gift you something truly special - a Crypto Gift Card!

Consider it the gift of the future and an investment in what's to come. Redeem it now to kickstart your crypto journey.

Enjoy and happy investing!`;

export const useCardStore = create<CardState>((set) => ({
  cardDetails: [
    {
      id: 0,
      recipientEmail: '',
      senderName: '',
      senderEmail: '',
      message: defaultMessage,
      selectedGiftCard: null,
      amountInUsd: 0,
      selectedImg: null,
      selectedImgUrl: null,
    },
  ],
  amountInUsd: 0,
  selectedImg: null,
  selectedImgUrl: null,

  addCard: () =>
    set((state) => ({
      cardDetails: [
        ...state.cardDetails,
        {
          id: state.cardDetails.length,
          recipientEmail: '',
          senderName: '',
          senderEmail: '',
          message: defaultMessage,
          selectedGiftCard: null,
          amountInUsd: 0,
          selectedImg: null,
          selectedImgUrl: null,
        },
      ],
    })),

  removeCard: (indexToRemove) =>
    set((state) => ({
      cardDetails:
        state.cardDetails.length > 1
          ? state.cardDetails.filter((_, index) => index !== indexToRemove)
          : state.cardDetails,
    })),

  updateCardDetail: (index, field, value) =>
    set((state) => {
      const updatedDetails = [...state.cardDetails];
      updatedDetails[index][field as keyof CardDetail] = value as never;
      return { cardDetails: updatedDetails };
    }),

  clearCardDetails: () =>
    set({
      cardDetails: [
        {
          id: 0,
          recipientEmail: '',
          senderName: '',
          senderEmail: '',
          message: defaultMessage,
          selectedGiftCard: null,
          amountInUsd: 0,
          selectedImg: null,
          selectedImgUrl: null,
        },
      ],
      amountInUsd: 0,
      selectedImg: null,
      selectedImgUrl: null,
    }),

  setAmountInUsd: (amount) => set({ amountInUsd: amount }),
  setSelectedImg: (img) => set({ selectedImg: img }),
  setSelectedImgUrl: (url) => set({ selectedImgUrl: url }),
}));
