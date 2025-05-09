'use client';

import React, { useEffect, useState } from 'react';
import Loader from '../shared/Loader';
import ProductCard from '../shared/ProductCard';
import { getProductsByCategory } from '@/lib/actions/products';

type Props = {
  categoryId: string;
};

const ProductList = ({ categoryId }: Props) => {
  const [products, setProducts] = useState<ProductDetails[] | null | undefined>(
    null
  );
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoader(true);
      const result = (await getProductsByCategory({
        categoryId,
        page: 1,
        pageSize: 5,
      })) as ProductDetails[];

      if (result) {
        setProducts(result);
        setLoader(false);
      }
    };
    fetchProducts();
  }, [categoryId]);
  return (
    <>
      {loader && <Loader />}
      <div className='flex items-start flex-wrap mb-10'>
        {products?.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
