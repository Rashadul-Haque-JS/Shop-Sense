import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children }: any) => {
  return (
    <div className="h-full">
      <Link href={'/'} className='flex justify-center items-center mb-4 py-8'>
        <Image src="/images/shop-senses.png" alt='logo' width={200} height={80}  className="brightness-105 contrast-115" />
      </Link>
      <div className="flex justify-center">{children}</div>
    </div>
  );
};

export default Layout;
