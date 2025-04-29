import { getCartItemsByUser, removeCartItem } from '@/lib/actions/cart';
import { toast } from 'sonner';

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

export const cartTotal = (
  cartItems: CartItem[],
  quantities: { [cartId: string]: number }
) => {
  if (cartItems !== null && cartItems !== undefined) {
    const subTotal =
      cartItems?.reduce((total, item) => {
        if (!item.product) return total;

        const { price, discount } = item.product;
        const finalPrice = discount ? price - (price * discount) / 100 : price;

        return total + finalPrice * quantities[item.cart.id];
      }, 0) ?? 0;

    return subTotal;
  }
};

export const handleRemoveCartItem = async (cartId: string) => {
  try {
    const result = await removeCartItem(cartId);

    if (result.error) {
      toast.error(result.error as string);
    }

    toast.success('Item removed successfully');
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
