import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiGet, apiListPost, apiPost, apiPut, uploadImage } from "../../services/commonService";

const AddSubCategory = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [imageId, setImageId] = useState('');
    const [status, setStatus] = useState('active')
    const [errors, setErrors] = useState({
        name: '',
        image: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryList, setCategoryList] = useState();
    const [category, setCategory] = useState('');
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                if (id) {
                    const response = await apiGet(`/sub-category/${id}`);
                    console.log(response);
                    if (response.success) {
                        setName(response?.result?.name);
                        setImage(response?.result?.image?.url);
                        setStatus(response?.result?.status)
                        setImageId(response?.result?.image._id)
                        setCategory(response?.result?.category._id)
                    }

                }
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };

        fetchCategory();
    }, [id]);
    console.log(category);

    useEffect(() => {
        const fetchCategories = async () => {
            try {

                const response = await apiListPost('/category/list');

                setCategoryList(response?.result)

            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = async (e) => {
        const uploadedImage = e.target.files[0];
        const objectType = "category"
        const response = await uploadImage(uploadedImage, objectType);
        setImage(response?.data?.result?.url);
        setImageId(response?.data?.result?._id)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!name) {
            newErrors.name = 'Name is required';
            valid = false;
        }


        setErrors(newErrors);

        if (valid) {
            // Handle successful form submission
            console.log('Form submitted');
        }

        try {
            const data = {
                name: name,
                image: imageId,
                status: status,
                category: category
            }
            let response;
            if (id) {
                response = await apiPut(`/sub-category/${id}`, data);
            } else {
                response = await apiPost('/sub-category', data);
            }
            if (response.success) {
                navigate('/sub-category');

            }
        } catch (error) {
            console.error('Error:', error);
        }

    };

    return (
        <div className="mx-auto p-4 ">
            {/* Title with Back Arrow */}
            <Link to={'/sub-category'}>
                <div className="flex items-center space-x-2 mb-6">
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="transform transition-transform text-[#9D9D9D]"
                    />
                    <h1 className="text-2xl font-bold">{id ? 'Edit Sub Category' : "Add Sub Category"}</h1>
                </div>
            </Link>

            {/* Form */}
            <form
                className="bg-white"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col sm:flex-row space-x-20">

                    {/* Category Name */}
                    <div className="mb-4 input-container">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className='input-field'
                        />
                        <label htmlFor="Name" className="input-label">Sub Category Name <span className='text-red-500 w-full'>*</span></label>

                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    <div className="mb-4 input-container">

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='input-field'
                        >
                            <option value="">
                                Select Category
                            </option>
                            {categoryList?.map((ele, index) => {
                                console.log(ele._id, 'dff', category);

                                return (
                                    <option value={ele._id} key={index}>
                                        {ele.name}
                                    </option>
                                )
                            })}

                        </select>

                        <label htmlFor="Name" className="input-label"> Category <span className='text-red-500 w-full'>*</span></label>

                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                </div>
                <div className="flex flex-col sm:flex-row space-x-20 mt-10">
                    {/* Upload Image */}
                    <div className="flex flex-row items-center space-x-7">
                        {/* Image upload container */}
                        <div className="mb-4 input-container relative">
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="imageUpload"
                                className="relative block w-[150px] h-[130px] border border-[#9F9F9F] p-5 rounded-lg cursor-pointer"
                            >

                                {image ? <img
                                    src={image}
                                    alt="upload"
                                    className="w-[80px] h-[80px] mx-auto"
                                />
                                    :
                                    <img src="mobile.jpg" alt="mobile" />
                                }
                                <div
                                    className="absolute top-[-10px] left-2 right-2 text-center bg-white w-[110px] text-gray-600 text-sm font-medium"
                                >
                                    Upload Image
                                </div>
                            </label>

                        </div>

                        {/* Information and example image */}
                        <div className="mb-4 input-container relative border border-[#CCCCCC] border-dashed rounded-lg p-2 w-[140px] cursor-pointer">
                            <label htmlFor="imageUpload" className="block cursor-pointer">
                                <img
                                    src="/nature.png"
                                    alt="upload"
                                    className="w-[80px] h-[80px] mx-auto"
                                />
                                <div className="w-full text-[10px] text-center mt-2">
                                    Upload Maximum allowed file size is 10MB
                                </div>
                            </label>
                        </div>


                    </div>

                    {/* status */}
                    {id && <div className="mb-4 input-container">

                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            className='input-field'
                        >
                            <option value='active'>
                                Active
                            </option>
                            <option value='inactive'>
                                Realme
                            </option>
                        </select>

                        <label htmlFor="Name" className="input-label"> Status <span className='text-red-500 w-full'>*</span></label>

                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    }
                </div>
                {/* Submit Button */}
                <div className="absolute bottom-40 right-2 flex flex-row ">
                    <div className="flex items-center">
                        <Link to="/sub-category">
                            <button className="border mr-6 w-[150px] border-[#9D9D9D] text-[#767676] px-4 py-2 rounded-3xl h-[50px]">
                                Cancel
                            </button>
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-[150px] bg-[#662671] text-white py-2 px-4 rounded-3xl transition duration-200 h-[50px] "
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSubCategory;
