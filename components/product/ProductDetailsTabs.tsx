import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
};

const ProductDetailsTabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className='flex items-center gap-5'>
      <button
        className={`md:text-sm text-xs font-semibold ${activeTab === 'about-product' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('about-product')}
      >
        About Product
      </button>
      <button
        className={`md:text-sm text-xs font-semibold ${activeTab === 'specs' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab('specs')}
      >
        Specs
      </button>
    </div>
  );
};

export default ProductDetailsTabs;
