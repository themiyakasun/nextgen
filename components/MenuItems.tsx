'use client';

import { menuItems } from '@/constants';
import { getCategories } from '@/lib/actions/category';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  showMenu: boolean;
};

const MenuItems = ({ showMenu }: Props) => {
  const [categories, setCategories] = useState<Category[] | null | undefined>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();

      setCategories(result?.data);
    };

    fetchCategories();
  }, []);

  return (
    <div className='md:static absolute top-27 right-0 left-0 md:shadow-none md:bg-transparent'>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-5 md:flex-row md:shadow-none  ${showMenu ? 'max-h-[500px] p-5 bg-white shadow-2xl' : 'max-h-0 p-0 md:max-h-[500px]'} `}
      >
        {categories !== null &&
          categories !== undefined &&
          categories.map((category, i) => (
            <Link
              href={category.id}
              key={i}
              className='text-sm font-semibold capitalize'
            >
              {category.category}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MenuItems;
