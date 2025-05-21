'use client';

import { getAllProducts } from '@/lib/actions/products';
import { useCartStore } from '@/providers/CartStoreProvider';

import React, { useEffect, useState } from 'react';
import ProductSearchItem from '../product/ProductSearchItem';

type Props = {
  search: string;
};

const SearchProducts = ({ search }: Props) => {
  const [ProductDetails, setProductDetails] = useState<
    ProductDetails[] | null | undefined
  >(null);
  const { setLoading } = useCartStore((state) => state);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = (await getAllProducts()) as ProductDetails[];

      if (result) {
        setProductDetails(result);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setLoading]);

  return (
    <div
      className={`${search !== '' ? 'block' : 'hidden'} absolute bg-white top-12 right-0 py-7 shadow-2xl z-20 w-[310px] `}
    >
      <div className='text-center w-full'>
        {ProductDetails?.filter((item) => {
          return search.toLowerCase() === ''
            ? item
            : item.name.toLowerCase().includes(search);
        }).map((product) => (
          <ProductSearchItem product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
