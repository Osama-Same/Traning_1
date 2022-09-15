import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCurrentUser } from "./service/userService";
import Navigation from "./components/navigation/Navigation";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import Register from "./components/users/register";
import Profile from "./components/users/profile";
import Origins from "./components/origin/Origins";
import Brands from "./components/brand/Brand";
import Products from "./components/product/Products";
import Units from "./components/units/Units";
import UsersStore from "./components/usersStore/usersStore";
import Home from "./components/home/Home";
import { CategoriesAdminPage } from "./components/categories/CategoriesAdminPage";
const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    update();
  }, []);
  async function update() {
    const _user = await getCurrentUser();
    setUser(_user);
  }
  console.log('App user',user);
  return (
    <BrowserRouter>
      <Navigation user={user} />
      <Routes>
        <Route path="/origins" element={<Origins user={user} />} />
        <Route path="/brands" element={<Brands user={user} />} />
        <Route path="/product" element={<Products user={user} />} />
        <Route
          path="/categories"
          element={<CategoriesAdminPage allowEdit={true} user={user} />}
        />
        <Route path="/Units" element={<Units user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/UsersStore" element={<UsersStore user={user} />} />
        <Route path="/" element={<Home user={user} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
