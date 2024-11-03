// src/app/admin/layout.jsx
import React from "react";


export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="flex">
    
   
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
