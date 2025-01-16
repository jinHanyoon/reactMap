import './App.css';
import  Header from './component/header/page.jsx'
import Layout from './layout.jsx';
import {Routes, Route } from 'react-router-dom' 
import Main from './pages/main/page.jsx';
import Login from './api/auth/login/page.jsx'
function App() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Header/>

      <Routes>
     <Route path="/" element={<Main/>} />
      <Route path="/login" element={<Login/>} />
   </Routes> 
    </div>

  );
}

export default App;
