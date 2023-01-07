import React, {useState} from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Header from "./components/partials/Header"
import Footer from "./components/partials/Footer"
import Main from "./components/Main"

// admin
import Admin from "./components/admin/Admin"
// import ListaProductos from "./components/admin/ListaProductos";
import Crear from "./components/admin/Crear"
import Editar from "./components/admin/Editar"

import './css/styles.css'
import Lista from './components/admin/List'

function App() {

  const {main, setMain} = useState(false)
  
  return (
    <div className="home">
    <BrowserRouter>
      <Header/>

        <Routes>

          <Route path="/" element={<Main/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/admin/productos" element={<Lista/>}/>
          <Route path="/admin/producto/crear" element={<Crear/>}/>
          <Route path="/admin/producto/editar" element={<Editar/>}/>
          
        </Routes>

      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
