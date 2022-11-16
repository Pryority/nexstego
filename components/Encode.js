import Head from "next/head";
import React, { useState, useRef } from "react";

export default function Decode() {
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const state = {
    decodedimage: "",
    button: "Upload",
    picture: "",
    imageImg: "",
    callCount: 0,
  };

  const imageRef = useRef();

  const handleShowPicture = () => {
    setShowImage(!showImage);
  };

  const { decodedimage, callCount, button } = state;
  
  const handleChange = (e) => {
    if (e.target.files)
      this.setState({
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      });
    else this.setState({ [e.target.name]: e.target.value });
  };

  const showPicture = () => {
    const { callCount } = this.state;
    console.log(this.state);
    this.setState({ showImage: true }, this.drawOriginalPicture());
    switch (callCount) {
    case 0:
      this.setState({ button: "Show Image" });
      break;
    case 1:
      this.setState({ button: "Decode" });
      break;
    default:
      this.setState({ button: "Decode" });
    }
  };

  const drawOriginalPicture = () => {
    const { picture, callCount } = this.state;
    const img = new Image();
    this.setState({ callCount: callCount + 1 });
    const canvas = this.refs.imageC;
    img.src = picture;
    if (callCount === 1) {
      const context = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      img.onload = () => {
        context.drawImage(img, 0, 0);
        if (canvas.width > 0) {
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          this.setState({ imageImg: imageData }, this.callDecode(imageData));
        }
      };
    }
  };

  const callDecode = (imageImg) => {
    this.decodeimage(imageImg);
  };
  
  const decodeimage = (imageImg) => {
    const { imageC } = this.refs;
    const imageContext = imageC.getContext("2d");
    console.log(imageImg);
    const width = imageImg.width;
    const height = imageImg.height;

    const original = imageContext.getImageData(0, 0, width, height);
    let binaryimage = "";
    let pixel = original.data;
    for (let i = 0, n = pixel.length; i < n; i += 4) {
      for (var offset = 0; offset < 3; offset++) {
        let value = 0;
        if (pixel[i + offset] % 2 !== 0) {
          value = 1;
        }

        binaryimage += value;
      }
    }

    let output = "";
    for (let i = 0; i < binaryimage.length; i += 8) {
      let c = 0;
      for (let j = 0; j < 8; j++) {
        c <<= 1;
        c |= parseInt(binaryimage[i + j]);
      }
      output += String.fromCharCode(c);
    }
    this.setState({
      decodedimage: output.substring(0, output.indexOf("\u0000")),
    });
  };

  const render = () => {
    return this.getMain();
  };

  const reset = () => {
    setImage("");
    console.log("The image to be encrypted was reset!");
  };

  return(
    <div className="flex flex-col w-full h-full justify-center items-center relative">
      {/* <Button color="primary" value='Submit' onClick={this.encodeimage}>Encode</Button> */}
      <div className="absolute flex flex-col w-full h-full">
        {
          showImage ? (
            <div>
              <div>
                <Head>Picture</Head>
                <canvas style={{width:"888px", height:"auto"}} ></canvas>
              </div>
            </div>
          ) 
            :
            (
              <div className="flex flex-col w-full justify-center items-center">
                <h1>ENCODE IMAGE</h1>  

                <input
                  type="file"
                  className="hidden"
                  ref={imageRef}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                />

                <div
                  onClick={() => {
                    imageRef.current.click();
                  }}
                  className={`verification-outline-dashed ${image ? "border-lime-500 border-solid w-fit" : "border-dashed hover:border-solid hover:border-teal-500"}`}
                >
                  {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                    <img
                      onClick={() => {
                        imageRef.current.click();
                      }}
                      src={URL.createObjectURL(image)}
                      alt="image"
                      className="h-full rounded-md object-cover"
                    />
                  ) : (
                    <div className='flex flex-col h-full w-full justify-center items-center relative'>
                      {/* <PlusSmallIcon className="h-6 w-6" /> */}
                      <div className="absolute">
                        <p>Upload Image</p>
                      </div>
                    </div>
                  )}
                </div>

                <h2>{image.name}</h2>

                <div 
                  className="bg-gray-100 border-2 mt-8 hover:bg-slate-600 hover:text-slate-50 transition-all ease-in-and-out duration-250 py-1 px-4 rounded-lg cursor-pointer"
                  onClick={reset}
                >
                  <h1>Reset</h1>  
                </div>
              </div>       
            ) 
        }
      </div>
    </div>
  );
};
