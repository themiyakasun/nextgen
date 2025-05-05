import { auth } from '@/auth';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm from '@/components/forms/CheckoutForm';
import React from 'react';

const page = async () => {
  const session = await auth();
  return (
    <div>
      <CheckoutForm session={session} />
      <OrderSummary />
    </div>
  );
};

export default page;
