"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { createNote } from "../../../api/notes";


export interface Note {
  note_id: string;
  user_id: string;
  note_title: string;
  note_content: string | null;
  last_update: string;
  created_on: string;
}

type CreateNoteInput = {
  note_title: string;
  note_content: string | null;
};

interface CreateNoteModalProps {
  show: boolean;
  onClose: () => void;
}

export const CreateNoteModal: React.FC<CreateNoteModalProps> = ({
  show,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createMutation = useMutation<Note, Error, CreateNoteInput>({
    mutationFn: createNote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setTitle("");
      setContent("");
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createMutation.mutate({
      note_title: title.trim(),
      note_content: content.trim() === "" ? null : content.trim(),
    });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [show, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          width: "400px",
          maxWidth: "90vw",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "16px",
            margin: "0 0 16px 0",
          }}
        >
          Create New Note
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            required
            autoFocus
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              marginBottom: "12px",
              fontSize: "14px",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content (optional)..."
            rows={5}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              marginBottom: "16px",
              fontSize: "14px",
              resize: "none",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />

          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={createMutation.isPending}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f3f4f6",
                color: "#374151",
                border: "none",
                borderRadius: "4px",
                cursor: createMutation.isPending ? "not-allowed" : "pointer",
                opacity: createMutation.isPending ? 0.5 : 1,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || !title.trim()}
              style={{
                padding: "8px 16px",
                backgroundColor:
                  createMutation.isPending || !title.trim()
                    ? "#9ca3af"
                    : "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor:
                  createMutation.isPending || !title.trim()
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {createMutation.isPending ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>

        {createMutation.isError && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "4px",
            }}
          >
            <p style={{ color: "#dc2626", fontSize: "14px", margin: 0 }}>
              {createMutation.error?.message ||
                "Failed to create note. Please try again."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNoteModal;
