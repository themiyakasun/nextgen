'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IKImage, IKUpload, ImageKitProvider } from 'imagekitio-next';
import { toast } from 'sonner';

import config from '@/config';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import { cn } from '@/lib/utils';

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status} : ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed with ${error?.message}`);
  }
};

const ProductImageUpload = ({
  onFileChange,
  value = [],
}: {
  onFileChange: (urls: string[]) => void;
  value?: string[];
}) => {
  const ikUploadRef = useRef(null);
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    if (value.length > 0) {
      setFiles(value);
    }
  }, [value]);

  const onError = (error: any) => {
    console.error(error);
    toast.error('Image upload failed');
  };

  const onSuccess = (res: any) => {
    const newFiles = [...files, res.filePath];
    setFiles(newFiles);
    onFileChange(newFiles);
    toast.success('Image uploaded successfully');
  };

  const removeImage = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFileChange(updated);
  };

  return (
    <ImageKitProvider
      urlEndpoint={config.env.imageKit.urlEndpoint}
      publicKey={config.env.imageKit.publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          //@ts-ignore
          ikUploadRef.current?.click();
        }}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-secondary-custom items-center'
        )}
      >
        <FilePresentOutlinedIcon className='text-muted-foreground' />
        <span className='text-muted-foreground text-sm'>Upload images</span>
      </button>

      <div className='flex flex-wrap gap-2 mt-4'>
        {files.map((file, index) => (
          <div key={index} className='relative'>
            <IKImage
              alt={`uploaded-${index}`}
              path={file}
              width={100}
              height={100}
              className='rounded border'
            />
            <button
              onClick={() => removeImage(index)}
              className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1'
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ImageKitProvider>
  );
};

export default ProductImageUpload;
