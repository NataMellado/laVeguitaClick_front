import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faBoxOpen, faHandshake, faStore, faTruck, faDollar, faSignOutAlt, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserContext";
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
        <Link href="/admin" className="text-lg font-semisemibold">Admin</Link>
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
                <Link href="/admin" className="flex items-center gap-3  hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faGauge} style={{ width: '20px', height: '20px' }} /> Dashboard
                </Link>
              </li>

              {/* Productos */}
              <li>
                <Link href="/admin/productos" className="flex items-center gap-3  hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faBoxOpen} style={{ width: '20px', height: '20px' }} /> Productos
                </Link>
              </li>

              {/* Proveedores */}
              <li>
                <Link href="/admin/proveedores" className="flex items-center gap-3  hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faHandshake} style={{ width: '20px', height: '20px' }} /> Proveedores
                </Link>
              </li>

              {/* Ventas */}
              <li>
                <Link href="/admin/ventas" className="flex items-center gap-3  hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faDollar} style={{ width: '20px', height: '20px' }} /> Ventas
                </Link>
              </li>

              {/* vehiculos */}
              <li>
                <Link href="/admin/vehiculos" className="flex items-center gap-3  hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faTruck} style={{ width: '20px', height: '20px' }} /> vehiculos
                </Link>
              </li>

              {/* Conductores */}
              <li>
                <Link href="/admin/conductores" className="flex items-center gap-3  hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faUsers} style={{ width: '20px', height: '20px' }} /> Conductores
                </Link>
              </li>

              {/* Tienda */}
              <li>
                <Link href="/" className="flex items-center gap-3  hover:text-white" onClick={closeSidebar}>
                  <FontAwesomeIcon icon={faStore} style={{ width: '20px', height: '20px' }} /> Tienda
                </Link>
              </li>

              {/* Cerrar Sesión */}
              <li>
                <button onClick={logout} className="flex items-center gap-3  hover:text-white w-full text-left">
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '20px', height: '20px' }} /> Cerrar Sesión
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Sidebar para pantallas grandes y medianas */}
      <div className="hidden sm:flex flex-col fixed top-2 bottom-2 left-2 w-216 bg-sky-700 text-white shadow-lg rounded-xl z-[10]" >

        {/* Render ReactTooltip*/}
        <ReactTooltip id="tooltip" place="right" type="dark" effect="solid"/>
        
        {/* Logo */}
        <div className="flex items-center justify-center h-16 py-1 px-2">
          <Link href="/admin" className="text-l font-semibold">
            Admin
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          <div className="space-y-2 justify-items-center">

            {/* Dashboard */}
            <Link href="/admin" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300 ${isActive('/admin') ? 'bg-white text-gray-800' : ''}`}>
              <FontAwesomeIcon icon={faGauge} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Dashboard" className="focus:outline-none"/>
            </Link>


            {/* Inventory */}
            <Link href="/admin/productos" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/productos') ? 'bg-white text-gray-800' : ''}`}>
              <FontAwesomeIcon icon={faBoxOpen} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Productos" className="focus:outline-none"/>
            </Link>

            {/* Suppliers */}
            <Link href="/admin/proveedores" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/proveedores') ? 'bg-white text-gray-800' : ''}`}>
              <FontAwesomeIcon icon={faHandshake} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Proveedores" className="focus:outline-none"/>
            </Link>

            {/* Orders */}
            <Link href="/admin/ventas" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/ventas') ? 'bg-white text-gray-800' : ''}`}>
              <FontAwesomeIcon icon={faDollar} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Ventas" className="focus:outline-none"/>
            </Link>

            {/* Transport */}
            <Link href="/admin/vehiculos" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/vehiculos') ? 'bg-white text-gray-800' : ''}`}>
              <FontAwesomeIcon icon={faTruck} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Vehículos" className="focus:outline-none"/>
            </Link>

            {/* Users */}
            <Link href="/admin/conductores" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/admin/conductores') ? 'bg-white text-gray-800' : ''}`}>
              <FontAwesomeIcon icon={faUsers} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Conductores" className="focus:outline-none"/>
            </Link>

            {/* Tienda */}
            <Link href="/" className={`flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  ${isActive('/') ? 'bg-white text-gray-800' : ''}`}>
              <FontAwesomeIcon icon={faStore} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Tienda" className="focus:outline-none"/>
            </Link>

            {/* Logout */}
            <button onClick={logout} className="flex ps-3 w-full rounded-l-[1rem] ms-6 py-2 transition-colors duration-300  hover:text-white">
              <FontAwesomeIcon icon={faSignOutAlt} style={{ width: '20px', height: '20px' }} data-tooltip-id="tooltip" data-tooltip-content="Cerrar Sesión" className="focus:outline-none"/>
            </button>
          </div>
        </nav>

      </div>

    </div>

    );
};

export default AdminSidebar;
