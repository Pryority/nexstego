import Head from "next/head";
import React, { useState } from "react";

export default function Decode() {
  const [showImage, setShowImage] = useState(false);
  const [message, setMessage] = useState();
  const state = {
    decodedMessage: "",
    button: "Upload",
    picture: "",
    messageImg: "",
    callCount: 0,
  };

  const handleShowPicture = () => {
    setShowImage(!showImage);
  };

  const { decodedMessage, callCount, button } = state;
  
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
    const canvas = this.refs.messageC;
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
          this.setState({ messageImg: imageData }, this.callDecode(imageData));
        }
      };
    }
  };

  const callDecode = (messageImg) => {
    this.decodeMessage(messageImg);
  };
  
  const decodeMessage = (messageImg) => {
    const { messageC } = this.refs;
    const messageContext = messageC.getContext("2d");
    console.log(messageImg);
    const width = messageImg.width;
    const height = messageImg.height;

    const original = messageContext.getImageData(0, 0, width, height);
    let binaryMessage = "";
    let pixel = original.data;
    for (let i = 0, n = pixel.length; i < n; i += 4) {
      for (var offset = 0; offset < 3; offset++) {
        let value = 0;
        if (pixel[i + offset] % 2 !== 0) {
          value = 1;
        }

        binaryMessage += value;
      }
    }

    let output = "";
    for (let i = 0; i < binaryMessage.length; i += 8) {
      let c = 0;
      for (let j = 0; j < 8; j++) {
        c <<= 1;
        c |= parseInt(binaryMessage[i + j]);
      }
      output += String.fromCharCode(c);
    }
    this.setState({
      decodedMessage: output.substring(0, output.indexOf("\u0000")),
    });
  };

  const render = () => {
    return this.getMain();
  };

  return(
    <div>
      <form>
        <input name='picture' placeholder='Picture - Only JPG and PNG' accept="jpg, png" onChange={handleChange} />
      </form>
      {/* <DecodeToastForm /> */}

      {callCount>1 ?  
        <div className="binary">
          <div
            className="bg-red-300"

          >
            <div className="bg-green-500">{callCount>2 ? decodedMessage : "Will calculate..."}</div>
          </div>
        </div>
        : 
        <div></div>
      }
      <button className="bg-green-400 hover:bg-green-600" value='Submit' onClick={handleShowPicture} disabled={callCount>2}>{button}</button>
      {/* <Button color="primary" value='Submit' onClick={this.encodeMessage}>Encode</Button> */}
                              
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
            <div>      
              <div className="flex flex-col w-full">
                <label className="text-primary text-sm">message</label>
                <div
                  onClick={() => {
                    messageRef.current.click();
                  }}
                  className={`verification-outline-dashed ${message ? "border-lime-500 border-solid" : "border-dashed hover:border-solid hover:border-teal-500"}`}
                >
                  {message ? (
                  // eslint-disable-next-line @next/next/no-img-element
                    <img
                      onClick={() => {
                        messageRef.current.click();
                      }}
                      src={URL.createObjectURL(message)}
                      alt="message"
                      className="h-full rounded-md object-cover"
                    />
                  ) : (
                    <div className='flex flex-col space-y-2 justify-center items-center'>
                      {/* <PlusSmallIcon className="h-6 w-6" /> */}
                      <p>Upload message</p>
                    </div>
                  )}
                </div>
              </div>       
            </div>
          ) 
      }
    </div>
  );
};
