'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@/components/shared/Button';
import { Input } from '@/components/ui/input';
import MenuIcon from '@mui/icons-material/Menu';
import AccountInfo from '../dropdowns/AccountInfo';
import { IKImage } from 'imagekitio-next';
import config from '@/config';
import { useClickOutside } from '@/hooks/useClickOutside';
import MenuItems from '../MenuItems';

const Navbar = ({ session }: { session: Session | null }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showAccountInfo, setShowAccountInfo] = useState(false);

  const breakPoint = 768;

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleAccountInfo = () => {
    setShowAccountInfo(!showAccountInfo);
  };

  const onAccountInfoClickOutside = () => {
    setShowAccountInfo(false);
  };

  const accountInfoRef = useRef<HTMLDivElement>(null);
  useClickOutside(accountInfoRef, onAccountInfoClickOutside);

  return (
    <div className='navbar-container'>
      <div className='flex items-center gap-2'>
        <button onClick={toggleMenu}>
          <MenuIcon className='text-white w-[26px] h-5 block md:hidden' />
        </button>
        <div>
          {windowWidth < breakPoint ? (
            <Link href='/'>
              <Image
                src='/images/Logo-white.png'
                className='logo'
                width={57}
                height={47}
                alt={'Logo'}
              />
            </Link>
          ) : (
            <Link href='/'>
              <Image
                src='/images/Logo.png'
                className='logo'
                width={85}
                height={69}
                alt={'Logo'}
              />
            </Link>
          )}
        </div>

        <MenuItems showMenu={showMenu} />
      </div>

      <div className='md:mx-10'>
        <Button
          variant={'outline'}
          color={'white'}
          text={'Our Deals'}
          link='/our-deals'
        />
      </div>

      <div className='flex items-center gap-5'>
        <div className='hidden md:flex items-center justify-center w-full md:mt-0 mt-2'>
          <Input
            type='search'
            placeholder={'Search...'}
            className='flex-1 bg-transparent rounded-[25px] h-10 border-2 border-black outline-none !focus:border-none !focus-visible:border-none !focus-visible:ring-0 shadow-none'
          />
        </div>
        <button className='md:block hidden'>
          <SearchIcon className='text-black hidden md:block' />
        </button>
        <button className='relative'>
          <div className='md:bg-primary-custom bg-white w-[17px] h-[17px] rounded-full flex items-center justify-center font-bold text-[10px] md:text-white text-primary-custom absolute -top-2 -right-2 z-10'>
            2
          </div>
          <ShoppingCartOutlinedIcon className='md:text-black  text-white scale-x-[-1]' />
        </button>

        <div
          className='md:w-9 md:h-9 w-[34px] h-[34px] flex items-center justify-center border-2 md:border-black border-white rounded-full relative'
          ref={accountInfoRef}
        >
          {session?.user?.image ? (
            <button onClick={toggleAccountInfo}>
              <IKImage
                urlEndpoint={config.env.imageKit.urlEndpoint}
                alt='avatar'
                path={session?.user?.image}
                width={20}
                height={20}
              />
            </button>
          ) : (
            <button onClick={toggleAccountInfo}>
              <PersonIcon className='md:text-black text-white' />
            </button>
          )}

          <AccountInfo session={session} show={showAccountInfo} />
        </div>
      </div>

      <div className='flex md:hidden items-center justify-center w-full md:mt-0 mt-2'>
        <Input
          type='search'
          placeholder={'Search...'}
          className='flex-1 bg-white rounded-[25px] h-10 focus:border-none shadow-none'
        />
      </div>
    </div>
  );
};
export default Navbar;
