import React, { useState } from "react";
import Link from "next/link";
import Decode from "../../components/Decode";
import Encode from "../../components/Encode";

function Landing() {
  const [isConnected, setIsConnected] = useState(false);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert("Please install MetaMask");
        return;
      }

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      // At last save the user's wallet address in browser's local storage
      localStorage.setItem("walletAddress", accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Creating a hero component with black background and centering everything in the screen */}
      <section className="bg-1 flex flex-col space-y-4 min-h-screen justify-center items-center w-full relative">
        <div className="flex flex-col absolute space-y-8 w-full h-full top-40 items-center md:w-2/3 lg:w-3/5 xl:w-1/2">
          <div className='flex flex-col w-full items-center'>
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter"
              data-aos="zoom-y-out"
            >
              <span className="bg-clip-text p-2 flex text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                NexStego
              </span>
            </h1>
          </div>
          <div className="text-center text-sm w-5/6 leading-4 mx-auto flex flex-col items-center space-y-4">
            <p
              className="md:text-xl tracking-wide text-gray-400"
              data-aos="zoom-y-out"
              data-aos-delay="150"
            >
                A tool to hide arbitrary data within the LSBs of an image.
            </p>
          </div>

          {/* <Decode/> */}
          <Encode/>
          {/* <div className='md:pt-16'>
            <Link href={"/home"}>
              <button
                className="text-sm button-primary w-[140px]"
                onClick={() => {
                  // Calling the connectWallet function when user clicks on the button
                  connectWallet();
                }}
              >
                <span>{isConnected ? "Disconnect" : "Connect wallet"}</span>
              </button>
            </Link>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Landing;