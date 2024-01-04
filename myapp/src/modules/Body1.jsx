import { useEffect, useState } from "react";
import ImageUpload from "../components/Image/ImageUpload";
import axios from "axios";
import StarsMouse from "../components/Mouse/StarsMouse";
import Loader from "../components/Loader/Loader";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

const Body1 = () => {
    const [currentProduct, setCurrentProduct] = useState({ file: null, image: null, text: null });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [process, setProcess] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const uploadToImgbb = async () => {
            if (!currentProduct.file) return null;
            setProcess(1);
            const formData = new FormData();
            formData.append("image", currentProduct.file);
            try {
                const response = await axios.post(
                    "https://api.imgbb.com/1/upload?key=a1ad1ec2f3609f79f5c2c4f6ed0b6602", formData
                );
                if (response.data.data.url) {
                    setProcess(0);
                    setCurrentProduct(prevProduct => ({
                        ...prevProduct,
                        image: response.data.data.url,
                    }))
                };
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        };
        uploadToImgbb();
    }, [currentProduct.file]);

    const handleSelectImage = (e) => {
        if (e.target.files) {
            setCurrentProduct(prevProduct => ({
                ...prevProduct,
                file: e.target.files[0],
            }));
        }
    };

    const handleTextChange = (e) => {
        setCurrentProduct(prevProduct => ({
            ...prevProduct,
            text: e.target.value,
        }));
    };
    const handleSelectProduct = (index) => {
        const selectedProduct = products[index];
        setCurrentProduct(selectedProduct);
    };
    const handleAddNew = () => {
        // Thêm điều kiện để không thêm sản phẩm trùng lặp
        if (currentProduct.image && currentProduct.text && !products.includes(currentProduct)) {
            setProducts(prevProducts => [...prevProducts, currentProduct]);
            setCurrentProduct({ file: null, image: null, text: null });
        } else {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm");
        }
    };
    const handleDeleteImage = () => {
        // Update the currentProduct state to remove the image
        setCurrentProduct(prevProduct => ({
            ...prevProduct,
            file: null,
            image: null // This sets the image to null, effectively "deleting" it
        }));
    };
    const handleClick = async () => {
        setLoading(true);
        const formData = new FormData();

        const allProducts = [...products];
        if (currentProduct.image && currentProduct.text) {
            allProducts.push(currentProduct);
        }

        allProducts.forEach((product, index) => {
            formData.append(`image_input${index + 1}`, product.image);
            formData.append(`text_input${index + 1}`, product.text);
        });

        try {
            const response = await axios.post('http://localhost:8080/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("success");
            console.log(response.data);
            setLoading(false);
            navigate("/rs", { state: { result: response.data } });
        } catch (error) {
            console.error('Error during API call', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5 justify-center items-center">
            <div className="flex items-center justify-center p-10 gap-x-24">
                <ImageUpload
                    onChange={handleSelectImage}
                    handleDeleteImage={handleDeleteImage}
                    progress={process}
                    image={currentProduct.image}
                ></ImageUpload>
                <div className="w-[500px] h-[250px]">
                    <div className="relative h-full w-full min-w-[300px]">
                        <textarea
                            className="peer h-full border-t-white text-white min-h-[100px] w-full resize-none rounded-[7px] border border-white border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-400 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                            onChange={handleTextChange}
                            value={currentProduct.text || ""}
                        ></textarea>
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            <p className="text-white">Description</p>
                        </label>
                    </div>
                </div>
                <div className="flex flex-col gap-y-[20px]">
                    <div className="mb-auto">
                        <button
                            title="Add New"
                            className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                            onClick={handleAddNew}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50px"
                                height="50px"
                                viewBox="0 0 24 24"
                                className="stroke-purple-400 fill-none group-hover:fill-purple-800 group-active:stroke-purple-200 group-active:fill-purple-600 group-active:duration-0 duration-300"
                            >
                                <path
                                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                    strokeWidth="1.5"
                                ></path>
                                <path d="M8 12H16" strokeWidth="1.5"></path>
                                <path d="M12 16V8" strokeWidth="1.5"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="w-full">
                        {products.map((product, index) => (
                            <div key={index}
                                className="flex items-center gap-3 mb-2 cursor-pointer"
                                onClick={() => handleSelectProduct(index)}>
                                <img src={product.image}
                                    alt={`Product ${index}`}
                                    className="h-20 w-20 object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {loading ? (
                <Loader></Loader>
            ) : (
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
            )}
            <StarsMouse></StarsMouse>
        </div>
    );
};

export default Body1;
