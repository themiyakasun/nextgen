'use client';

import { clearAllCartItems, updateCartQuantities } from '@/lib/actions/cart';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import Loader from '../shared/Loader';
import CartItemImage from './CartItemImage';
import { Input } from '../ui/input';
import Button from '../shared/Button';
import { toast } from 'sonner';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { fetchCartItems, handleRemoveCartItem } from '@/services/cart';
import { useCartStore } from '@/providers/CartStoreProvider';

const CartDetails = ({ session }: { session: Session | null }) => {
  const {
    cartItems,
    quantities,
    subTotals,
    loading,
    setCartData,
    setLoading,
    setQuantityAndSubtotal,
  } = useCartStore((state) => state);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const updateCart = async (cartId: string, quantity: number) => {
    const result = await updateCartQuantities(cartId, quantity);

    if (result.error) {
      toast.error(result.error as string);
    }
  };

  const handleRemoveCartItems = async () => {
    try {
      const result = await clearAllCartItems(session?.user?.id as string);

      if (result.error) {
        toast.error(result.error as string);
      }

      toast.success('Cart cleared successfully');
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      if (session === null || session.user === undefined) {
        redirect('/sign-in');
      }
      setLoading(true);
      try {
        const { cartItemsInit, quantitiesInit, subTotalsInit } =
          await fetchCartItems(session?.user.id as string);

        if (quantitiesInit === undefined) return;
        setCartData(cartItemsInit, quantitiesInit, subTotalsInit);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [session?.user?.id, session, setCartData, setLoading]);

  return (
    <>
      {loading && <Loader />}
      <div className='flex'>
        <table className='cart-table'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Sub Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems !== undefined &&
            cartItems !== null &&
            cartItems.length > 0 ? (
              cartItems.map((cartItem) => {
                const price = cartItem.product?.price ?? 0;

                return (
                  <tr key={cartItem.cart.id}>
                    <td>
                      <div className='flex items-center gap-2'>
                        <CartItemImage
                          productId={cartItem.product?.id as string}
                        />
                        {cartItem.product?.name}
                      </div>
                    </td>
                    <td data-cell='price'>Rs. {price.toLocaleString()}</td>
                    <td data-cell='QTY'>
                      {' '}
                      <form className='flex gap-3' onSubmit={handleSubmit}>
                        <Input
                          type='number'
                          value={
                            quantities[cartItem.cart.id] ??
                            cartItem.cart.quantity
                          }
                          className='w-[70px] h-[50px]'
                          onChange={(e) => {
                            let newQuantity = parseInt(e.target.value);

                            if (newQuantity === 0) newQuantity = 1;

                            const price = cartItem.product?.price ?? 0;
                            const discount = cartItem.product?.discount ?? 0;
                            const priceAfterDiscount =
                              price - (price * discount) / 100;
                            const newSubTotal =
                              priceAfterDiscount * newQuantity;

                            setQuantityAndSubtotal(
                              cartItem.cart.id,
                              newQuantity,
                              newSubTotal
                            );

                            updateCart(cartItem.cart.id, newQuantity);
                          }}
                        />
                      </form>
                    </td>
                    <td data-cell='sub total'>
                      Rs. {subTotals[cartItem.cart.id].toLocaleString()}
                    </td>
                    <td>
                      <div className='flex md:flex-col md:justify-center gap-2'>
                        <button
                          className='border-2 border-secondary-custom text-secondary-custom rounded-full text-sm w-5 h-5 flex items-center justify-center'
                          onClick={() => handleRemoveCartItem(cartItem.cart.id)}
                        >
                          <CloseOutlinedIcon fontSize='inherit' />
                        </button>
                        <button className='border-2 border-secondary-custom text-secondary-custom rounded-full text-sm w-5 h-5 flex items-center justify-center'>
                          <EditOutlinedIcon fontSize='inherit' />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No cart items available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {cartItems !== undefined &&
        cartItems !== null &&
        cartItems.length > 0 && (
          <div className='flex mt-5 md:justify-between justify-center w-full items-center'>
            <div>
              <Button
                type='submit'
                variant='primary'
                color='black'
                text='Delete All Items'
                onClick={handleRemoveCartItems}
              />
            </div>
          </div>
        )}
    </>
  );
};

export default CartDetails;
