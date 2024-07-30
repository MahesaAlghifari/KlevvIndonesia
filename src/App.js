import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormWithApi from './Components/FormWithApi';
import Header from './Components/Header';
import Hero from './Components/Hero';
import ViewData from './Components/ViewData';

function App() {
  return (
    <Router>
      <Header />
      <Hero />
      <Routes>
        <Route path="/" element={<FormWithApi />} />
        <Route path="/viewdata" element={<ViewData />} />
      </Routes>
    </Router>
  );
}

export default App;
