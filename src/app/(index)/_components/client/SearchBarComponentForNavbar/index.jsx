"use client";
import React from 'react';
import { BsSearch } from "react-icons/bs";

function SearchBarComponentForNavbar() {
  return (
      <form className="flex-1 relative border dark:border-none border-[#e5e7eb] rounded-lg overflow-clip flex items-center">
          <input
              type="text"
              placeholder="Search..."
              className="w-full px-2 py-1 dark:text-black focus:outline-none"
          />
          <button className="absolute right-0 dark:text-black pe-3 py-1">
              <BsSearch />
          </button>
      </form>
  )
}

export default SearchBarComponentForNavbar;