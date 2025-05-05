'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { addressSchema } from '@/lib/validation';
import { Session } from 'next-auth';
import { createCheckoutSession } from '@/lib/actions/checkout';
import { useCartStore } from '@/providers/CartStoreProvider';
import { countriesAndRegions } from '@/constants';
import { useEffect, useState } from 'react';
import { getUserShippingAddreses } from '@/lib/actions/address';

interface Props {
  session: Session | null;
}

const CheckoutForm = ({ session }: Props) => {
  const { cartItems } = useCartStore((state) => state);
  const [addressList, setAddressList] = useState<
    Omit<Address, 'firstName' | 'lastName' | 'phoneNumber'>[] | null | undefined
  >(null);

  useEffect(() => {
    const fetchAddress = async () => {
      const result = await getUserShippingAddreses(session?.user?.id as string);
      setAddressList(result);
    };
    fetchAddress();
  }, [session?.user?.id]);

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      street: '',
      country: '',
      city: '',
      state: '',
      postalCode: '',
      phoneNumber: '',
    },
  });

  const selectedCountry = form.watch('country');
  const selectedCountryData = countriesAndRegions.find(
    (c) => c.name === selectedCountry
  );

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    const checkoutUrl = await createCheckoutSession(cartItems, session, values);

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <div className='bg-white md:p-10 p-5 rounded-3xl mt-5'>
      <h2 className='sub-title mb-4'>Shipping Address</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 w-full'
        >
          <FormField
            control={form.control}
            name={'firstName'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Firstname
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'Firstname'}
                    type='text'
                    {...field}
                    className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'lastName'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Lastname
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'Lastname'}
                    type='text'
                    {...field}
                    className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'street'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'Street Address'}
                    type='text'
                    {...field}
                    className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'country'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Country
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(val) => form.setValue('country', val)}
                  >
                    <SelectTrigger className='w-full border-secondary-custom'>
                      <SelectValue placeholder='Select a country' />
                    </SelectTrigger>
                    <SelectContent>
                      {countriesAndRegions.map((c) => (
                        <SelectItem
                          key={c.name}
                          value={c.name}
                          className='text-sm'
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'state'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  State/Province
                </FormLabel>
                <FormControl>
                  <Select onValueChange={(val) => form.setValue('state', val)}>
                    <SelectTrigger className='w-full border-secondary-custom'>
                      <SelectValue placeholder='Select a State' />
                    </SelectTrigger>
                    <SelectContent>
                      {(selectedCountryData?.states || []).map((state) => (
                        <SelectItem
                          key={state}
                          value={state}
                          className='text-sm'
                        >
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'city'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'City'}
                    type='text'
                    {...field}
                    className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'postalCode'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Zip/Postal Code
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'Zip/Postal Code'}
                    type='text'
                    {...field}
                    className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'phoneNumber'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'Phone Number'}
                    type='text'
                    {...field}
                    className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex items-center gap-5'>
            <div>
              <Button
                type='submit'
                variant={'primary'}
                text='Place the Order'
                color={'default'}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default CheckoutForm;
