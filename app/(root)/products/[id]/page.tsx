'ise client';
import ProductDetails from '@/components/product/ProductDetails';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default page;
