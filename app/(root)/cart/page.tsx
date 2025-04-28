import { auth } from '@/auth';
import CartDetails from '@/components/cart/CartDetails';
import CartSummary from '@/components/cart/CartSummary';
import React from 'react';

const page = async () => {
  const session = await auth();

  return (
    <div>
      <CartDetails session={session} />
      <CartSummary />
    </div>
  );
};

export default page;
