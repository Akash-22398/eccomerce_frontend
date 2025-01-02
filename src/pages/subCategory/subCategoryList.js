import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faList, faSearch, faTrash, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { apiDelete, apiListPost } from "../../services/commonService";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from "../../components/List";
const SubCategoryList = () => {
    const [rows, setRows] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [deleteCount, setDeleteCount] = useState(1);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = {
                    name: searchText
                }
                const response = await apiListPost('/sub-category/list', data);
                console.log(response);
                const rows = response?.result?.map((item) => ({
                    ...item,
                    id: item._id, // Assign `_id` as `id` for DataGrid
                }));
                setRows(rows)
            } catch (error) {
                console.error('Failed to fetch skills:', error);
            }
        };

        fetchCategories();
    }, [searchText, deleteCount]);

    // Define columns
    const columns = [
        { field: "id", headerName: "Category ID", width: 193, },
        { field: "name", headerName: "Sub Category Name", width: 193 },
        {
            field: "category",
            headerName: "Category Name",
            width: 193,
            renderCell: (params) => (
                <div>
                    {params?.row?.category?.name}
                </div>
            ),
        },
        {
            field: "image",
            headerName: "Image",
            width: 193,
            renderCell: (params) => {
                console.log(params);

                return (
                    <img
                        src={params.row.image.url}
                        alt={params.row.name}
                        className="w-12 h-12 rounded"
                    />
                )
            },
        },
        {
            field: "status",
            headerName: "Status",
            width: 193,
            renderCell: (params) => (
                <span
                    className={`font-medium`}
                    style={{
                        color: params.row.status === "active" ? "#00A11A" : "#F70505",
                    }}
                >
                    {params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1)}
                </span>
            ),
        },
        {
            field: "actions",
            headerName: "Action",
            width: 193,
            renderCell: (params) => (
                <div className="flex items-center space-x-2">
                    <Link to={`/edit-subcategory/${params.row._id}`}>
                        <FontAwesomeIcon icon={faEdit} className="text-[#8F8F8F]" />
                    </Link>
                    <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            ),
        },
    ];

    // <i class="fa-regular fa-triangle-exclamation"></i>
    const handleDelete = (id) => {
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
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Delete</h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete?
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            className="px-4 py-2 rounded-3xl bg-white text-[#767676] border border-[#767676]"
                            onClick={async () => {
                                try {
                                    // Call the delete API
                                    const response = await apiDelete(`/sub-category/${id}`);

                                    if (response.success) {
                                        toast.success("Category deleted successfully!");
                                        setDeleteCount((prevValue) => prevValue + 1);
                                    } else {
                                        toast.error("Failed to delete Category.");
                                    }
                                } catch (error) {
                                    console.error("Error deleting item:", error);
                                    toast.error("An error occurred while trying to delete the item.");
                                }
                                onClose(); // Close the alert
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="px-4 py-2 bg-[#662671] text-white rounded-3xl"
                            onClick={onClose}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            ),
        });
    };

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
                <div className="flex flex-row w-[90%] item-center">

                    <div className="flex flex-row items-center">
                        <FontAwesomeIcon icon={faList} className="text-xl mr-4" />
                        <h1 className="text-2xl font-bold">Sub Categories</h1>
                    </div>
                    <div className="relative w-[70%] ml-8">
                        <input
                            type="text"
                            placeholder="Search sub category by name..."
                            className="px-4 w-full py-2 pl-10 border rounded-lg outline-[#9D9D9D]"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                            <FontAwesomeIcon icon={faSearch} className="text-xl mr-4" />
                        </div>
                    </div>

                </div>
                <div className="flex items-center space-x-2">
                    <Link to="/add-subcategory">
                        <button className="bg-[#662671] text-white px-4 py-2 rounded-lg">
                            Add New
                        </button>
                    </Link>
                </div>
            </div>

            {/* DataGrid */}
            <div style={{ height: 400, width: "100%" }}>
                <List rows={rows} columns={columns} />
            </div>
        </div>
    );
};

export default SubCategoryList;
