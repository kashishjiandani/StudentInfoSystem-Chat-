
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Exitpage = () => {
  const studentInfo = useSelector((state) => state.student);
  console.log(studentInfo)

  return (
    <div className="bg-gradient-to-r from-indigo-200 via-red-200 to-green-100 flex flex-col w-full items-center justify-center h-screen">
    <h1 className="text-3xl font-semibold"> Your name {studentInfo?.name} aged {studentInfo?.age} has been added to the student system.</h1>
    <p className="text-lg font-medium my-2">You may now exit.</p>
    <Link to="/" className="bg-black border border-black text-white hover:text-black hover:bg-white px-4 py-2 rounded-full">
      Exit
    </Link>
  </div>
    
  );
};

export default Exitpage;
