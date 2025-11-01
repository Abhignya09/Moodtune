// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import UserGreeting from "./UserGreeting";
// import AnalyticsPreview from "./AnalyticsPreview";
// import StartMusicExperienceButton from "./StartMusicExperienceButton";

// export default function Dashboard({ user, onLogout }) {
//   const [showMusicPlayer, setShowMusicPlayer] = useState(false);

//   const handleStartMusic = () => {
//     setShowMusicPlayer(true);
//   };

//   if (showMusicPlayer) {
//     return (
//       // <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
//       //   <div className="text-center text-white">
//       //     <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
//       //       <i className="ri-music-2-fill text-4xl"></i>
//       //     </div>
//       //     <h2 className="text-2xl font-bold mb-2">Music Player Loading...</h2>
//       //     <p className="text-blue-200">
//       //       Getting your personalized experience ready
//       //     </p>
//       //   </div>
//       // </div>

//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//       <Navbar user={user} onLogout={onLogout} />

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <UserGreeting user={user} />
//         <AnalyticsPreview />
//         <StartMusicExperienceButton onStart={handleStartMusic} />
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import UserGreeting from "./UserGreeting";
// import AnalyticsPreview from "./AnalyticsPreview";
// import StartMusicExperienceButton from "./StartMusicExperienceButton";

// export default function Dashboard({ user, onLogout }) {
//   const [showMusicPlayer, setShowMusicPlayer] = useState(false);
//   const navigate = useNavigate();

//   const handleStartMusic = () => {
//     setShowMusicPlayer(true);
//   };

//   if (showMusicPlayer) {
//     // Instead of commented UI, redirect to PlayerPage
//     // return <div>🎶 Redirecting to music player...</div>;
//     navigate("/player");
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
//       <Navbar user={user} onLogout={onLogout} />

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <UserGreeting user={user} spotifyUser={spotifyUser} />

//         <AnalyticsPreview />
//         <StartMusicExperienceButton onStart={handleStartMusic} />
//       </div>
//     </div>
//   );
// }
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const handleStartMusic = () => {
//     navigate("/player"); // 👈 redirect to Player.js
//   };

//   return (
//     <div>

//       {/* keep all your existing Dashboard UI here */}
//       <button onClick={handleStartMusic}>Start Music Experience</button>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import UserGreeting from "./UserGreeting";
// import AnalyticsPreview from "./AnalyticsPreview";
import StartMusicExperienceButton from "./StartMusicExperienceButton";
import API_CONFIG from "../config/api";
export default function Dashboard({ user, onLogout, spotifyTokens }) {
  const [spotifyUser, setSpotifyUser] = useState(null);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [showMoodPopup, setShowMoodPopup] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch Spotify profile from backend
  useEffect(() => {
    async function fetchSpotifyProfile(token) {
      if (!token) return;
      try {
        const response = await fetch(`${API_CONFIG.serverUrl}/api/spotify/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`Spotify API error: ${response.status}`);
        }

        const data = await response.json();
        setSpotifyUser(data); // ✅ save profile
      } catch (err) {
        console.error("Error fetching Spotify profile:", err);
      }
    }

    fetchSpotifyProfile(spotifyTokens?.accessToken);
  }, [spotifyTokens]);

  const handleStartMusic = () => {
    setShowMusicPlayer(true);
  };

  if (showMusicPlayer) {
    navigate("/player");
  }
  const handleMoodOk = () => {
    setShowMoodPopup(false);
    navigate("/MoodDetection");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {showMoodPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8 rounded-2xl shadow-lg text-white max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Mood Detection</h2>
            <p className="mb-6">Want songs that fit your vibe...</p>
            <div className="flex justify-center gap-4">
              {/* ✅ OK Button → Green */}
              <button
                onClick={() => {
                  setShowMoodPopup(false);
                  navigate("/MoodDetection");
                }}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full font-semibold transition-all duration-300"
              >
                OK
              </button>

              {/* Cancel Button → just closes popup */}
              <button
                onClick={() => setShowMoodPopup(false)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-full font-semibold transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Navbar user={user} onLogout={onLogout} spotifyUser={spotifyUser} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <UserGreeting user={user} spotifyUser={spotifyUser} />
        {/* <AnalyticsPreview /> */}
        <StartMusicExperienceButton onStart={handleStartMusic} />
      </div>
    </div>
  );
}
