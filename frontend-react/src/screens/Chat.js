import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import "./Chat.css";

const socket = io("http://localhost:3000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const chatInputRef = useRef(null);
  const [recipient, setRecipient] = useState(null);
  const [room, setRoom] = useState(null);
  const { users } = useSelector((state) => state.userList);
  const name = useSelector((state) => state.userLogin.userInfo.user.name);
  useEffect(() => {
    socket.emit("online", name, users);
    socket.on("roomCreated", (room) => {
      setRoom(room);
    });
    socket.on("message", (message) => {
      setMessages(message);
    });
    return () => {
      socket.off("userList");
      socket.off("message");
    };
  }, [name]);
  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = chatInputRef.current.value;
    socket.emit("sendMessage", room, message);
    chatInputRef.current.value = "";
  };

  const handleUserClick = (user) => {
    socket.emit("createRoom", user._id);
    setRecipient(user);
  };

  return (
    <div className="chat-container">
      <div className="user-list-container">
        <h2>Users:</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user._id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="message-list-container">
        <h2>{recipient && recipient.name}</h2>
        <ul className="message-list">
          {messages && messages.map((message, index) => (
            <li key={index}>
              <p>
                {message.message}
              </p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            ref={chatInputRef}
            className="chat-input"
            placeholder="Type a message..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
