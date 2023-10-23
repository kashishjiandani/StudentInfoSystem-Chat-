import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Entrypage from './components/Entrypage';
import Chatbot from './components/Chatbot';
import Exitpage from './components/Exitpage';


const App = () => {
  return (
    <div className="App">
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Entrypage />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/exit" element={<Exitpage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
