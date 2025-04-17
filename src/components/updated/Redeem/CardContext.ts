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
  cardType?: string | null;
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
  setCardDetails: (details: any[]) => void;
  updateGiftCardDetails: (updatedCards: any[]) => void;
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
      cardType: null,
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
          cardType: null,
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
          cardType: null,
        },
      ],
      amountInUsd: 0,
      selectedImg: null,
      selectedImgUrl: null,
    }),

  setAmountInUsd: (amount) => set({ amountInUsd: amount }),
  setSelectedImg: (img) => set({ selectedImg: img }),
  setSelectedImgUrl: (url) => set({ selectedImgUrl: url }),
  
  setCardDetails: (details) => {
    if (!details || details.length === 0) return;
    
    const firstCard = details[0];
    
    set((state) => ({
      cardDetails: [
        {
          ...state.cardDetails[0],
          selectedGiftCard: firstCard.voucher || null,
          amountInUsd: firstCard.amountInUsd || 0,
          selectedImg: firstCard.giftCardImg || null,
          selectedImgUrl: firstCard.giftCardUrl || firstCard.giftCardImgUrl || null,
          cardType: firstCard.cardType || null,
        },
      ],
      amountInUsd: firstCard.amountInUsd || 0,
      selectedImg: firstCard.giftCardImg || null,
      selectedImgUrl: firstCard.giftCardUrl || firstCard.giftCardImgUrl || null,
    }));
  },
  
  // New function to update gift card details after editing
  updateGiftCardDetails: (updatedCards) => {
    if (!updatedCards || updatedCards.length === 0) return;
    
    set((state) => {
      const newCardDetails = [...state.cardDetails];
      let globalAmountInUsd = state.amountInUsd;
      let globalSelectedImg = state.selectedImg;
      let globalSelectedImgUrl = state.selectedImgUrl;
      
      // Update each card in cardDetails that matches a voucher in updatedCards
      updatedCards.forEach(updatedCard => {
        const cardIndex = newCardDetails.findIndex(
          card => card.selectedGiftCard === updatedCard.voucher
        );
        
        if (cardIndex !== -1) {
          // Update the card details
          newCardDetails[cardIndex] = {
            ...newCardDetails[cardIndex],
            selectedImgUrl: updatedCard.giftCardUrl || newCardDetails[cardIndex].selectedImgUrl,
            cardType: updatedCard.cardType || newCardDetails[cardIndex].cardType,
            amountInUsd: updatedCard.amount ? Number(updatedCard.amount) : newCardDetails[cardIndex].amountInUsd,
          };
          
          // If this is the first card, also update the global state
          if (cardIndex === 0) {
            globalAmountInUsd = updatedCard.amount ? Number(updatedCard.amount) : globalAmountInUsd;
            globalSelectedImgUrl = updatedCard.giftCardUrl || globalSelectedImgUrl;
            globalSelectedImg = updatedCard.giftCardUrl || globalSelectedImg;
          }
        }
      });
      
      return { 
        cardDetails: newCardDetails,
        amountInUsd: globalAmountInUsd,
        selectedImg: globalSelectedImg,
        selectedImgUrl: globalSelectedImgUrl
      };
    });
  },
}));
