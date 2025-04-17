import React from 'react';
import MainContent from '@/components/admin/MainContent';
import CatForm from '@/components/forms/CatForm';
import BrandForm from '@/components/forms/BrandForm';
import SeriesForm from '@/components/forms/SeriesForm';

const Page = () => {
  return (
    <MainContent>
      <CatForm type='create' />
      <BrandForm type='create' />
      <SeriesForm type='create' />
    </MainContent>
  );
};
export default Page;
