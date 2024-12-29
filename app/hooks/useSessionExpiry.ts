"use client";  // Marking this file as a client-side file

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Custom hook to track session expiration and display a modal
const useSessionExpiryModal = () => {
  const { data: session, status } = useSession();
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      
      if (status === "authenticated" && session?.expires) {
  
        const expiresAt = new Date(session.expires).getTime();
        const currentTime = new Date().getTime();
        const timeout = expiresAt - currentTime -3600000; // Show modal 1 minute before expiration
  
        if (timeout > 0) {
          const timer = setTimeout(() => {
            setShowSessionExpired(true);
          }, timeout);
  
          return () => clearTimeout(timer); // Cleanup timer on component unmount
        } else {
          // If already expired, show the modal immediately
          setShowSessionExpired(true);
        }
      }
  
      // If the session is unauthenticated, hide the modal
      if (status === "unauthenticated") {
        setShowSessionExpired(false);
      }
    }, 180000);
  }, []);

  return { showSessionExpired, setShowSessionExpired };
};

export default useSessionExpiryModal;
