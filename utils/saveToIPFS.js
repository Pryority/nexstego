import axios from 'axios'

let token = process.env.WEB3_STORAGE_TOKEN;

const saveToIPFS = async (file) => {
    // Create a new multipart form data
    const formData = new FormData();
    // Add file to the form data
    formData.append('file', file);

    var config = {
        method: 'post',
        url: "https://api.web3.storage/upload",
        headers: {
            Authorization: `Bearer ` + token,
            "Content-Type": "text/plain",
        },
        data: formData,
    };

    // Posting the form data to the IPFS API
    const response = await axios(config);
    //  return the CID - Content Identifier hash
    return response.data.cid;
}

export default saveToIPFS;