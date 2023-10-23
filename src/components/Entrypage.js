import React from 'react';
import { Link } from 'react-router-dom';

const Entrypage = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-green-100 flex flex-col w-full items-center justify-center h-screen">
      <h1 className="text-5xl font-semibold leading-10  mb-10">Welcome to the Student Information System!</h1>
      <Link to="/chatbot" className="bg-black border border-black text-white hover:text-black hover:bg-white px-4 py-2 rounded-full">
        Enroll Now!
      </Link>
    </div>
  );
};

export default Entrypage;
