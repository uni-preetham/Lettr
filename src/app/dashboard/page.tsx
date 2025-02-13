"use client";

import { useEffect, useState } from "react";
import { db, auth, collection, getDocs, signOut } from "@/app/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface Letter {
  id: string; // Use string for Firestore document IDs
  title: string;
  content: string;
  createdAt: string;
}

const Dashboard = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // For navigation

  // Fetch all letters
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "letters"));
        const lettersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          createdAt: new Date(doc.data().createdAt.seconds * 1000).toLocaleString(),
        }));
        setLetters(lettersData);
      } catch (error) {
        console.error("Error fetching letters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, []);


  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

if (loading) return (
  <div className="container flex justify-center items-center h-screen mx-auto">
    <div className="loading-text">
      Loading<span className="dot-animation">.</span><span className="dot-animation">.</span><span className="dot-animation">.</span>
    </div>
  </div>
);


  return (
    <div className="container mx-auto flex flex-col items-center">
      {/* Logout */}
      <div className="w-[90%] bg-gray-100 rounded-full px-5 py-2 my-2 mx-5 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold  px-5 py-2">Lettr.</Link>
        <div className="md:hidden relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="underline text-black">
          <FontAwesomeIcon icon={faBars} className=" px-5 py-2"/>
          </button>
          {menuOpen && (
            <div className="absolute w-[200px] right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
              <Link href="/addLetter" className="block px-5 py-2 hover:bg-gray-200">Add Letter</Link>
              <button onClick={handleLogout} className="block px-5 py-2 text-left hover:bg-gray-200">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Regular Menu for medium and large screens */}
        <div className="hidden md:flex gap-4">
          <Link href="/addLetter" className="underline text-black pe-5">Add Letter</Link>
          <button onClick={handleLogout} className="underline text-black pe-5">Logout</button>
        </div>
      </div>

      {/* Display All Letters */}
        <h2 className="text-lg font-bold my-5 ">All Letters</h2>
      {/* <div className="max-w mb-5 flex justify-start items-center gap-[20px] flex-wrap mx-auto"> */}
      <div className="max-w mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mx-auto">
        {letters.length > 0 ? (
          letters.map((letter) => (
            <div key={letter.id} className="p-4 bg-white rounded-xl shadow-md min-w-[250px] w-[300px] h-[300px] relative" >
              <h3 className="text-lg font-semibold">{letter.title}</h3>
              <p className="text-gray-700">{letter.content}</p>
              <p className="text-sm text-gray-500 absolute bottom-5">Created At: {letter.createdAt}</p>
            </div>
          ))
        ) : (
          <p>No letters found.</p>
        )}
      </div>

      
    </div>
  );
};

export default Dashboard;
