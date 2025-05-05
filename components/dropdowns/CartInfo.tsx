'use client';

import React, { useEffect } from 'react';

import Button from '../shared/Button';
import CartInfoItem from '../cart/CartInfoItem';
import { cartTotal, fetchCartItems } from '@/services/cart';
import { useCartStore } from '@/providers/CartStoreProvider';

type Props = {
  show: boolean;
  userId?: string;
};

const CartInfo = ({ show, userId }: Props) => {
  const { cartItems, setLoading, quantities, setCartData } = useCartStore(
    (state) => state
  );

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      if (userId) {
        const { cartItemsInit, quantitiesInit, subTotalsInit } =
          await fetchCartItems(userId);

        if (cartItemsInit && quantitiesInit && subTotalsInit) {
          setCartData(cartItemsInit, quantitiesInit, subTotalsInit);
        }
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, setCartData, setLoading]);

  const total = cartTotal(cartItems, quantities);

  return (
    <div
      className={`${show ? 'block' : 'hidden'} absolute bg-white top-10 right-0 py-7 shadow-2xl z-20 w-[310px] after:absolute after:-top-2 after:right-2 after:w-0 after:h-0 after:border-l-5 after:border-r-5 after:border-r-transparent after:border-l-transparent after:border-b-10 after:border-b-white `}
    >
      <div className='text-center w-full'>
        <h2 className='sub-title'>My Cart</h2>
        <p className='text-secondary-custom text-xs mt-2'>
          {cartItems == null ||
          cartItems == undefined ||
          cartItems.length < 1 ? (
            <span>No cart Items</span>
          ) : (
            <span>{cartItems.length} item in cart</span>
          )}
        </p>

        {cartItems.length > 0 && (
          <div className='w-full mt-2 flex justify-center'>
            <Button
              text='View or Edit Your Cart'
              variant='outline'
              color='default'
              link='/cart'
            />
          </div>
        )}
      </div>

      <div className='mt-5'>
        {cartItems === null ||
        cartItems === undefined ||
        cartItems.length < 1 ? (
          <p className='px-3 text-center'>
            No Cart items, please add products to your cart
          </p>
        ) : (
          cartItems.map(
            (cartItem) =>
              cartItem.product && (
                <CartInfoItem
                  product={cartItem.product}
                  quantity={quantities[cartItem.cart.id]}
                  cartId={cartItem.cart.id}
                  key={cartItem.cart.id}
                />
              )
          )
        )}
      </div>

      {cartItems.length > 0 && (
        <div className='text-center mt-5'>
          <span className='text-sm font-semibold text-secondary-custom'>
            Sub Total:{' '}
            <span className='text-lg text-black'>
              Rs. {total?.toLocaleString()}
            </span>
          </span>

          <div className='flex justify-center mt-5'>
            <Button text='Go to Checkout' variant='primary' color='default' />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartInfo;
