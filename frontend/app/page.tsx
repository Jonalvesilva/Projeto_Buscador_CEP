"use client";
import SearchField from "@/components/SearchField";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  return (
    <section
      className="h-screen min-h-[1100px] bg-cover"
      style={{ backgroundImage: "url('cidade.png')" }}
    >
      <div className="h-screen min-h-[1100px]  bg-black/80">
        <div className=" min-h-[1100px]  w-full flex flex-col items-center justify-start py-[150px] max-w-screen-md mx-auto">
          <div className="title flex items-center justify-between  text-white font-semibold p-4  gap-x-2">
            <h2 className="text-3xl">Buscador de CEP</h2>
            <BsSearch size={30} />
          </div>
          <div className="w-[90%] min-w-[320px]">
            <SearchField />
          </div>
        </div>
      </div>
    </section>
  );
}
