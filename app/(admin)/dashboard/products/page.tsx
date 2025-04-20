'use client';

import React, { useEffect, useState } from 'react';
import { IKImage } from 'imagekitio-next';

import MainContent from '@/components/admin/MainContent';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import StatusButton from '@/components/shared/StatusButton';
import { getProducts, getTotalCountofProducts } from '@/lib/actions/products';
import config from '@/config';

import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Loader from '@/components/shared/Loader';

const Page = () => {
  const [productTotal, setProductTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsDetails, setProductDetails] = useState<
    ProductDetails[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await getTotalCountofProducts();
      setProductTotal(total[0].count);
    };
    fetchTotal();
  }, []);

  const pageSize = 10;
  const totalPages = Math.ceil(productTotal / pageSize);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = (await getProducts({
        page: currentPage,
        pageSize: pageSize,
      })) as ProductDetails[];

      if (result) {
        setProductDetails(result);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const incrementPages = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const decrementPages = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {loading && <Loader />}
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
                <th>Model Number</th>
                <th>QTY</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsDetails?.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className='flex items-center gap-2'>
                      {product.images.map((image) => (
                        <div key={image.id}>
                          {image.isPrimary && (
                            <IKImage
                              urlEndpoint={config.env.imageKit.urlEndpoint}
                              path={image.image}
                              alt={product.name}
                              width={42}
                              height={42}
                              className='rounded-[6px]'
                            />
                          )}
                        </div>
                      ))}
                      <div>
                        <span className='text-blue-500 text-xs'>
                          {product.sku}
                        </span>
                        <p className='text-sm'>{product.name}</p>
                      </div>
                    </div>
                  </td>

                  <td data-cell='price'>
                    Rs. {product.price.toLocaleString()}
                  </td>
                  <td data-cell='brand'>{product.brand.brand}</td>
                  <td data-cell='model number'>{product.modelNumber}</td>
                  <td data-cell='QTY'>{product.stockQuantity}</td>
                  <td data-cell='date'>
                    {new Date(String(product.createdAt)).toLocaleString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}
                  </td>
                  <td data-cell='status'>
                    {product.isActive ? (
                      <StatusButton active={true} text='Available' />
                    ) : (
                      <StatusButton active={false} text='Out of Stock' />
                    )}
                  </td>
                  <td data-cell='action'>
                    <div className='flex items-center gap-2'>
                      <button>
                        <VisibilityOutlinedIcon className='text-neutral-custom-500' />
                      </button>
                      <button>
                        <EditNoteOutlinedIcon className='text-neutral-custom-500' />
                      </button>
                      <button>
                        <DeleteOutlineOutlinedIcon className='text-neutral-custom-500' />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex justify-between items-center text-sm'>
            <div>
              <span className='text-blue-500'>{currentPage}</span> of{' '}
              {totalPages}
            </div>
            <div className='flex gap-2'>
              <button
                className=' border border-secondary-custom w-7 h-7 rounded-md'
                onClick={decrementPages}
              >
                <ArrowBackIosNewOutlinedIcon />
              </button>
              <button
                className=' border border-secondary-custom w-7 h-7 rounded-md'
                onClick={incrementPages}
              >
                <ArrowForwardIosOutlinedIcon />
              </button>
            </div>
          </div>
        </div>
      </MainContent>
    </>
  );
};
export default Page;
