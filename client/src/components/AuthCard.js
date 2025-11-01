// import React, { useState } from "react";
// import OAuthButtons from "./OAuthButtons";
// import { auth } from "../firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import axios from "axios";

// // inside handleSubmit
// if (activeTab === "signup") {
//   const userCredential = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   await updateProfile(userCredential.user, { displayName: username });

//   const newUser = {
//     firebaseUID: userCredential.user.uid,
//     email: userCredential.user.email,
//     username: username || userCredential.user.email.split("@")[0],
//     joinDate: new Date().toISOString(),
//   };

//   // save in backend MongoDB
//   await axios.post("http://localhost:5000/api/users", newUser);

//   onAuth(newUser);
// } else {
//   // login
//   const userCredential = await signInWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );

//   const user = {
//     firebaseUID: userCredential.user.uid,
//     email: userCredential.user.email,
//     username:
//       userCredential.user.displayName ||
//       userCredential.user.email.split("@")[0],
//     joinDate: new Date().toISOString(),
//   };

//   // fetch user from backend if exists
//   const res = await axios.get(
//     `http://localhost:5000/api/users/${user.firebaseUID}`
//   );
//   if (!res.data) {
//     await axios.post("http://localhost:5000/api/users", user);
//   }

//   onAuth(user);
// }

