import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
}

const Portal: React.FC<PortalProps> = ({ children, show = false, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
 if (!mounted || !show || typeof window === "undefined") {
       return null;
     }


  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md animate-scale-in">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Portal;
