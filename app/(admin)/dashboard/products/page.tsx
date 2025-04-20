import React from 'react';
import Image from 'next/image';

import MainContent from '@/components/admin/MainContent';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';

import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import StatusButton from '@/components/shared/StatusButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Page = () => {
  return (
    <MainContent>
      <div className='bg-white md:border-2 border border-neutral-custom-100 rounded-3xl w-full p-4 md:p-6 flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <div className='hidden md:flex items-center justify-center w-full md:mt-0 mt-2'>
            <Input
              type='search'
              placeholder={'Search...'}
              className='flex-1 bg-transparent rounded-[25px] h-10 border-2 border-black outline-none !focus:border-none !focus-visible:border-none !focus-visible:ring-0 shadow-none'
            />
          </div>
          <div className='flex items-center gap-2 justify-between'>
            <Button
              variant='outline'
              color='default'
              text='Filter'
              rightIcon={<FilterListIcon />}
            />
            <Button
              variant='outline'
              color='default'
              text='Export'
              rightIcon={<FileDownloadOutlinedIcon />}
            />
            <Button
              variant='primary'
              color='white'
              text='New Product'
              link='/dashboard/products/add-product'
              customStyle='ml-2'
              rightIcon={<AddOutlinedIcon />}
            />
          </div>
        </div>

        <table className='product-table'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Brand</th>
              <th>QTY</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='flex items-center gap-2'>
                  <Image
                    src='/images/temp.png'
                    alt='image'
                    width={42}
                    height={42}
                    className='rounded-[6px]'
                  />
                  <div>
                    <span className='text-blue-500 text-xs'>132389</span>
                    <p className='text-sm'>product name</p>
                  </div>
                </div>
              </td>

              <td data-cell='price'>Rs. 50, 0000</td>
              <td data-cell='brand'>MSI</td>
              <td data-cell='QTY'>20</td>
              <td data-cell='date'>04/17/23 at 8:25 PM</td>
              <td data-cell='status'>
                <StatusButton active={true} text='Active' />
              </td>
              <td data-cell='action'>
                <div className='flex items-center gap-2'>
                  <button>
                    <VisibilityOutlinedIcon />
                  </button>
                  <button>
                    <EditNoteOutlinedIcon />
                  </button>
                  <button>
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainContent>
  );
};
export default Page;
