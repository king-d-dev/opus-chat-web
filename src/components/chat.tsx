import React from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { useForm } from "react-hook-form";
import { socket } from "../lib/socket";
import { SocketEvent } from "../types";
import { useActions } from "../hooks/use-actions";
import { useAuth0 } from "@auth0/auth0-react";
import { nanoid } from "nanoid";
import classnames from "classnames";

type FormData = { text: string };

export default function Chat() {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const { addMessage } = useActions();
  const { user } = useAuth0();

  const currentChat = useTypedSelector(({ users }) => users.currentChat);

  const messages = useTypedSelector(({ messages, users }) => {
    if (!users.currentChat) return null;

    return messages.all[users.currentChat] || [];
  });

  function onSubmit(data: FormData) {
    const text = data.text.trim();
    if (!text) return;

    socket.emit(SocketEvent.MESSAGE, { text, to: currentChat });
    addMessage({
      message: {
        text,
        from: user!.email,
        to: currentChat as string,
        id: nanoid(),
      },
      otherUser: currentChat as string,
    });

    setValue("text", "");
  }

  function renderBlockButton() {
    return <button className="opus-button opus-button--small opus-button--red">Block User</button>;
  }

  if (!currentChat || !messages) return null;

  return (
    <div className="chat">
      <div className="chat__recipient">
        <p className="chat__recipient__email">{currentChat}</p>
        {renderBlockButton()}
      </div>
      <ul className="chat__messages">
        {messages.map((message) => (
          <li
            key={message.id}
            className={classnames("chat__messages__message", {
              "chat__messages__message--mine": message.from === user.email,
            })}
          >
            {message.text}
          </li>
        ))}
      </ul>

      <form className="chat__form" onSubmit={handleSubmit(onSubmit)}>
        <input className="chat__form__input" type="text" ref={register} name="text" placeholder="Type a message" />
      </form>
    </div>
  );
}
