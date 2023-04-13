import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home';
import Nav from './components/navbar/Nav';
import UploadPage from './components/uploadPage/UploadPage';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadPage/>} />
      </Routes>
    </BrowserRouter>
    // <UploadPage/>
  );
}

export default App;
