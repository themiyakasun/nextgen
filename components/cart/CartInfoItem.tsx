'use client';

import { IKImage } from 'imagekitio-next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import config from '@/config';
import { getProductImages } from '@/lib/actions/products';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { handleRemoveCartItem } from '@/services/cart';

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    discount: number | null;
  };
  quantity: number;
  cartId: string;
};

const CartInfoItem = ({ product, quantity, cartId }: Props) => {
  const [productImages, setProductImages] = useState<
    ProductImage[] | null | undefined
  >(null);

  useEffect(() => {
    const fetchProductImages = async () => {
      const result = await getProductImages(product.id);
      setProductImages(result);
    };

    fetchProductImages();
  }, [product.id]);

  return (
    <Link
      href={`/products/${product.id}`}
      className='flex items-center first:border-t-2 border-b-2 border-secondary-custom/70 px-7'
    >
      <span className='flex-1 max-w-[40px]'>{quantity} x</span>

      {product !== null &&
        productImages !== null &&
        productImages !== undefined && (
          <>
            <IKImage
              urlEndpoint={config.env.imageKit.urlEndpoint}
              path={productImages[0].image}
              alt={product.name}
              width={65}
              height={65}
              className='flex-1'
            />

            <span className='text-xs max-w-[120px] ml-2'>{product.name}</span>

            <div className='flex flex-col justify-center gap-2'>
              <button
                className='border-2 border-secondary-custom text-secondary-custom rounded-full text-sm w-5 h-5 flex items-center justify-center'
                onClick={() => handleRemoveCartItem(cartId)}
              >
                <CloseOutlinedIcon fontSize='inherit' />
              </button>
              <button className='border-2 border-secondary-custom text-secondary-custom rounded-full text-sm w-5 h-5 flex items-center justify-center'>
                <EditOutlinedIcon fontSize='inherit' />
              </button>
            </div>
          </>
        )}
    </Link>
  );
};

export default CartInfoItem;
