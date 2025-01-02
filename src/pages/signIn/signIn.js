import React, { useState } from 'react';
import { apiPost } from '../../services/commonService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
  
      const togglePasswordVisibility = () => {
          setShowPassword(!showPassword);
      };
      const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = {
            email: '',
            password: ''
        };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!validateEmail(email)) {
            newErrors.email = 'Enter a valid email address';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Handle successful form submission
            console.log('Form submitted');
        }

        try {
            const data = {
                email: email,
                password: password
            }
            const response = await apiPost('/user/login', data);
            if (response.success) {
                navigate('/login');

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    console.log(errors);

    return (
        <div className=" mx-auto w-full min-h-screen border rounded-lg bg-[#5C218B33]">

            <div className='flex flex-row justify-center items-center w-full mx-auto min-h-[590px] my-auto relative max-w-[1024px]'>
                <div className='w-[50%] bg-white p-6  bg-cover bg-center rounded-lg z-50 absolute right-[30%]'>
                    <div className='w-[140px] mx-auto sm:w-[230px] sm:h-[124px] h-full'>
                        <img src='/digiflake.png' alt='digitalflake' />
                    </div>
                    <div className='text-center font-normal text-2xl text-[#868686]'>
                        Welcome to Digitalflake admin
                    </div>
                    <div className='mt-4'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 input-container">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='input-field'
                                />
                                <label htmlFor="email" className="input-label">Email <span className='text-red-500 w-full'>*</span></label>

                                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                            </div>

                            <div className="mb-4 input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className='input-field'
                                />
                                <label htmlFor="password" className="input-label">Password <span className='text-red-500 w-full'>*</span></label>
                                <div
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <FontAwesomeIcon
                                            icon={faEyeSlash}
                                            className="text-gray-500 sm:text-xl transform transition-transform"
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            className="text-gray-500 sm:text-xl transform transition-transform"
                                        />
                                    )}
                                </div>
                                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                            </div>

                            <button type="submit" className="w-full px-4 py-2 bg-[#5C218B] text-white rounded-md ">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>

                <div className='w-[70%] absolute z-0 right-0'>
                    <img src='/userauth.png' alt='user authentication' className='w-full h-auto object-cover rounded-lg' />
                </div>
            </div>
        </div>

    );
};

export default SignIn;
