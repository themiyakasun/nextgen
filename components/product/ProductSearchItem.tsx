import config from '@/config';
import { IKImage } from 'imagekitio-next';
import Link from 'next/link';
import React from 'react';

type Props = {
  product: ProductDetails;
};

const ProductSearchItem = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className='flex items-center first:border-t-2 border-b-2 border-secondary-custom/70 px-7 py-2'
    >
      {product !== null &&
        product.images !== null &&
        product.images !== undefined && (
          <>
            <IKImage
              urlEndpoint={config.env.imageKit.urlEndpoint}
              path={product.images[0].image}
              alt={product.name}
              width={40}
              height={40}
              className=' object-cover'
            />

            <div className='flex flex-col items-start ml-2'>
              <span className='text-xs'>{product.name}</span>
              <span>Rs. {product.price.toLocaleString()}</span>
            </div>
          </>
        )}
    </Link>
  );
};

export default ProductSearchItem;
