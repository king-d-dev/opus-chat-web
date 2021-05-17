import { useEffect } from 'react';
import Chat from '../components/chat';
import UserList from '../components/user-list';
import { socket } from '../lib/socket';

export default function ChatPage() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat-page">
      <UserList />
      <Chat />
    </div>
  );
}
