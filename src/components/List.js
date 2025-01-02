import React from 'react'
import { DataGrid } from "@mui/x-data-grid";

const List = ({ rows, columns }) => {
    return (
        <div>
            {/* DataGrid */}
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    rowHeight={70}
                    sx={{
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "#FFF8B7", // Set color for header row
                        },
                        "& .MuiDataGrid-row": {
                            backgroundColor: "#F2F2F2", // Set color for other rows
                        },

                        "& .MuiDataGrid-cell": {
                            padding: "10px", // Adjust padding if needed
                        },
                        "& .MuiDataGrid-row + .MuiDataGrid-row": {
                            marginTop: "10px", // Add vertical distance between rows
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default List
