import Image from "next/image";
import Link from "next/link";


const IndexPage = () => {
  
  return (
    <div className="flex flex-col justify-start items-center gap-5 sm:gap-3 h-full mt-12">
      <div className="mb-8">
      <Image
            src="/images/hero-image.png"
            alt="travel bags"
            width={300}
            height={300}
            className="brightness-105 contrast-115"
          />
      </div>
      <div className="flex justify-center">
        <Link
          href="/notebooks/notebooks"
          passHref
          className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-full   hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4z"
              clipRule="evenodd"
            />
          </svg>
          <span >Start Tracking</span>
        </Link>
      </div>
    </div>
  );
};

export default IndexPage;