// export default function AuthCard({ onAuth }) {
//   const [activeTab, setActiveTab] = useState("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       if (activeTab === "signup") {
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         await updateProfile(userCredential.user, { displayName: username });
//         onAuth({
//           uid: userCredential.user.uid,
//           email: userCredential.user.email,
//           username: username || userCredential.user.email.split("@")[0],
//           joinDate: new Date().toISOString(),
//         });
//       } else {
//         // login
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         onAuth({
//           uid: userCredential.user.uid,
//           email: userCredential.user.email,
//           username:
//             userCredential.user.displayName ||
//             userCredential.user.email.split("@")[0],
//           joinDate: new Date().toISOString(), // This would ideally come from user's profile in Firestore
//         });
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error("Authentication error:", err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-['Pacifico'] text-white mb-2">
//             MoodTune
//           </h1>
//           <p className="text-blue-200">Smart Music Streaming with AI</p>
//         </div>

//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
//           <div className="flex rounded-full bg-white/10 p-1 mb-6">
//             <button
//               onClick={() => setActiveTab("login")}
//               className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
//                 activeTab === "login"
//                   ? "bg-white text-purple-900"
//                   : "text-white hover:text-purple-200"
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setActiveTab("signup")}
//               className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
//                 activeTab === "signup"
//                   ? "bg-white text-purple-900"
//                   : "text-white hover:text-purple-200"
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {activeTab === "signup" && (
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 />
//               </div>
//             )}

//             <div>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//             </div>

//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer"
//             >
//               {activeTab === "login" ? "Login" : "Create Account"}
//             </button>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-white/20"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-transparent text-white/60">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <OAuthButtons onAuth={onAuth} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// AuthCard.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { auth } from "../firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";

// export default function AuthCard({ onAuth }) {
//   const [activeTab, setActiveTab] = useState("login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       if (activeTab === "signup") {
//         // Firebase signup
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         await updateProfile(userCredential.user, { displayName: username });

//         const newUser = {
//           firebaseUID: userCredential.user.uid,
//           email: userCredential.user.email,
//           username: username || userCredential.user.email.split("@")[0],
//           joinDate: new Date().toISOString(),
//         };

//         // Save to backend
//         const res = await axios.post(
//           "http://localhost:5000/api/users",
//           newUser
//         );
//         onAuth(res.data);
//       } else {
//         // Firebase login
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );

//         const user = {
//           firebaseUID: userCredential.user.uid,
//           email: userCredential.user.email,
//           username:
//             userCredential.user.displayName ||
//             userCredential.user.email.split("@")[0],
//           joinDate: new Date().toISOString(),
//         };

//         // Fetch from backend
//         const res = await axios.get(
//           `http://localhost:5000/api/users/${user.firebaseUID}`
//         );

//         if (!res.data) {
//           const newRes = await axios.post(
//             "http://localhost:5000/api/users",
//             user
//           );
//           onAuth(newRes.data);
//         } else {
//           onAuth(res.data);
//         }
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error("Authentication error:", err);
//     }
//   };

//   const handleOAuth = async (providerName) => {
//     let provider;
//     if (providerName === "google") provider = new GoogleAuthProvider();
//     if (providerName === "spotify") {
//       // Just redirect to backend login route
//       window.location.href = "http://localhost:5000/spotify/login";
//     }

//     if (provider) {
//       try {
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;

//         const newUser = {
//           firebaseUID: user.uid,
//           email: user.email,
//           username: user.displayName || user.email.split("@")[0],
//           joinDate: new Date().toISOString(),
//         };

//         const res = await axios.post(
//           "http://localhost:5000/api/users",
//           newUser
//         );
//         onAuth(res.data);
//       } catch (err) {
//         console.error(err);
//         alert(`OAuth login failed: ${err.message}`);
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 to-blue-800">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-['Pacifico'] text-white mb-2">
//             MoodTune
//           </h1>
//           <p className="text-blue-200">Smart Music Streaming with AI</p>
//         </div>

//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
//           {/* Tabs */}
//           <div className="flex rounded-full bg-white/10 p-1 mb-6">
//             <button
//               onClick={() => setActiveTab("login")}
//               className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
//                 activeTab === "login"
//                   ? "bg-white text-purple-900"
//                   : "text-white hover:text-purple-200"
//               }`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setActiveTab("signup")}
//               className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
//                 activeTab === "signup"
//                   ? "bg-white text-purple-900"
//                   : "text-white hover:text-purple-200"
//               }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Error */}
//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {activeTab === "signup" && (
//               <input
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
//               />
//             )}

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             />

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all"
//             >
//               {activeTab === "login" ? "Login" : "Create Account"}
//             </button>
//           </form>

//           {/* OAuth */}
//           <div className="mt-6 space-y-3">
//             <button
//               onClick={() => handleOAuth("google")}
//               className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-lg transition-all"
//             >
//               <i className="ri-google-fill text-lg"></i> Continue with Google
//             </button>

//             <button
//               onClick={() =>
//                 (window.location.href = "http://localhost:5000/spotify/login")
//               }
//               className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all"
//             >
//               <i className="ri-spotify-fill text-lg"></i> Continue with Spotify
//             </button>
//             {/* <button

//             >
//               Continue with Spotify
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import API_CONFIG from "../config/api";

export default function AuthCard({ onAuth }) {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (activeTab === "signup") {
        // Firebase signup
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: username });

        const newUser = {
          firebaseUID: userCredential.user.uid,
          email: userCredential.user.email,
          username: username || userCredential.user.email.split("@")[0],
          joinDate: new Date().toISOString(),
        };

        // Save to backend
        const res = await axios.post(
          "${API_CONFIG.serverUrl}/api/users",
          newUser
        );
        onAuth(res.data);
      } else {
        // Firebase login
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = {
          firebaseUID: userCredential.user.uid,
          email: userCredential.user.email,
          username:
            userCredential.user.displayName ||
            userCredential.user.email.split("@")[0],
          joinDate: new Date().toISOString(),
        };

        // Fetch from backend
        const res = await axios.get(
          `${API_CONFIG.serverUrl}/api/users/${user.firebaseUID}`
        );

        if (!res.data) {
          const newRes = await axios.post(
            `${API_CONFIG.serverUrl}/api/users`,
            user
          );
          onAuth(newRes.data);
        } else {
          onAuth(res.data);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Authentication error:", err);
    }
  };

  const handleOAuth = async (providerName) => {
    let provider;
    if (providerName === "google") provider = new GoogleAuthProvider();
    if (providerName === "spotify") {
      // ✅ Redirect to backend Spotify login route
      window.location.href = `${API_CONFIG.serverUrl}/api/spotify/login`;
      return;
    }

    if (provider) {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        const newUser = {
          firebaseUID: user.uid,
          email: user.email,
          username: user.displayName || user.email.split("@")[0],
          joinDate: new Date().toISOString(),
        };

        const res = await axios.post(
          `${API_CONFIG.serverUrl}/api/users`,
          newUser
        );
        onAuth(res.data);
      } catch (err) {
        console.error(err);
        alert(`OAuth login failed: ${err.message}`);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 to-blue-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-['Pacifico'] text-white mb-2">
            MoodTune
          </h1>
          <p className="text-blue-200">Smart Music Streaming with AI</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          {/* Tabs */}
          <div className="flex rounded-full bg-white/10 p-1 mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-white text-purple-900"
                  : "text-white hover:text-purple-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === "signup"
                  ? "bg-white text-purple-900"
                  : "text-white hover:text-purple-200"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all"
            >
              {activeTab === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {/* OAuth */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => handleOAuth("google")}
              className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-lg transition-all"
            >
              <i className="ri-google-fill text-lg"></i> Continue with Google
            </button>

            <button
              onClick={() => handleOAuth("spotify")}
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all"
            >
              <i className="ri-spotify-fill text-lg"></i> Continue with Spotify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
