import React from 'react';
import { Input } from '../ui/input';
import Button from '../shared/Button';

type Props = {};

const AddToCart = (props: Props) => {
  return (
    <form className='flex gap-3'>
      <Input type='number' value={1} className='w-[70px] h-[50px]' />
      <Button text='Add to cart' variant='primary' color='default' />
    </form>
  );
};

export default AddToCart;
