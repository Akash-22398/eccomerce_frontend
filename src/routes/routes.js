import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/home";
import AddCategory from "../pages/category/addCategory";
import CategoryList from "../pages/category/categoryList";
import SignIn from "../pages/signIn/signIn";
import Login from "../pages/login/login";
import SubCategoryList from "../pages/subCategory/subCategoryList";
import AddSubCategory from "../pages/subCategory/addSubCategory";
import ProductsList from "../pages/products/products";
import AddProduct from "../pages/products/addProducts";
import ProtectedRoute from "./ProtectedRoutes";


function AppRoutes() {
    return (
        <Router>
            <Routes>

                <Route
                    path="/sign-in"
                    element={
                        <SignIn />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <Home />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/category"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <CategoryList />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-category"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <AddCategory />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/edit-category/:id"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <AddCategory />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/sub-category"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <SubCategoryList />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-subcategory"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <AddSubCategory />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/edit-subcategory/:id"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <AddSubCategory />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <ProductsList />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add-product"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <AddProduct />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/edit-product/:id"
                    element={
                        <ProtectedRoute>
                            <MainLayout>
                                <AddProduct />
                            </MainLayout>
                        </ProtectedRoute>
                    }
                />


            </Routes>
        </Router>
    )
}
export default AppRoutes;

