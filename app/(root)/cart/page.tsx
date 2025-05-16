import { auth } from '@/auth';
import CartDetails from '@/components/cart/CartDetails';
import CartSummary from '@/components/cart/CartSummary';
import React from 'react';

const page = async () => {
  const session = await auth();

  return (
    <>
      <h2 className='main-title my-5'>Shopping Cart</h2>
      <div className='md:flex gap-4'>
        <div className='w-3/4'>
          <CartDetails session={session} />
        </div>
        <div className='w-1/4'>
          <CartSummary session={session} />
        </div>
      </div>
    </>
  );
};

export default page;
