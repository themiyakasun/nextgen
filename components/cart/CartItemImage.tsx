import config from '@/config';
import { getProductImages } from '@/lib/actions/products';
import { IKImage } from 'imagekitio-next';
import React, { useEffect, useState } from 'react';

type Props = {
  productId: string;
};

const CartItemImage = ({ productId }: Props) => {
  const [images, setImages] = useState<ProductImage[] | null | undefined>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await getProductImages(productId);

      setImages(result);
    };

    fetchImages();
  }, [productId]);

  return (
    <>
      {images?.map((image) => {
        if (image.isPrimary) {
          return (
            <IKImage
              key={image.id}
              urlEndpoint={config.env.imageKit.urlEndpoint}
              path={image.image}
              alt={image.id}
              loading='lazy'
              width={120}
              height={120}
              className='md:w-[120px] md:h-[120px] w-[68px] h-[68px] object-cover rounded'
            />
          );
        }
      })}
    </>
  );
};

export default CartItemImage;
