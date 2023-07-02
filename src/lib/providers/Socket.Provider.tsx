'use client';

import React, { ReactNode, useState, useEffect, createContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

interface Props {
  children: ReactNode;
}

export const SocketContext = createContext<Socket | null>(null);

const Providers = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    data: session
  }: {
    data: any;
  } = useSession();
  function onDisconnect() {
    console.log('user socket disconnected');
  }

  function onConnect() {
    console.log('user socket connected');
  }
  useEffect(() => {
    if (!socket && session) {
      setSocket(
        io(process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:8000', {
          auth: {
            token: session?.user?.user?.token
          }
        })
      );
    }
    if (socket && !socket.connected) {
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
      };
    }
  }, [session, socket]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default Providers;
