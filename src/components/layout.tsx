import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children }: any) => {
  return (
    <div className="h-full">
      <div className='flex justify-center items-center w-full shadow-sm mb-4 pt-4'>
      <Link href={'/'} className='flex justify-center items-center mb-4  w-fit'>
        <Image src="/images/shop-senses.png" alt='logo' width={200} height={80}  className="brightness-105 contrast-115" />
      </Link>
      </div>
      <div className="flex justify-center w-full">{children}</div>
    </div>
  );
};

export default Layout;
