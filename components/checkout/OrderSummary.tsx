'use client';

import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCartStore } from '@/providers/CartStoreProvider';
import OrderSummaryItem from './OrderSummaryItem';

const OrderSummary = () => {
  const { cartItems, quantities, subTotals } = useCartStore((state) => state);
  return (
    <div className='bg-accent-1 md:p-10 p-5 md:mt-0 mt-5 space-y-4'>
      <h2 className='main-title'>Order Summary</h2>
      <div className='border-b-2 w-full border-secondary-custom/20'></div>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='sub-title'>
            {cartItems.length}{' '}
            {cartItems.length > 1 ? '${}items in cart' : 'item in cart'}
          </AccordionTrigger>
          <AccordionContent className='bg-transparent'>
            {cartItems.map((item) => (
              <OrderSummaryItem
                key={item.cart.id}
                productId={item.product?.id as string}
                productName={item.product?.name as string}
                quantity={quantities[item.cart.id]}
                subTotal={subTotals[item.cart.id]}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OrderSummary;
