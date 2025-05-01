import { auth } from '@/auth';
import CheckoutForm from '@/components/forms/CheckoutForm';
import React from 'react';

const page = async () => {
  const session = await auth();
  return (
    <div>
      <CheckoutForm session={session} />
    </div>
  );
};

export default page;
