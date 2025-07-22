import React, { useState, useEffect, useRef } from "react";
import Axios from "../../utils/axios";
import SummaryApi from "../../common/Summaryapi";

// Keep static users data for sidebar display
const users = [
  {
    id: 1,
    clientId: "919500971102", // Add client ID to match with API
    name: "Michell Flintoffs",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    clientId: "918015268982", // Example second client
    name: "John Smith",
    role: "Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

const ChatLayout = () => {
  const [activeUserId, setActiveUserId] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [lastMessagesMap, setLastMessagesMap] = useState({});


  const activeUser = users.find((user) => user.id === activeUserId);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserSelect = (userId) => {
    setActiveUserId(userId);
    setSidebarOpen(false);
    // Load messages when user is selected
    if (userId) {
      const user = users.find(u => u.id === userId);
      if (user) {
        getMessages(user.clientId);
      }
    }
  };

  const getMessages = async (clientId = "919500971102") => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.get_messages,
        params: {
          client: clientId
        }
      });

      if (response.data.success) {
        // Transform API data to match your message format
        const transformedMessages = response.data.data.map(msg => {
          // Determine if message is from admin or client
          // Assuming admin messages are "from me" and client messages are "from user"
          const isFromAdmin = msg.message_type === "reply" || msg.admin === msg.client;

          return {
            id: msg.id,
            from: isFromAdmin ? "me" : "user",
            text: msg.message,
            timestamp: msg.timestamp,
            messageType: msg.message_type,
            admin: msg.admin,
            client: msg.client
          };
        });

        // Sort messages by timestamp (oldest first)
        // transformedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        if (transformedMessages.length > 0) {
          const last = transformedMessages[transformedMessages.length - 1];
          setLastMessagesMap(prev => ({
            ...prev,
            [clientId]: {
              text: last.text,
              timestamp: last.timestamp,
            }
          }));
        }

        setMessages(transformedMessages);
        console.log("Messages loaded:", transformedMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load default messages on component mount
  useEffect(() => {
    getMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeUser) return;

    try {
      // Add your send message API call here
      // const response = await Axios({
      //   ...SummaryApi.send_message,
      //   data: {
      //     client: activeUser.clientId,
      //     message: newMessage,
      //     message_type: "reply"
      //   }
      // });

      // For now, add message locally
      const newMsg = {
        id: Date.now().toString(),
        from: "me",
        text: newMessage,
        timestamp: new Date().toLocaleString(),
        messageType: "reply"
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage("");

      // Optionally reload messages from server
      // getMessages(activeUser.clientId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="bg-white dark:bg-darkinfo text-gray-900 dark:text-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-200px)]">
        <div className="flex h-full relative">
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
              absolute lg:relative z-40 lg:z-0
              w-80 lg:w-[30%] h-full
              bg-white dark:bg-[#1e1f2d] border-r border-gray-200 dark:border-gray-700
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-lg font-semibold">Chats</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=54&h=54&fit=crop&crop=face"
                    alt="user"
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-darkinfo"></span>
                </div>
                <div>
                  <h6 className="text-sm font-semibold">Mathew Anderson</h6>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Marketing Director</p>
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-darkinfo focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search contacts..."
                />
              </div>

              <div className="space-y-2">
                {users.map((user) => {
                  // Get last message for this user (you could maintain separate messages per user)
                 const lastMessage = lastMessagesMap[user.clientId]?.text || "Click to load messages";
const lastTime = lastMessagesMap[user.clientId]?.timestamp
  ? new Date(lastMessagesMap[user.clientId].timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  : "";


                  return (
                    <button
                      key={user.id}
                      onClick={() => handleUserSelect(user.id)}
                      className={`w-full p-3 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-[#2c2e42] rounded-lg transition-colors text-left ${activeUserId === user.id ? "bg-blue-50 dark:bg-[#2d3969] border border-blue-200 dark:border-blue-700" : ""
                        }`}
                    >
                      <img
                        src={user.avatar}
                        className="w-12 h-12 rounded-full object-cover"
                        alt={user.name}
                      />
                      <div className="flex-1 min-w-0">
                        <h6 className="text-sm font-medium truncate">{user.name}</h6>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {lastMessage}
                        </p>
                        <span className="text-xs text-gray-400">
                          {lastTime}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col h-full w-full">
            {activeUser ? (
              <>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1f2d]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      ☰
                    </button>
                    <img
                      src={activeUser.avatar}
                      alt={activeUser.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h6 className="text-sm font-semibold">{activeUser.name}</h6>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activeUser.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => getMessages(activeUser.clientId)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      title="Refresh messages"
                    >
                      🔄
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      📞
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      📹
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      ⋮
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#2b2b3d]">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-gray-500">Loading messages...</div>
                    </div>
                  ) : messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <div
                        key={msg.id || index}
                        className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex flex-col max-w-xs lg:max-w-md">
                          <div
                            className={`px-4 py-2 rounded-2xl text-sm ${msg.from === "me"
                                ? "bg-blue-500 text-white rounded-br-md"
                                : "bg-white dark:bg-[#3a3b4d] text-gray-800 dark:text-gray-200 border dark:border-gray-600 rounded-bl-md"
                              }`}
                          >
                            {msg.text}
                          </div>
                          <div className={`text-xs text-gray-400 mt-1 ${msg.from === "me" ? "text-right" : "text-left"}`}>
                            {new Date(msg.timestamp * 1000).toLocaleTimeString()}
                            {msg.messageType && (
                              <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                                {msg.messageType}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-gray-500">No messages yet</div>
                    </div>
                  )}
                  {/* Invisible div to scroll to */}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1f2d]">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">📎</button>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-darkinfo text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type a message..."
                    />
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">😊</button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-[#2b2b3d]">
                <div className="text-center">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Open Chats
                  </button>
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-lg font-medium mb-2">Welcome to Chat</h3>
                  <p className="text-gray-500 dark:text-gray-300">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;