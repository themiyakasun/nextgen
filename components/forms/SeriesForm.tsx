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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { seriesSchema } from '@/lib/validation';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/actions/category';
import { getBrands } from '@/lib/actions/brand';
import { addSeries } from '@/lib/actions/series';

interface Props {
  type: 'create' | 'edit';
}

const SeriesForm = ({ type }: Props) => {
  const form = useForm<z.infer<typeof seriesSchema>>({
    resolver: zodResolver(seriesSchema),
    defaultValues: {
      seriesName: '',
      categoryId: '',
      brandId: '',
    },
  });
  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null | undefined>(
    null
  );
  const [brands, setBrands] = useState<Brand[] | null | undefined>(null);

  const isCreate = type === 'create';

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();

      if (result?.success) {
        setCategories(result.data);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      const result = await getBrands();

      if (result?.success) {
        setBrands(result.data);
      }
    };

    fetchBrands();
  }, []);

  const onSubmit = async (values: z.infer<typeof seriesSchema>) => {
    const result = await addSeries(values);

    if (result.error) {
      toast.error(result.error);
    }

    toast.success('Series added successfully');
  };

  return (
    <div className='bg-white md:p-10 p-5 rounded-3xl mt-5'>
      <h2 className='sub-title'>Series Information</h2>
      <p className='md:text-sm text-xs font-light py-5 text-neutral-custom-300'>
        Please provide your Series information
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 w-full'
        >
          <FormField
            control={form.control}
            name={'seriesName'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Series Name
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder={'Series Name'}
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
            name={'categoryId'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Category
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className='w-full border-secondary-custom'>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories !== null &&
                        categories?.map((category) => (
                          <SelectItem
                            value={category.id}
                            key={category.id}
                            className='capitalize'
                          >
                            {category.category}
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
            name={'brandId'}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                  Brand
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className='w-full border-secondary-custom'>
                      <SelectValue placeholder='Select a Brand' />
                    </SelectTrigger>
                    <SelectContent>
                      {brands !== null &&
                        brands?.map((brand) => (
                          <SelectItem
                            value={brand.id}
                            key={brand.id}
                            className='capitalize'
                          >
                            {brand.brand}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
                text={isCreate ? 'Add Series' : 'Edit Series'}
                color={'default'}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SeriesForm;
