import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({ children }: any) => {
  const { pathname } = useRouter();

  return (
    <div className="h-full">
      <div className="flex justify-center items-center w-full shadow-sm mb-4 pt-4">
        <Link href={"/"} className="flex justify-center items-center  w-fit">
          <Image
            src="/images/shop-senses.png"
            alt="logo"
            width={200}
            height={80}
            className="brightness-105 contrast-115"
          />
        </Link>
      </div>
      {pathname === "/" && (
        <div className="flex justify-center items-center">
          <Link
            href="/information"
            className="py-1 px-8 text-center font-semibold w-fit rounded-full border border-yellow-100 shadow-sm hover:border-gray-500 transition duration-300 ease-in-out"
          >
            Discover
          </Link>
        </div>
      )}
      <div className="flex justify-center w-full">{children}</div>
    </div>
  );
};

export default Layout;
