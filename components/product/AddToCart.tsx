'use client';

import React, { useState } from 'react';

import { Input } from '../ui/input';
import Button from '../shared/Button';
import { addToCart } from '@/lib/actions/cart';
import { toast } from 'sonner';

type Props = {
  productId: string;
};

const AddToCart = ({ productId }: Props) => {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addToCart({ productId, quantity });

    if (result.error) {
      toast.error(result.error);
    }

    setQuantity(1);
    if (result.message === 'add') {
      toast.success('Item Added to cart successfully');
    } else {
      toast.success(
        'Item already in the cart but successfully increased the quantity'
      );
    }
  };

  return (
    <form className='flex gap-3' onSubmit={handleSubmit}>
      <Input
        type='number'
        value={quantity}
        className='w-[70px] h-[50px]'
        onChange={(e) => {
          setQuantity(parseInt(e.target.value));
        }}
      />
      <Button text='Add to cart' variant='primary' color='default' />
    </form>
  );
};

export default AddToCart;
