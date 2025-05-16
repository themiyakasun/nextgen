'use client';

import config from '@/config';
import { getCategories } from '@/lib/actions/category';
import { IKImage } from 'imagekitio-next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const ProductsByCategory = () => {
  const [categories, setCategories] = useState<Category[] | undefined | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      if (result?.data) {
        setCategories(result?.data);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className='mt-10'>
      {categories?.map((category) => (
        <div key={category.id} className='md:flex'>
          <div className='md:w-1/5 w-full md:h-[350px] h-20 mb-5 relative flex items-center justify-center'>
            <div className='absolute top-0 left-0 bottom-0 right-0'>
              <IKImage
                urlEndpoint={config.env.imageKit.urlEndpoint}
                alt={category.category}
                path={category.image}
                fill
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10' />
            </div>
            <div className='z-20 text-center'>
              <h2 className='main-title text-white z-20 capitalize'>
                {category.category}
              </h2>
              <Link
                href={`category/${category.id}`}
                className='text-white text-xs underline'
              >
                See all products
              </Link>
            </div>
          </div>
          <div>
            <ProductList categoryId={category.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsByCategory;
