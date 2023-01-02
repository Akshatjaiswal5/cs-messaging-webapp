import { useEffect, useState } from "react";
import { sendMessage, getAllMessagesById } from "../utils/chat";
import { loginWithUser } from "../utils/user";
import io from "socket.io-client";
import Login from "./Login";

//var API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

var API_URL = "http://127.0.0.1:5000";
var socket;

const UserChat = (props) => {
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  useEffect(() => {
    getMessages();
    socketIO();
  }, []);

  async function socketIO() {
    socket = io(API_URL);
    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });

    socket.emit("join_chat", props.user);

    socket.on("new_message", (message) => {
      console.log("you've got mail");
      setReceivedMessage(message);
    });
  }

  useEffect(() => {
    setMessages([...messages, receivedMessage]);
  }, [receivedMessage]);

  async function getMessages() {
    const chat = await loginWithUser(props.user);
    setChatId(chat.id);
    var messageArray = await getAllMessagesById(parseInt(chat.id));
    setMessages(messageArray);
  }

  return (
    <div className="userchat">
      <div className="userchat-title">
        <div>Support</div>
        <div>
          <button
            onClick={() => {
              props.setUser("");
              props.setUserType("");
              window.sessionStorage.setItem("id", "");
              window.sessionStorage.setItem("userType", "");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="messages">
        {messages &&
          messages.slice(0).map((m) => {
            return (
              <div
                key={Math.random()}
                className={
                  `message-bubble ` +
                  (m.senderType == "agent" ? "agent-msg" : "user-msg")
                }
              >
                {m.senderType == "agent" ? "Support: " : "You: "}
                {m.message}
              </div>
            );
          })}
      </div>

      <div className="chat-panel">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
        />
        <button
          onClick={() => {
            sendMessage(props.userType, props.user, chatId, newMessage);
            setNewMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
