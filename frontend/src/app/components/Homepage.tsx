"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { CreateNoteModal } from "./CreateNoteModal";
import NoteCard from "./NoteCard";
import useAuthStore from "@/store/authStore";
import { getNotes } from "../../../api/notes";
import { useRouter } from "next/navigation";



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Homepage = () => {
 const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes, 
    enabled: isAuthenticated,
  });

  const handleNoteClick = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">📝</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome to Notes App
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view and manage your notes
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Note</span>
          </motion.button>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading your notes...</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-6 text-center"
          >
            <p className="text-red-700 font-medium">Failed to load notes</p>
            <p className="text-red-600 text-sm mt-1">
              {error instanceof Error
                ? error.message
                : "Please check your connection and try again"}
            </p>
          </motion.div>
        )}

        {!isLoading && !error && notes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No notes yet
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start organizing your thoughts by creating your first note.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Note</span>
            </motion.button>
          </motion.div>
        )}

        {!isLoading && !error && notes.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                All Notes ({notes.length})
              </h2>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {notes.map((note) => (
                <NoteCard
                  key={note.note_id}
                  note={note}
                  onClick={handleNoteClick}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>

      <CreateNoteModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Homepage;
