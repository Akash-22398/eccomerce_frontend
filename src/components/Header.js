import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/userAuth';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';


const Header = () => {
    const { isAuthenticated, login, logout } = useAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        let decodedToken = "";
        if (user) {
            decodedToken = jwtDecode(user);

            const username = decodedToken.email;
            setUserName(username);
        }
    }, [login, logout, isAuthenticated]);

    const handleLogout = () => {
        confirmAlert({
            customUI: ({ onClose }) => (
                <div
                    className="bg-white rounded-lg shadow-lg p-6 text-center"
                    style={{ width: '400px', margin: '0 auto' }}
                >
                    <div className="flex flex-row space-x-7 w-fit mx-auto items-center">
                        <div className="text-red-500 text-4xl mb-4">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Log Out</h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to log out?
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="px-4 py-2 rounded-3xl bg-white text-[#767676] border border-[#767676]"
                            onClick={() => {
                                // Log the user out and close the alert
                                logout();
                                onClose();
                            }}
                        >
                            Log Out
                        </button>
                        <button
                            className="px-4 py-2 bg-[#662671] text-white rounded-3xl"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
        });
    };


    return (
        <div className='bg-[#662671] w-full py-4 sm:py-7'>
            <div className="container h-[45px] sm:h-[10px] mx-auto sm:flex justify-between items-center px-6 sm:mx-auto  xl:text-sm text-white">
                <div className='flex flex-row justify-between items-center w-full'>
                    <Link to="/">
                        <div className='w-[140px] sm:w-[296px] sm:h-[46px] h-full'>
                            <img src='/logo.png' alt='digitalflake' />
                        </div>
                    </Link>
                    <div className='text-xl sm:text-5xl'>

                        <FontAwesomeIcon
                            icon={faUserCircle}
                            className="transform transition-transform"
                            onClick={handleLogout}
                        />

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header
