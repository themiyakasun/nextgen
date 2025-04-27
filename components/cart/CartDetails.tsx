'use client';

import { getCartItemsByUser, updateCartQuantities } from '@/lib/actions/cart';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import CartItemImage from './CartItemImage';
import { Input } from '../ui/input';
import Button from '../shared/Button';
import { toast } from 'sonner';

const CartDetails = ({ session }: { session: Session | null }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null | undefined>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState<{ [cartId: string]: number }>(
    {}
  );
  const [subTotals, setSubTotals] = useState<{ [cartId: string]: number }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const updateCart = async (cartId: string, quantity: number) => {
    const result = await updateCartQuantities(cartId, quantity);

    if (result.error) {
      toast.error(result.error as string);
    }

    toast.success('Cart Updated');
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (session === null) {
        redirect('/sign-in');
      }
      setLoading(true);
      const result = await getCartItemsByUser(session.user?.id as string);

      if (result) {
        setCartItems(result);
        const initialQuantities: { [cartId: string]: number } = {};
        const initialSubTotals: { [cartId: string]: number } = {};

        result.forEach((item) => {
          const price = item.product?.price ?? 0;
          const discount = item.product?.discount ?? 0;
          const quantity = item.cart.quantity;

          const priceAfterDiscount = price - (price * discount) / 100;
          const subTotal = priceAfterDiscount * quantity;

          initialQuantities[item.cart.id] = quantity;
          initialSubTotals[item.cart.id] = subTotal;
        });

        setQuantities(initialQuantities);
        setSubTotals(initialSubTotals);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [session?.user?.id, session]);

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
            </tr>
          </thead>
          <tbody>
            {cartItems !== undefined && cartItems !== null ? (
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
                            const newQuantity = parseInt(e.target.value);
                            const price = cartItem.product?.price ?? 0;
                            const discount = cartItem.product?.discount ?? 0;
                            const priceAfterDiscount =
                              price - (price * discount) / 100;
                            const newSubTotal =
                              priceAfterDiscount * newQuantity;

                            setQuantities((prev) => ({
                              ...prev,
                              [cartItem.cart.id]: newQuantity,
                            }));

                            setSubTotals((prev) => ({
                              ...prev,
                              [cartItem.cart.id]: newSubTotal,
                            }));

                            updateCart(cartItem.cart.id, newQuantity);
                          }}
                        />
                      </form>
                    </td>
                    <td data-cell='sub total'>
                      Rs. {subTotals[cartItem.cart.id].toLocaleString()}
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
      <div className='flex mt-5 md:justify-between justify-center w-full items-center'>
        <div>
          <Button
            type='submit'
            variant='primary'
            color='black'
            text='Update Shopping Cart'
          />
        </div>
      </div>
    </>
  );
};

export default CartDetails;
