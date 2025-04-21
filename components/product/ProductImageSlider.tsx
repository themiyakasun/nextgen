import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { IKImage } from 'imagekitio-next';
import config from '@/config';

type Props = {
  images: {
    id: string;
    productId: string;
    isPrimary: boolean | null;
    image: string;
  }[];
};

const ProductImageSlider = ({ images }: Props) => {
  return (
    <div className='flex justify-center md:px-40 md:py-10'>
      <Carousel className='w-full'>
        <CarouselContent>
          {images.map((images) => (
            <CarouselItem key={images.id}>
              <IKImage
                urlEndpoint={config.env.imageKit.urlEndpoint}
                path={images.image}
                alt={images.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProductImageSlider;
