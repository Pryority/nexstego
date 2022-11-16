import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, CloudArrowUpIcon } from "@heroicons/react/24/solid";
import MenuItems from "./MenuItems";

export default function Navbar() {
  const [active, setActive] = useState(false);

  const showMenu = () => {
    setActive(!active);
  };

  return (
    <nav>
      <div className="top-0 right-0 z-50 p-4 bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg border-b border-white/80 dark:border-stone-900/80 fixed flex justify-between items-center w-full">
        {!active && (
          <>
            <Link href={"/"}>
              <h1 className='text-3xl tracking-tighter font-semibold text-primary cursor-pointer'>NexStego</h1>
            </Link>
            <Bars3Icon
              onClick={showMenu}
              className="h-8 w-8 cursor-pointer md:hidden text-teal-600 dark:text-teal-500 hover:text-teal-600 transition ease-in-out duration-75"
            />
          </>
        )}

        <ul className='hidden md:flex md:flex-row space-x-8 text-xl tracking-widest dark:text-white uppercase items-center'>
          <li>
            <div onClick={showMenu}>
              <div className="transition ease-in-out cursor-pointer bg-[#de3716] hover:bg-red-700 duration-100 text-secondary text-white rounded-lg tracking-tight flex space-x-1 py-1 px-4 justify-between border-2 hover:shadow-lg flex-row items-center font-semibold"
              >
                <p>Encrypt</p>
              </div>
            </div>
          </li>
          <li>
            <div onClick={showMenu}>
              <div className="transition ease-in-out cursor-pointer bg-green-700 hover:bg-lime-800 duration-100 text-secondary text-white rounded-lg tracking-tight flex space-x-1 py-1 px-4 justify-between border-2 hover:shadow-lg flex-row items-center font-semibold"
              >
                <p>Decrypt</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <MenuItems showMenu={showMenu} active={active} onClick={showMenu} />
    </nav >
  );
}