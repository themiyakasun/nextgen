'use client';

import config from '@/config';
import { getProductImages } from '@/lib/actions/products';
import { IKImage } from 'imagekitio-next';
import React, { useEffect, useState } from 'react';

type Props = {
  productId: string;
  productName: string;
  quantity: number;
  subTotal: number;
};

const OrderSummaryItem = ({
  productId,
  productName,
  quantity,
  subTotal,
}: Props) => {
  const [productImages, setProductImages] = useState<
    ProductImage[] | null | undefined
  >(null);

  useEffect(() => {
    const fetchProductImages = async () => {
      const result = await getProductImages(productId);
      setProductImages(result);
    };

    fetchProductImages();
  }, [productId]);

  return (
    <div className='flex items-center gap-5'>
      <div className='w-[62px] h-[62px]'>
        {productImages !== null &&
          productImages !== undefined &&
          productImages.map(
            (item) =>
              item.isPrimary && (
                <IKImage
                  key={item.id}
                  urlEndpoint={config.env.imageKit.urlEndpoint}
                  path={item.image as string}
                  alt={item.productId}
                  width={62}
                  height={62}
                />
              )
          )}
      </div>
      <div>
        <p className='text-sm'>{productName}</p>
        <p className='text-sm text-neutral-custom-500 font-semibold mt-2'>
          Qty {quantity} <span className='text-black ml-2'>Rs. {subTotal}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSummaryItem;
