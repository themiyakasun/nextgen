import { auth } from '@/auth';
import CartDetails from '@/components/cart/CartDetails';
import React from 'react';

const page = async () => {
  const session = await auth();

  return (
    <div>
      <CartDetails session={session} />
    </div>
  );
};

export default page;
