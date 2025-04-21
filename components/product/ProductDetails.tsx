'use client';

import React, { useEffect, useState } from 'react';

import { getProductById } from '@/lib/actions/products';
import Loader from '@/components/shared/Loader';
import ProductImageSlider from './ProductImageSlider';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ProductDetailsTabs from './ProductDetailsTabs';
import AboutProduct from './AboutProduct';
import ProductSpecs from './ProductSpecs';
import AddToCart from './AddToCart';

type Props = {
  id: string;
};

const ProductDetails = ({ id }: Props) => {
  const [product, setProduct] = useState<ProductDetails | null | undefined>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('about-product');

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const result = (await getProductById(id)) as ProductDetails;

      if (result) {
        setProduct(result);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      {loading && <Loader />}
      {product !== null && product !== undefined && (
        <div>
          <div className='md:flex items-center justify-between hidden w-full'>
            <ProductDetailsTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <AddToCart />
          </div>
          <div className='flex md:flex-row flex-col-reverse md:items-center w-full md:bg-[#F5F7FF] md:mt-10'>
            <div className='md:w-1/2 w-full h-full md:p-10 '>
              <div className='md:hidden mb-5'>
                <ProductDetailsTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              {activeTab === 'about-product' ? (
                <AboutProduct
                  name={product.name}
                  description={product.description}
                />
              ) : activeTab === 'specs' ? (
                <div className='flex justify-center'>
                  <ProductSpecs specs={product.specs} />
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className='md:w-1/2 relative bg-white'>
              <div className='flex flex-col gap-3 w-max absolute top-5 md:left-25 left-2'>
                <button className='text-secondary-custom border-2 border-secondary-custom rounded-full p-1'>
                  <FavoriteBorderOutlinedIcon />
                </button>
                <button className='text-secondary-custom border-2 border-secondary-custom rounded-full p-1'>
                  <EqualizerOutlinedIcon />
                </button>
                <button className='text-secondary-custom border-2 border-secondary-custom rounded-full p-1'>
                  <EmailOutlinedIcon />
                </button>
              </div>
              <ProductImageSlider images={product.images} />
            </div>
          </div>
          <div className='md:hidden mt-5 flex items-center justify-center w-full'>
            <AddToCart />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
