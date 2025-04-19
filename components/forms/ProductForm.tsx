'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { productSchema } from '@/lib/validation';
import ProductImageUpload from '../ProductImageUpload';

import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/actions/category';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getBrands } from '@/lib/actions/brand';
import { getSeries } from '@/lib/actions/series';
import { addProduct } from '@/lib/actions/products';

interface Props {
  type: 'create' | 'edit';
}

const ProductForm = ({ type }: Props) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[] | null | undefined>(
    null
  );
  const [brands, setBrands] = useState<Brand[] | null | undefined>(null);
  const [series, setSeries] = useState<Series[] | null | undefined>(null);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: '',
      name: '',
      description: '',
      modelNumber: '',
      price: 0.0,
      discount: 0.0,
      stockQuantity: 0,
      warrantyPeriod: '',
      isActive: true,
      categoryId: '',
      brandId: '',
      seriesId: null,
      images: [],
      specs: [
        {
          name: '',
          value: '',
        },
      ],
    },
  });

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

  useEffect(() => {
    const fetchSeries = async () => {
      const result = await getSeries();

      if (result?.success) {
        setSeries(result.data);
      }
    };

    fetchSeries();
  }, []);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'specs',
  });

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const result = await addProduct(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          console.log('Form submit triggered');
          form.handleSubmit(onSubmit)(e);
        }}
        className='space-y-6 w-full'
      >
        <div className='flex flex-col md:flex-row md:justify-between md:items-start'>
          <div className='bg-white md:p-10 p-5 rounded-3xl flex flex-col'>
            <h2 className='sub-title'>Product Information</h2>
            <p className='md:text-sm text-xs font-light py-5 text-neutral-custom-300'>
              Please provide your product information
            </p>

            <div className='space-y-6'>
              <FormField
                control={form.control}
                name={'sku'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                      SKU
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder={'SKU'}
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
                name={'name'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                      Product Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder={'Product Name'}
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
                name={'description'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                      Product Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        required
                        placeholder={'Product Description'}
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
                name={'modelNumber'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                      Model Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        placeholder={'Model Number'}
                        type='text'
                        {...field}
                        className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-5'>
                <FormField
                  control={form.control}
                  name={'price'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder={'Price'}
                          type='number'
                          min='0'
                          step='0.01'
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
                  name={'discount'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                        Discount
                      </FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder={'Discount'}
                          type='number'
                          {...field}
                          className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex gap-5'>
                <FormField
                  control={form.control}
                  name={'stockQuantity'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                        Stock Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder={'Stock Quantity'}
                          type='number'
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
                  name={'warrantyPeriod'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                        Warranty Period
                      </FormLabel>
                      <FormControl>
                        <Input
                          required
                          placeholder={'Warranty Period'}
                          type='text'
                          {...field}
                          className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                        <SelectContent className='w-full'>
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
                        <SelectContent className='w-full'>
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
              <FormField
                control={form.control}
                name={'seriesId'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                      Series
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className='w-full border-secondary-custom'>
                          <SelectValue placeholder='Select a Series' />
                        </SelectTrigger>
                        <SelectContent>
                          {series !== null &&
                            series?.map((series) => (
                              <SelectItem
                                value={series.id}
                                key={series.id}
                                className='capitalize'
                              >
                                {series.seriesName}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='bg-white md:p-10 p-5 rounded-3xl mt-5 md:mt-0 space-y-4'>
            <div className='space-y-4'>
              <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                Specifications
              </FormLabel>

              {fields.map((field, index) => (
                <div key={field.id} className='flex gap-3 items-center'>
                  <FormField
                    control={form.control}
                    name={`specs.${index}.name`}
                    render={({ field }) => (
                      <FormItem className='w-1/2'>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Name'
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
                    name={`specs.${index}.value`}
                    render={({ field }) => (
                      <FormItem className='w-1/2'>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Value'
                            {...field}
                            className='!md:h-[50px] !h-10 md:text-sm text-sm rounded-[5px] border-secondary-custom'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className='bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center p-2'
                  >
                    <CloseIcon className='text-xs' />
                  </button>
                </div>
              ))}

              <button
                type='button'
                onClick={() => append({ name: '', value: '' })}
                className='text-blue-500 text-sm'
              >
                + Add Specification
              </button>
            </div>

            <FormField
              control={form.control}
              name={'images'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='md:text-[13px] text-[11px] font-semibold'>
                    Images
                  </FormLabel>
                  <p className='text-xs font-bold mb-2'>
                    <span className='text-blue-500 mr-2'>Note:</span>
                    First image is the primary product image
                  </p>
                  <FormControl>
                    <ProductImageUpload
                      onFileChange={field.onChange}
                      value={field.value}
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
                  text={isCreate ? 'Add Product' : 'Edit Product'}
                  color={'default'}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default ProductForm;
