import React from 'react';
import MainContent from '@/components/admin/MainContent';
import CatForm from '@/components/forms/CatForm';
import BrandForm from '@/components/forms/BrandForm';
import SeriesForm from '@/components/forms/SeriesForm';

const Page = () => {
  return (
    <MainContent>
      <div className='flex flex-col md:flex-row md:justify-between md:items-start w-full md:gap-10'>
        <CatForm type='create' />
        <div className='md:w-1/2'>
          <BrandForm type='create' />
          <SeriesForm type='create' />
        </div>
      </div>
    </MainContent>
  );
};
export default Page;
