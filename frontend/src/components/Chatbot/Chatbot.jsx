import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { X, MessageCircle } from "lucide-react"; // Optional icons, ya Bootstrap ke icon use kr sakta hai
import { BASE_URL } from "../../utils/config";
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

 const handleSend = () => {
   if (!input.trim()) return;

   // Pehle user ka message show karo
   const userMsg = { sender: "user", text: input };
   setMessages((prev) => [...prev, userMsg]);
   setInput("");

   // Ab thoda wait karke response bhejo aur show karo
   (async () => {
     try {
       const response = await axios.post(`${BASE_URL}/api/dialogflow-webhook`, {
         query: input,
       });

       // Ab response ko thoda delay se dikhate hain
       setTimeout(() => {
         const botMsg = { sender: "bot", text: response.data.reply };
         setMessages((prev) => [...prev, botMsg]);
       }, 1500); // 1.5 second delay
     } catch (error) {
       setTimeout(() => {
         setMessages((prev) => [
           ...prev,
           { sender: "bot", text: "Oops! Error occurred." },
         ]);
       }, 1500);
     }
   })();
 };



  return (
    <>
      {/* Floating button to open chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-success rounded-circle position-fixed bottom-0 end-0 m-4"
          style={{ width: "60px", height: "60px" }}>
          <MessageCircle color="white" />
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div
          className="card position-fixed bottom-0 end-0 m-4"
          style={{ width: "350px", height: "500px", zIndex: 9999 }}>
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h5 className="m-0">Chatbot</h5>
            <X
              size={26}
              role="button"
              onClick={() => setIsOpen(false)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            className="card-body overflow-auto"
            style={{ background: "#e5ddd5", flex: 1 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex mb-2 ${
                  msg.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}>
                <div
                  className="p-2 rounded"
                  style={{
                    maxWidth: "75%",
                    backgroundColor: msg.sender === "user" ? "#dcf8c6" : "#fff",
                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                  }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className="card-footer d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend} className="btn btn-success">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
