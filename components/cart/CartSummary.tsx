'use client';

import React, { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Button from '../shared/Button';
import { useCartStore } from '@/providers/CartStoreProvider';
import { cartTotal } from '@/services/cart';
import { validateCouponCode } from '@/lib/actions/cart';

const CartSummary = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const { cartItems, quantities, setOrderTotal } = useCartStore(
    (state) => state
  );
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const total = cartTotal(cartItems, quantities);
  const [newTotal, setNewTotal] = useState(total);

  useEffect(() => {
    if (total !== undefined) {
      setNewTotal(total);
    }
  }, [total]);

  const shipping = 200;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await validateCouponCode(code, session?.user?.id as string);

    if (total == undefined) return;

    if (result.success) {
      if (!result.discount) return;

      const resultTotal = total - (total * result.discount) / 100;
      setDiscount(result.discount);
      setNewTotal(resultTotal);
      toast.success(`${code} added successfully`);
    } else {
      setCode('');
      toast.error(result.error as string);
    }
  };

  const proceedToCheckout = async () => {
    if (newTotal !== undefined) setOrderTotal(newTotal);
    router.push('/checkout');
  };

  return (
    <div className='bg-accent-1 md:p-10 p-5 md:mt-0 mt-5 space-y-4 w-full'>
      <h2 className='main-title'>Summary</h2>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger className='sub-title'>
            Apply Discount Code
          </AccordionTrigger>
          <AccordionContent className='bg-transparent'>
            <form className='space-y-2 w-full' onSubmit={handleSubmit}>
              <Label>Enter the discount code</Label>
              <Input
                className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                type='submit'
                text='Apply Discount'
                variant='outline'
                color='default'
                customStyle='mt-4 w-full'
              />
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className='border-b-2 w-full border-secondary-custom/20'></div>

      <div className='space-y-4'>
        <div className='flex justify-between items-center md:text-[13px] text-[11px] font-semibold'>
          <span>Subtotal</span>
          <span>Rs. {total?.toLocaleString()}</span>
        </div>
        <div className='flex justify-between items-center md:text-[13px] text-[11px] font-semibold'>
          <span>Shipping</span>
          <span>Rs. {shipping.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className='flex justify-between items-center md:text-[13px] text-[11px] font-semibold'>
            <span>Shipping</span>
            <span>{discount} %</span>
          </div>
        )}
        {newTotal !== undefined && (
          <div className='flex justify-between items-center md:text-[13px] text-[11px] font-semibold'>
            <span>Order Total</span>
            <span className='md:text-lg text-base'>
              Rs. {(newTotal + shipping).toLocaleString()}
            </span>
          </div>
        )}

        <div className='w-full mt-4'>
          <Button
            text='Proceed to Checkout'
            variant='primary'
            color='default'
            customStyle='w-full py-3'
            onClick={proceedToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
