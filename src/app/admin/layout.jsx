// src/app/admin/layout.jsx
import React from "react";


export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 overflow-y-hidden">

      <div className="flex overflow-y-hidden ">   
        <main className="flex-1 pt-7 px-4 sm:px-8 sm:ps-24 overflow-x-hidden overflow-y-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
