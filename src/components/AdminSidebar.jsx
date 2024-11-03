import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faPlus, faWarehouse, faHandHoldingUsd, faClipboardList, faTruck, faShoppingCart, faSignOutAlt, faUsers } from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = () => {
  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <div className="fixed top-0 left-0 h-full  bg-gray-800 text-white flex flex-col shadow-lg">
      
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <Link href="/admin" className="text-xl font-bold">
          La Veguita Admin
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link href="/admin" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faTachometerAlt} style={{ width: '20px', height: '20px' }} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/anadir-producto" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faPlus} style={{ width: '20px', height: '20px' }} />
              <span>Añadir Producto</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/gestionar-inventario" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faWarehouse} style={{ width: '20px', height: '20px' }}/>
              <span>Gestionar Inventario</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/proveedores" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faHandHoldingUsd} style={{ width: '20px', height: '20px' }}/>
              <span>Proveedores</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/ventas" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faShoppingCart} style={{ width: '20px', height: '20px' }}/>
              <span>Ventas</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/transporte" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faTruck} style={{ width: '20px', height: '20px' }}/>
              <span>Transporte</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/usuarios" className="flex items-center gap-3 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faUsers} style={{ width: '20px', height: '20px' }}/>
              <span>Usuarios</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '20px', height: '20px' }}/>
              <span>Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
