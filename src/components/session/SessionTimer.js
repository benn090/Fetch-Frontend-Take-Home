import React, { useEffect } from 'react';

const SessionTimer = ({ sessionTimeout, onSessionExpired }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSessionExpired();
    }, sessionTimeout);

    return () => clearTimeout(timeoutId);
  }, [sessionTimeout, onSessionExpired]);

  return null;
};

export default SessionTimer;