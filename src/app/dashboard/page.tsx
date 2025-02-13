"use client";

import { useEffect, useState } from "react";
import { db, auth, collection, addDoc, getDocs, signOut } from "@/app/firebase";
import { useRouter } from "next/navigation";

interface Letter {
  id: string; // Use string for Firestore document IDs
  title: string;
  content: string;
  createdAt: string;
}

const Dashboard = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

  // Add a new letter
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
      window.location.reload(); // Refresh to show updated list
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto flex flex-col items-center">
      {/* Logout */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Display All Letters */}
        <h2 className="text-lg font-bold my-5 ">All Letters</h2>
      <div className="max-w mb-5 flex items-center gap-[20px] flex-wrap">
        {letters.length > 0 ? (
          letters.map((letter) => (
            <div key={letter.id} className="p-4 bg-white rounded-xl shadow-md min-w-[250px] h-[300px] relative" >
              <h3 className="text-lg font-semibold">{letter.title}</h3>
              <p className="text-gray-700">{letter.content}</p>
              <p className="text-sm text-gray-500 absolute bottom-5">Created At: {letter.createdAt}</p>
            </div>
          ))
        ) : (
          <p>No letters found.</p>
        )}
      </div>

      {/* Add Letter Form */}
      <form onSubmit={handleAddLetter} className="max-w-md p-6 bg-white rounded-xl shadow-md">
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Add Letter
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
