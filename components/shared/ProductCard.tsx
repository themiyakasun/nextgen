import React from 'react';
import Link from 'next/link';
import { IKImage } from 'imagekitio-next';
import Rating from 'react-star-rating-component';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import config from '@/config';

type Props = {
  product: ProductDetails;
};

const ProductCard = ({ product }: Props) => {
  const { id, name, description, images, discount, price, stockQuantity } =
    product;

  const discountPrice = discount && (price * discount) / 100;

  return (
    <Link
      href={`/products/${id}`}
      className='bg-white flex flex-col justify-between px-[25px] md:w-[235px] w-[200px] py-4 md:h-[350px] h-[300px] rounded-xl shadow-sm'
    >
      {stockQuantity === 0 ? (
        <div className='flex items-center gap-2 text-red-400 text-[10px]'>
          <CancelRoundedIcon />
          <p>Out of Stock</p>
        </div>
      ) : (
        <div className='flex items-center gap-2 text-[10px] text-green-400'>
          <CheckCircleRoundedIcon />
          <p>In Stock</p>
        </div>
      )}

      <div className='w-full flex justify-center'>
        {images.map(
          (image) =>
            image.isPrimary && (
              <IKImage
                urlEndpoint={config.env.imageKit.urlEndpoint}
                path={image.image}
                alt={name}
                key={image.id}
                width={150}
                height={150}
              />
            )
        )}
      </div>
      <div className='flex-1'>
        <Rating
          name='ratings'
          value={4.7}
          starCount={5}
          starColor={'#ffb400'}
          emptyStarColor={'#ccc'}
        />
      </div>
      <div className='flex-1 w-full'>
        <p
          className='md:text-[13px] text-[11px] w-full line-clamp-3'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>
      </div>

      <div className='w-full mt-2 float-end'>
        {discountPrice !== 0 ? (
          <>
            <p className='md:text-sm text-xs text-secondary-custom line-through'>
              Rs.{price.toLocaleString()}
            </p>
            <p className='md:text-lg text-sm font-semibold'>
              Rs. {(price - discountPrice).toLocaleString()}
            </p>
          </>
        ) : (
          <p className='md:text-lg text-sm font-semibold'>
            Rs. {price.toLocaleString()}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
