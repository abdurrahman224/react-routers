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
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
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
    if (result.role === "ADMIN")
      navigate("/admin/dashboard", { replace: true });
    else navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-100 sm:rounded-2xl sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md py-6">
            <div className="flex justify-between items-center px-4 sm:px-0">
              <Link
                to="/"
                className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center gap-1"
              >
                <span>←</span> Home
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Create an account
              </Link>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <div>
              <button
                onClick={handleLogin}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
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
