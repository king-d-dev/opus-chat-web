import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { socket } from "../lib/socket";
import { Message, SocketEvent, User } from "../types";

export default function UserList() {
  const auth0 = useAuth0();
  const users = useTypedSelector(({ users }) => users.all);
  const { setUser, setUsers, removeUser, setCurrentChat, setMessages, addMessage } = useActions();

  useEffect(() => {
    socket.on(SocketEvent.USERS, (users) => {
      setUsers(users);
    });

    socket.on(SocketEvent.USER_CONNECTED, (user: User) => {
      if (user.email !== auth0.user!.email) setUser(user);
    });

    socket.on(SocketEvent.USER_DISCONNECTED, (email: User["email"]) => {
      removeUser(email);
    });

    socket.on(SocketEvent.MESSAGE, (message: Message) => {
      addMessage({ message, otherUser: message.from });
    });

    socket.on(SocketEvent.MESSAGES, (messageMap: { [key: string]: Message[] }) => {
      setMessages(messageMap);
    });

    return () => {
      socket.off(SocketEvent.USERS);
      socket.off(SocketEvent.USER_CONNECTED);
      socket.off(SocketEvent.USER_DISCONNECTED);
      socket.off(SocketEvent.MESSAGE);
      socket.off(SocketEvent.MESSAGES);
    };
  }, [setUser, setUsers, removeUser, auth0.user!.email, setMessages, addMessage]);

  return (
    <div className="users-list">
      <div className="user-info">
        <i className="fas fa-user user-info__icon" />
        <p className="user-info__email">{auth0.user!.email}</p>
      </div>
      <ul>
        {Object.values(users).map((user) => (
          <li className="users-list__item" key={user.email} onClick={() => setCurrentChat(user.email)}>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
