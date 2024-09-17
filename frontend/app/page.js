'use client'
import Image from "next/image";
import Button from "./components/common/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateTo = (url) => {
    router.push(url)
  }
  
  return (
    <div className="bg-white text-black w-full h-screen pt-[68px]">
      <div className="flex flex-col h-full justify-center items-center">
        <h1 className="text-center text-[32px] mb-3">Get latest news around the globe!</h1>
        <Button label='Login' onClick={() => navigateTo('/login')} />
      </div>
    </div>
  );
}
