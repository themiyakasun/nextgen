import React from 'react';

import NewProducts from '@/components/product/NewProducts';
import ProductsByCategory from '@/components/product/ProductsByCategory';

const Home = () => {
  return (
    <div>
      <NewProducts />
      <ProductsByCategory />
    </div>
  );
};
export default Home;
