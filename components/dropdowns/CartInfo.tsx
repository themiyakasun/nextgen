'use client';

import { getCartItemsByUser } from '@/lib/actions/cart';
import React, { useEffect, useState } from 'react';
import Button from '../shared/Button';
import CartInfoItem from '../cart/CartInfoItem';

type Props = {
  show: boolean;
  userId?: string;
};

const CartInfo = ({ show, userId }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[] | null | undefined>(
    null
  );

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        const result = await getCartItemsByUser(userId);
        setCartItems(result);
      }
    };

    fetchCartItems();
  }, [userId]);

  let subTotal;

  if (cartItems !== null && cartItems !== undefined) {
    subTotal =
      cartItems?.reduce((total, item) => {
        if (!item.product) return total;

        const { price, discount } = item.product;
        const finalPrice = discount ? price - (price * discount) / 100 : price;

        return total + finalPrice * item.cart.quantity;
      }, 0) ?? 0;
  }

  return (
    <div
      className={`${show ? 'block' : 'hidden'} absolute bg-white top-10 right-0 py-7 shadow-2xl z-20 w-[310px] after:absolute after:-top-2 after:right-2 after:w-0 after:h-0 after:border-l-5 after:border-r-5 after:border-r-transparent after:border-l-transparent after:border-b-10 after:border-b-white `}
    >
      <div className='text-center w-full'>
        <h2 className='sub-title'>My Cart</h2>
        <p className='text-secondary-custom text-xs mt-2'>
          {cartItems == null || cartItems == undefined ? (
            <span>No cart Items</span>
          ) : (
            <span>{cartItems.length} item in cart</span>
          )}
        </p>
        <div className='w-full mt-2 flex justify-center'>
          <Button
            text='View or Edit Your Cart'
            variant='outline'
            color='default'
          />
        </div>
      </div>

      <div className='mt-5'>
        {cartItems === null || cartItems === undefined ? (
          <span>No Cart items, please add products to your cart</span>
        ) : (
          cartItems.map(
            (cartItem) =>
              cartItem.product && (
                <CartInfoItem
                  product={cartItem.product}
                  quantity={cartItem.cart.quantity}
                  key={cartItem.cart.id}
                />
              )
          )
        )}
      </div>

      <div className='text-center mt-5'>
        <span className='text-sm font-semibold text-secondary-custom'>
          Sub Total:{' '}
          <span className='text-lg text-black'>
            Rs. {subTotal?.toLocaleString()}
          </span>
        </span>

        <div className='flex justify-center mt-5'>
          <Button text='Go to Checkout' variant='primary' color='default' />
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
