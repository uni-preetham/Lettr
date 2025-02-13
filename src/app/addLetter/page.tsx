"use client";

import { addDoc, db, collection, signOut, auth } from "@/app/firebase";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const AddLetter = () =>{

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter(); // For navigation
  
const handleAddLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newLetter = {
        title,
        content,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "letters"), newLetter);
      alert("Letter added successfully!");
      setTitle("");
      setContent("");
    //   window.location.reload(); // Refresh to show updated list
      router.push("/dashboard");
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error adding letter.");
    }
  };

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

  return (
    <>
     <div className="container mx-auto flex flex-col items-center h-screen">
      <div className="w-[90%] bg-gray-100 rounded-full px-5 py-2 my-2 mx-5 flex justify-between items-center">
        <Link href="dashboard" className="text-2xl font-bold  px-5 py-2">Lettr.</Link>
        
        <div className="md:hidden relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="underline text-black">
          <FontAwesomeIcon icon={faBars} className=" px-5 py-2"/>
          </button>
          {menuOpen && (
            <div className="absolute w-[200px] right-0 mt-2 bg-white border rounded-md shadow-lg z-10">
              <Link href="/dashboard" className="block px-5 py-2 hover:bg-gray-200">All Letters</Link>
              <button onClick={handleLogout} className="block px-5 py-2 text-left hover:bg-gray-200">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Regular Menu for medium and large screens */}
        <div className="hidden md:flex gap-4">
          <Link href="/dashboard" className="underline text-black pe-5">All Letters</Link>
          <button onClick={handleLogout} className="underline text-black pe-5">Logout</button>
        </div>
      </div>
       
    {/* Add Letter Form */}
    <form onSubmit={handleAddLetter} className="flex flex-col items-center md:w-full max-w-md p-6 mt-[7em] md:mt-[8em] bg-white rounded-xl shadow-md mx-2">
    <h2 className="text-lg font-bold mb-4">Add a Letter</h2>
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="w-full p-2 border rounded-md mb-3"
      required
    />
    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full p-2 border rounded-md mb-3"
      required
    ></textarea>
    <button type="submit" className="bg-blue-200 px-5 py-2 w-[50%] rounded-3xl mx-auto">
      Add Letter
    </button>
  </form>
  </div>
  </>
  )
}

export default AddLetter