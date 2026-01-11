import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";


const ADMIN_CREDENTIALS = {
  email: "admin12345@gmail.com",
  password: "123456",
  name: "Admin",
  role: "ADMIN",
};
const ensureAdminUser = () => {
  try {
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];
    if (!users.some((u) => u.email === ADMIN_CREDENTIALS.email)) {
      users.push(ADMIN_CREDENTIALS);
      localStorage.setItem("users", JSON.stringify(users));
    }
  } catch (e) {
    console.warn("Failed to persist admin user", e);
  }
};

const loginUser = (email, password) => {
 
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    ensureAdminUser();
    return ADMIN_CREDENTIALS;
  }
  try {
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];
    const user = users.find((u) => u.email === email);

    if (!user) return { error: "User not found. Please register first." };
    if (user.password !== password) return { error: "Invalid password" };

    return {
      email: user.email,
      name: user.name,
      role: user.role?.toUpperCase() || "USER",
    };
  } catch (e) {
    console.warn("Login error", e);
    return { error: "Login failed" };
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const result = loginUser(email, password);

    if (result.error) {
      setError(result.error);
      return;
    }

    dispatch(login(result));
    if (result.role === "ADMIN") navigate("/admin/dashboard", { replace: true });
    else navigate("/dashboard", { replace: true });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col">
        <div className="card bg-base-100 w-full shrink-0 shadow-2xl max-w-4xl mx-auto">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <Link to="/">
                <h2>Go Home</h2>
              </Link>
              <Link to="/register" className="link">
                Register
              </Link>
            </div>

            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input"
                placeholder="Password"
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <button onClick={handleLogin} className="btn btn-neutral mt-4">
                Login
              </button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../features/auth/authSlice";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const adminEmail = "admin12345@gmail.com";
//     const adminPassword = "123456";

//     if (email === adminEmail && password === adminPassword) {
//       const adminUser = { email: adminEmail, name: "Admin", role: "ADMIN" };

//       try {
//         const raw = localStorage.getItem("users");
//         const users = raw ? JSON.parse(raw) : [];
//         const idx = users.findIndex((u) => u.email === adminEmail);
//         if (idx === -1) {
//           users.push({
//             name: "Admin",
//             email: adminEmail,
//             password: adminPassword,
//             role: "ADMIN",
//           });
//           localStorage.setItem("users", JSON.stringify(users));
//         }
//       } catch (e) {
//         console.warn("Failed to persist admin user", e);
//       }
//       dispatch(login(adminUser));
//       navigate("/admin/dashboard", { replace: true });
//       return;
//     }

//     try {
//       const raw = localStorage.getItem("users");
//       const users = raw ? JSON.parse(raw) : [];
//       const found = users.find((u) => u.email === email);
//       if (!found) {
//         alert("User not found. Please register first.");
//         return;
//       }
//       if (found.password !== password) {
//         alert("Invalid password");
//         return;
//       }
//       const user = {
//         email: found.email,
//         name: found.name,
//         role: found.role?.toUpperCase() || "USER",
//       };
//       dispatch(login(user));
//       if (user.role === "ADMIN")
//         navigate("/admin/dashboard", { replace: true });
//       else navigate("/dashboard", { replace: true });
//     } catch (e) {
//       console.warn("Login error", e);
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="hero  min-h-screen ">
//       <div className="hero-content flex-col  ">
     
//         <div className="card bg-base-100 w-full  shrink-0 shadow-2xl  max-w-4xl mx-auto">
//           <div className="card-body ">
//             <div className="flex justify-between items-center">
//               <Link to="/">
//                 <h2>Go Home</h2>
//               </Link>
//               <Link to="/register" className="link">
//                 Register
//               </Link>
//             </div>

//             <fieldset className="fieldset">
//               <label className="label">Email</label>
//               <input
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 type="email"
//                 className="input"
//                 placeholder="Email"
//               />
//               <label className="label">Password</label>
//               <input
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 type="password"
//                 className="input"
//                 placeholder="Password"
//               />
//               <button onClick={handleLogin} className="btn btn-neutral mt-4">
//                 Login
//               </button>
//             </fieldset>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
