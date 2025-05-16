'use client';
import React, { useEffect, useState } from 'react';

import ProductCard from '@/components/shared/ProductCard';
import { getProducts } from '@/lib/actions/products';
import Loader from '@/components/shared/Loader';

const NewProducts = () => {
  const [products, setProducts] = useState<ProductDetails[] | null | undefined>(
    null
  );
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoader(true);
      const result = (await getProducts({
        page: 1,
        pageSize: 6,
      })) as ProductDetails[];

      if (result) {
        setProducts(result);
        setLoader(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {loader && <Loader />}
      <h2 className='main-title mb-5'>New Products</h2>
      <div className='flex items-start flex-wrap'>
        {products?.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </>
  );
};

export default NewProducts;
