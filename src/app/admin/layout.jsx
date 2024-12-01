import React from "react";


export default function AdminLayout({ children }) {
  return (
    <div className="h-screen flex flex-col  overflow-y-hidden">

      <div className="flex flex-1 overflow-y-hidden ">   
        <main className="flex-1 h-full pt-7 px-4 sm:px-8 sm:ps-24 overflow-x-hidden overflow-y-hidden ">
          {children}
        </main>
      </div>
    </div>
  );
}
