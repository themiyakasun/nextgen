'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { branchSchema } from '@/lib/validation';

interface Props {
  type: 'create' | 'edit';
}

const BrandForm = ({ type }: Props) => {
  const form = useForm<z.infer<typeof branchSchema>>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      brand: '',
    },
  });
  const router = useRouter();

  const isCreate = type === 'create';

  const onSubmit = async (values: z.infer<typeof branchSchema>) => {
    console.log(values);
  };

  return (
    <div className='bg-white md:p-10 p-5 rounded-3xl mt-5 md:mt-0'>
      <h2 className='sub-title'>Brand Information</h2>
      <p className='md:text-sm text-xs font-light py-5 text-neutral-custom-300'>
        Please provide your brand information
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 w-full'
        >
          <FormField
            control={form.control}
            name={'brand'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Brand
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'Brand'}
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
                text={isCreate ? 'Add Brand' : 'Edit Brand'}
                color={'default'}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default BrandForm;
