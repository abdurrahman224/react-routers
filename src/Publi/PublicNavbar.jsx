import React from "react";
import { Link, Navigate } from "react-router-dom";

const PublicNavbar = () => {
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>

      <li>
     
        <Link to="/hero">Item 1</Link>
      </li>

      <li>
        <Link to="/item">Item 2</Link>
      </li>
      <li>
      
        <Link to="/items">Item 3</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>

            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link to="/">
          <a className="btn btn-ghost text-xl">React App</a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/login">
          <a className="btn">Login</a>
        </Link>
      </div>
    </div>
  );
};

export default PublicNavbar;





// import React from "react";
// import { Link, Navigate } from "react-router-dom";

// const PublicNavbar = () => {
//   return (
//     <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {" "}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />{" "}
//             </svg>
//           </div>
//           <ul
//             tabIndex="-1"
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//           >
//             <li>
//               <a>Item 1</a>
//             </li>

//             <li>
//               <a>Item 3</a>
//             </li>
//           </ul>
//         </div>
//         <Link to="/">
//           <a className="btn btn-ghost text-xl">React App</a>
//         </Link>
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">


//           <Link to="/">
//          <li>
//               <a>Home</a>
//             </li>
//           </Link>

//           <Link to="/hero">
//             <li>
//               <a>Item 1</a>
//             </li>
//           </Link>

//           <li>
//             <Link to="/item">
//               <a>Item 2</a>
//             </Link>
//           </li>
//           <Link to="/items">
//             <li>
//               <a>Item 3</a>
//             </li>
//           </Link>
//         </ul>
//       </div>
//       <div className="navbar-end">
//         <Link to="/login">
//           <a className="btn">Login</a>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PublicNavbar;
