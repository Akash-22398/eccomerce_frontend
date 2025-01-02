import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const categoryColumns = [
    { field: "id", headerName: "Category ID", width: 150 },
    { field: "categoryName", headerName: "Category Name", width: 200 },
    {
        field: "image",
        headerName: "Image",
        width: 150,
        renderCell: (params) => (
            <img
                src={params.value}
                alt={params.row.categoryName}
                className="w-12 h-12 rounded"
            />
        ),
    },
    { field: "status", headerName: "Status", width: 150 },
    {
        field: "actions",
        headerName: "Action",
        width: 150,
        renderCell: (params) => (
            <div className="flex items-center space-x-2">
                <Link to={`/edit-category/${params.id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                </Link>
                {/* <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(params.row.id)}
                > */}
                <FontAwesomeIcon icon={faTrash} />
                {/* </button> */}
            </div>
        ),
    },
]
export default categoryColumns;