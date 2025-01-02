import React, { useState } from 'react';
import { apiPost } from '../../services/commonService';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/userAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false); // State to toggle the popup

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
            const response = await login(data);

            if (response.success) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleForgotPassword = () => {
        setIsForgotPasswordOpen(true);
        navigate('/login')
    };

    const handleResetPassword = async (email) => {
        // Logic for sending the reset password link (can call an API for this)
        console.log('Password reset link sent to:', email);
        if (email) {

            setIsForgotPasswordOpen(false); // Close the popup after request
        }
    };

    return (
        <div className=" mx-auto w-full min-h-screen border rounded-lg bg-[#5C218B33]">

            <div className='flex flex-row justify-center items-center w-full mx-auto min-h-[590px] my-auto relative max-w-[1024px] z-0'>
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

                            <div className="mb-1 input-container">
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

                            <div className="mb-4 text-right">
                                <div onClick={handleForgotPassword} className="text-[#5C218B] cursor-pointer">
                                    Forgot Password?
                                </div>
                            </div>
                            <button type="submit" className="w-full px-4 py-2 bg-[#5C218B] text-white rounded-md ">
                                Login
                            </button>
                        </form>
                    </div>
                </div>

                <div className='w-[70%] absolute z-0 right-0'>
                    <img src='/userauth.png' alt='user authentication' className='w-full h-auto object-cover rounded-lg' />
                </div>
            </div>

            {/* Popup for Forgot Password */}
            {isForgotPasswordOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-[400px]">
                        <h2 className="text-xl font-bold text-center text-gray-800">
                            Did you forget password?
                        </h2>
                        <p className="text-gray-600 text-center mb-4">
                            Enter your email address and we’ll send you a link to restore password
                        </p>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                required
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleResetPassword(email)}
                                className="bg-[#5C218B] text-white px-4 py-2 rounded-md"
                            >
                                Request reset link
                            </button>
                            <button
                                onClick={() => setIsForgotPasswordOpen(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Login;
