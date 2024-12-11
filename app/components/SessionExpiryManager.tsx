"use client";  // Marking this file as a client-side file

import React from "react";
import { signOut } from "next-auth/react";  // Import the signOut function from NextAuth
import useSessionExpiryModal from "@/app/hooks/useSessionExpiry"; // Import the custom hook
import Modal from "@/app/components/Modal"; // Import the Modal component

// This component handles the session expiry logic and shows the modal
const SessionExpiryManager = () => {
  const { showSessionExpired, setShowSessionExpired } = useSessionExpiryModal();

  const handleClose = async () => {
    // Perform the logout operation and close the modal
    await signOut({ 
      redirect: true,  // This will redirect after sign out
      callbackUrl: '/'  // Redirect to home page
    });
    setShowSessionExpired(false); // Close the modal immediately after logout
  };

  return (
    <>
      {showSessionExpired && (
        <Modal title="Session Expired" onClose={handleClose}>
          Your session has expired. Please log in again.
        </Modal>
      )}
    </>
  );
};

export default SessionExpiryManager;
