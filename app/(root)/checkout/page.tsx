import { auth } from '@/auth';
import ShippingAddressForm from '@/components/forms/ShippingAddressForm';
import React from 'react';

const page = async () => {
  const session = await auth();
  return (
    <div>
      <ShippingAddressForm session={session} />
    </div>
  );
};

export default page;
