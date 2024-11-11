import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faPlus, faWarehouse, faHandHoldingUsd, faClipboardList, faTruck, faShoppingCart, faSignOutAlt, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@/context/UserContext";
import { Tooltip as ReactTooltip } from "react-tooltip";

const AdminSidebar = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  
  const isActive = (path) => pathname === path;

  return (
    <div className="">
      {/* Navbar superior en pantallas pequeñas */}
      <div className="sm:hidden bg-sky-700 text-white flex justify-between items-center p-4">
        <Link href="/admin" className="text-lg font-bold">Admin</Link>
        <button onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} style={{ width: '24px', height: '24px' }} />
        </button>
      </div>

      {/* Menu desplegable en pantallas pequeñas */}
      {isOpen && (
        <div className="sm:hidden bg-sky-700 text-white shadow-lg p-4 absolute top-14 left-0 w-full z-50">
          <nav>
            <ul className="space-y-4">

              {/* Dashboard */}
              <li>
                <Link href="/admin" className="flex items-center gap-3 text-gray-300 hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faTachometerAlt} style={{ width: '20px', height: '20px' }} /> Dashboard
                </Link>
              </li>

              {/* Gestionar Inventario */}
              <li>
                <Link href="/admin/gestionar-inventario" className="flex items-center gap-3 text-gray-300 hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faWarehouse} style={{ width: '20px', height: '20px' }} /> Inventario
                </Link>
              </li>

              {/* Proveedores */}
              <li>
                <Link href="/admin/proveedores" className="flex items-center gap-3 text-gray-300 hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faHandHoldingUsd} style={{ width: '20px', height: '20px' }} /> Proveedores
                </Link>
              </li>

              {/* Ventas */}
              <li>
                <Link href="/admin/ventas" className="flex items-center gap-3 text-gray-300 hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faShoppingCart} style={{ width: '20px', height: '20px' }} /> Ventas
                </Link>
              </li>

              {/* Transporte */}
              <li>
                <Link href="/admin/transporte" className="flex items-center gap-3 text-gray-300 hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faTruck} style={{ width: '20px', height: '20px' }} /> Transporte
                </Link>
              </li>

              {/* Usuarios */}
              <li>
                <Link href="/admin/usuarios" className="flex items-center gap-3 text-gray-300 hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faUsers} style={{ width: '20px', height: '20px' }} /> Usuarios
                </Link>
              </li>

              {/* Página principal */}
              <li>
                <Link href="/" className="flex items-center gap-3 text-gray-300 hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faClipboardList} style={{ width: '20px', height: '20px' }} /> Página principal
                </Link>
              </li>

              {/* Cerrar Sesión */}
              <li>
                <button onClick={logout} className="flex items-center gap-3 text-gray-300 hover:text-white w-full text-left">
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '20px', height: '20px' }} /> Cerrar Sesión
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Sidebar para pantallas grandes y medianas */}
      <div className="hidden sm:flex flex-col fixed top-2 bottom-2 left-2 w-216 bg-sky-700 text-white shadow-lg rounded-xl">

        {/* Render ReactTooltip*/}
        <ReactTooltip id="tooltip" place="right" type="dark" effect="solid" />
        
        {/* Logo */}
        <div className="flex items-center justify-center h-16 py-1 px-2">
          <Link href="/admin" className="text-l font-bold">
            Admin
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          <div className="space-y-2 justify-items-center">

            {/* Dashboard */}
            <Link href="/admin" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300 ${isActive('/admin') ? 'bg-gray-100 text-gray-800' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faTachometerAlt} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Dashboard" className="focus:outline-none"/>
            </Link>


            {/* Inventory */}
            <Link href="/admin/gestionar-inventario" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/gestionar-inventario') ? 'bg-gray-100 text-gray-800' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faWarehouse} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Inventario" className="focus:outline-none"/>
            </Link>

            {/* Suppliers */}
            <Link href="/admin/proveedores" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/proveedores') ? 'bg-gray-100 text-gray-800' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faHandHoldingUsd} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Proveedores" className="focus:outline-none"/>
            </Link>

            {/* Orders */}
            <Link href="/admin/ventas" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/ventas') ? 'bg-gray-100 text-gray-800' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Ventas" className="focus:outline-none"/>
            </Link>

            {/* Transport */}
            <Link href="/admin/transporte" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/transporte') ? 'bg-gray-100 text-gray-800' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faTruck} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Transporte" className="focus:outline-none"/>
            </Link>

            {/* Users */}
            <Link href="/admin/usuarios" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/usuarios') ? 'bg-gray-100 text-gray-800' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faUsers} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Usuarios" className="focus:outline-none"/>
            </Link>

            {/* Página principal */}
            <Link href="/" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/') ? 'bg-gray-100 text-gray-800' : 'text-gray-300'}`}>
              <FontAwesomeIcon icon={faClipboardList} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Página principal" className="focus:outline-none"/>
            </Link>

            {/* Logout */}
            <button onClick={logout} className="flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300 text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Cerrar Sesión" className="focus:outline-none"/>
            </button>
          </div>
        </nav>

      </div>

    </div>

    );
};

export default AdminSidebar;
