"use client"

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

import Button from "@/components/shared/Button";
import {Input} from '@/components/ui/input'
import {menuItems} from "@/constants";

const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    const breakPoint = 768;

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }


    return (
        <div className='navbar-container'>
                <div className='flex items-center gap-2'>
                    <button onClick={toggleMenu}>
                        <MenuIcon className='text-white w-[26px] h-5 block md:hidden'/>
                    </button>
                    <div>
                        {windowWidth < breakPoint ? (
                            <Image src='/images/Logo-white.png' className='logo' width={57} height={47} alt={'Logo'} />
                        ):(
                            <Image src='/images/Logo.png' className='logo' width={85} height={69} alt={'Logo'} />
                        )}
                    </div>
                    <div className='md:static absolute top-27 right-0 left-0 md:shadow-none md:bg-transparent'>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-5 md:flex-row md:shadow-none  ${showMenu ? 'max-h-[500px] p-5 bg-white shadow-2xl' : 'max-h-0 p-0 md:max-h-[500px]'} `}>
                        {menuItems.map((item, i) => (
                            <Link href={item.link} key={i} className='text-sm font-semibold'>{item.name}</Link>
                        ))}
                    </div>
                </div>
                </div>

                <div className='md:mx-10'>
                    <Button variant={'outline'} color={'white'} text={'Our Deals'} link='/our-deals'/>
                </div>

                <div className='flex items-center gap-5'>
                    <div className='hidden md:flex items-center justify-center w-full md:mt-0 mt-2'>
                        <Input type='search' placeholder={'Search...'} className='flex-1 bg-transparent rounded-[25px] h-10 border-2 border-black outline-none !focus:border-none !focus-visible:border-none !focus-visible:ring-0 shadow-none'/>
                    </div>
                    <button className='md:block hidden'>
                        <SearchIcon className='text-black hidden md:block'/>
                    </button>
                    <button className='relative'>
                        <div className='md:bg-primary-custom bg-white w-[17px] h-[17px] rounded-full flex items-center justify-center font-bold text-[10px] md:text-white text-primary-custom absolute -top-2 -right-2'>2</div>
                        <ShoppingCartOutlinedIcon className='md:text-black  text-white scale-x-[-1]' />
                    </button>

                    <button className='w-[34px] h-[34px] flex items-center justify-center border-2 md:border-black border-white rounded-full'>
                        <PersonIcon className='md:text-black text-white' />
                    </button>
                </div>

                <div className='flex md:hidden items-center justify-center w-full md:mt-0 mt-2'>
                    <Input type='search' placeholder={'Search...'} className='flex-1 bg-white rounded-[25px] h-10 focus:border-none shadow-none'/>
                </div>

        </div>
    )
}
export default Navbar
