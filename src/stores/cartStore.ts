import { ICartItem } from "@/interfaces/cart";
import { IPokemonCard } from "@/interfaces/pokemonCard";
import { create } from "zustand";

interface CartState {
  cartItems: ICartItem[];
  addCart: (pokemonCard: IPokemonCard) => void;
  increaseCart: (id: string | number) => void;
  decreaseCart: (id: string | number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addCart: (pokemonCard: IPokemonCard) => {
    set((state) => {
      let cloneItems: ICartItem[] = [...state.cartItems];

      const findExistItem = cloneItems.find((e) => e.id === pokemonCard.id);

      if (findExistItem) {
        findExistItem.quantity++;
      } else {
        const newItem = {
          id: pokemonCard.id,
          name: pokemonCard.name,
          price: pokemonCard.cardmarket?.prices.averageSellPrice ?? 0,
          image: pokemonCard.images.small,
          quantity: 1,
        };

        cloneItems = [...cloneItems, newItem];
      }

      return {
        ...state,
        cartItems: cloneItems,
      };
    });
  },
  increaseCart: (id: string | number) => {
    set((state) => {
      let cloneItems: ICartItem[] = [...state.cartItems];

      const findItem = cloneItems.find((e) => e.id === id) as ICartItem;

      findItem.quantity = findItem.quantity + 1;

      return {
        ...state,
        cartItems: cloneItems,
      };
    });
  },
  decreaseCart: (id: string | number) => {
    set((state) => {
      let cloneItems: ICartItem[] = [...state.cartItems];

      const findItem = cloneItems.find((e) => e.id === id) as ICartItem;

      findItem.quantity = findItem.quantity - 1;

      if (findItem.quantity <= 0)
        cloneItems = cloneItems.filter((e) => e.quantity !== 0);

      return {
        ...state,
        cartItems: cloneItems,
      };
    });
  },
  clearCart: () => {
    set((state) => {
      return {
        ...state,
        cartItems: [],
      };
    });
  },
}));
