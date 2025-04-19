import React from 'react';

import MainContent from '@/components/admin/MainContent';
import ProductForm from '@/components/forms/ProductForm';

const page = () => {
  return (
    <MainContent>
      <ProductForm type='create' />
    </MainContent>
  );
};

export default page;
