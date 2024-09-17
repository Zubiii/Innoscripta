import Link from "next/link";

const defaultLayout = () => {
  return (
    <div className="absolute w-full bg-white text-black">
      <div className="flex justify-between items-center pt-2 lg:px-40 md:px-40 sm:px-3">
        <h1 className="cursor-pointer text-[32px]">
          <Link href='/'>CCAB News</Link>
        </h1>
        <h1 className="cursor-pointer font-semibold">
          <Link href='/login'>Login</Link>
        </h1>
      </div>
      <hr />
    </div>
  );
};
export default defaultLayout;
