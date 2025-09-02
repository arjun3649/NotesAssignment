"use client";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const NoteCard = ({ note, onClick }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(note.note_id)}
    className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer"
  >
    {/* Title */}
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {note.note_title}
      </h3>
    </div>

    {/* Content Preview */}
    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
      {note.note_content}
    </p>

    {/* Date */}
    <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg w-fit">
      <Calendar className="w-3 h-3 mr-1 text-gray-400" />
      {formatDate(note.last_update)}
    </div>
  </motion.div>
);

export default NoteCard;
