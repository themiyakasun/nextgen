import { createStore } from 'zustand';

export type CartState = {
  cartItems: CartItem[];
  quantities: { [cartId: string]: number };
  subTotals: { [cartId: string]: number };
  loading: boolean;
};

export type CartActions = {
  setCartData: (
    cartItems: CartItem[],
    quantities: { [cartId: string]: number },
    subTotals: { [cartId: string]: number }
  ) => void;
  setLoading: (loading: boolean) => void;
  setQuantityAndSubtotal: (
    cartId: string,
    quantity: number,
    subTotal: number
  ) => void;
};

export type CartStore = CartState & CartActions;

export const defaultInitState: CartState = {
  cartItems: [],
  quantities: {},
  subTotals: {},
  loading: false,
};

export const createCartStore = (initState: CartState = defaultInitState) => {
  return createStore<CartStore>()((set) => ({
    ...initState,
    setCartData: (cartItems, quantities, subTotals) => {
      console.log('Zustand setCartData called:', {
        cartItems,
        quantities,
        subTotals,
      });
      set({ cartItems, quantities, subTotals });
    },
    setLoading: (loading) => set({ loading }),
    setQuantityAndSubtotal: (
      cartId: string,
      quantity: number,
      subTotal: number
    ) =>
      set((state) => ({
        quantities: {
          ...state.quantities,
          [cartId]: quantity,
        },
        subTotals: {
          ...state.subTotals,
          [cartId]: subTotal,
        },
      })),
  }));
};
