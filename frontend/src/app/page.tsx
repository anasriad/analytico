"use client";

import Header from "./components/Header";
import Background from "../app/components/background";
import Link from "next/link";

const Home = () => {
  return (
    <div className="overflow-x-hidden w-full h-screen">
      <Header />
      <Background />
      <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl mb-6 bg-black bg-opacity-55 p-4 rounded-3xl">
          The Ultimate Data Analysis Guide
        </h1>
        <div className="flex space-x-4">
          <Link href="/Form">
            <button className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-green-700 shadow-xl shadow-green-500 border">
              Upload Dataset
            </button>
          </Link>
          <button className="bg-black text-white px-6 py-3 rounded-2xl hover:bg-green-700 shadow-xl shadow-green-500 border">
            Explore Models
          </button>
          <button className="bg-black text-white px-6 py-3 hover:bg-green-700 shadow-xl shadow-green-500 border rounded-2xl">
            Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
