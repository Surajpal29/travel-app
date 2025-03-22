import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/dialogflow-webhook",
        {
          query: input,
        }
      );
      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "bot",
        text: "Oops! Something went wrong.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="w-80 fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl flex flex-col">
      <div className="bg-blue-600 text-white p-3 rounded-t-2xl text-center font-bold">
        Travel Chatbot
      </div>
      <div className="flex-1 p-3 overflow-y-auto h-64">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}>
            <span
              className={`inline-block p-2 rounded-xl ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex p-3 gap-2">
        <input
          type="text"
          className="border flex-1 rounded-xl px-2"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-2 text-white rounded-xl">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
