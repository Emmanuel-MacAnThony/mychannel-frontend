import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

const MessageInterface = () => {
  const [newMessage, setNewMessage] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { serverId, channelId } = useParams();
  const SOCKET_URL = channelId
    ? `ws://127.0.0.1:8000/${serverId}/${channelId}`
    : null;

  const { sendJsonMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => {
      console.log("Connected");
    },

    onClose: () => {
      console.log("Closed");
    },

    onMessage: (msg) => {
      console.log(msg, newMessage);
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
    },

    onError: () => {
      console.log("Error");
    },
  });

  const send = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sendJsonMessage({ type: "message", message: inputValue });
    setInputValue("");
  };
  return (
    <div>
      {newMessage.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg}</p>
          </div>
        );
      })}
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "15px",
              alignItems: "center",
              padding: 24,
            }}
          >
            <label>Enter Message:</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginLeft: 15 }}
            />
          </div>
          <button
            style={{ width: "120px", cursor: "pointer", marginLeft: 24 }}
            onClick={send}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInterface;
