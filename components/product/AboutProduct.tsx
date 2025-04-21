import Link from 'next/link';
import React from 'react';

type Props = {
  name: string;
  description: string;
};

const AboutProduct = ({ name, description }: Props) => {
  return (
    <div className='flex flex-col md:gap-[25px] gap-[15px] w-full'>
      <div className='flex flex-col gap-3'>
        <h1 className='main-title'>{name}</h1>
      </div>
      <p className='md:text-lg text-sm'>{description}</p>

      <div className='flex gap-2 items-center text-xs font-semibold'>
        Have a question?{' '}
        <Link href='/contact-us' className='text-blue-500'>
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default AboutProduct;
