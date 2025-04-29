import { getCartItemsByUser } from '@/lib/actions/cart';

export const fetchCartItems = async (userId: string) => {
  const result = await getCartItemsByUser(userId);

  if (!result) {
    return {
      cartItems: [],
      quantities: {},
      subTotals: {},
    };
  }

  const initialQuantities: { [cartId: string]: number } = {};
  const initialSubTotals: { [cartId: string]: number } = {};

  result.forEach((item: CartItem) => {
    const price = item.product?.price ?? 0;
    const discount = item.product?.discount ?? 0;
    const quantity = item.cart.quantity;

    const priceAfterDiscount = price - (price * discount) / 100;
    const subTotal = priceAfterDiscount * quantity;

    initialQuantities[item.cart.id] = quantity;
    initialSubTotals[item.cart.id] = subTotal;
  });

  return {
    cartItemsInit: result,
    quantitiesInit: initialQuantities,
    subTotalsInit: initialSubTotals,
  };
};
