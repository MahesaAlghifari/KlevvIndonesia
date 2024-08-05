// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import ViewData from './components/ViewData';
import Hero from './components/Hero';

const Layout = ({ children }) => {
  return (
    <div>
      <Hero />
      <main>{children}</main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/form" element={<Form />} />
          <Route path="/viewdata" element={<ViewData />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
