import { useEffect, useState } from "react";
import ImageUpload from "../components/Image/ImageUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Body = () => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [text,setText] = useState(null);
  const [process, setProcess] = useState(0);
  const [rs, setRs] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const uploadToImgbb = async () => {
      if (!file) return null;
      setProcess(1);
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload?key=1354c230dd40a7043dbe4307c3df1bc3",
        data: formData,
        headers: {
          "content-Type": "multipart/form-data",
        },
      });
      if (response.data.data.url) setProcess(0);
      setImage(response.data.data.url);
    };
    uploadToImgbb();
  }, [file]);
  const handleSelectImage = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleDeleteImage = () => {
    setImage(null);
  };
  const handleClick = async () => {
    // Create a FormData object and append the image to it.
    const formData = new FormData();
    formData.append('image_input', image);
    formData.append('text_input', text);
    console.log(image);
    console.log(formData);
    // Make a POST request to the server with the FormData object.
    const response = await axios.post('http://localhost:8080/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Handle the response.
    if (response.status === 200) {
      // The image was successfully uploaded.
      // Do something with the response.data.
      // const data = response.data.images;
      // const src = `data:image/png;base64,${data}`;
      // console.log(src);
      // setNewImage(src);
      console.log("success");
      setRs(response.data);
      navigate('/rs', { state: { result: response.data , resultImg : image } });
    } else {
      // An error occurred.
      // Handle the error.
      console.error('Failed to upload and process the image.');
      console.log(image);
    }
  }
  const handleChange = (e) => {
    setText(e.target.value);
  }
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex items-center justify-center p-10 gap-x-24">
        <ImageUpload
          onChange={handleSelectImage}
          handleDeleteImage={handleDeleteImage}
          progress={process}
          image={image}
        ></ImageUpload>
        <div className="w-[500px] h-[250px]">
          <div className="relative h-full w-full min-w-[300px]">
            <textarea
              className="peer h-full border-t-white text-white min-h-[100px] w-full resize-none rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              onChange={handleChange}
            ></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              <p className="text-white">Description</p>
            </label>
          </div>
        </div>
      </div>
      {/* <button onClick={handleClick} className="bg-red">click</button> */}
        <button className="btn" type="button" onClick={handleClick}>
          <strong>Handle</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
    </div>
  );
};

export default Body;
