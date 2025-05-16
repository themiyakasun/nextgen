import { auth } from '@/auth';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm from '@/components/forms/CheckoutForm';
import React from 'react';

const page = async () => {
  const session = await auth();
  return (
    <>
      <h2 className='main-title my-5'>Checkout</h2>
      <div className='md:flex gap-4'>
        <div className='w-3/4'>
          <CheckoutForm session={session} />
        </div>

        <div className='w-1/4'>
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default page;
