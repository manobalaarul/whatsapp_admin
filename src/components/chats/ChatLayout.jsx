import React, { useState, useEffect } from "react";

const users = [
  {
    id: 1,
    name: "Michell Flintoffs",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    messages: [
      { from: "user", text: "If I don't like something, I'll stay away from it." },
      { from: "me", text: "If I don't like something, I'll stay away from it." },
      { from: "user", text: "I want more detailed information." },
      { from: "me", text: "They got there early, and they got really good seats." },
      { from: "me", text: "They got there early, and they got really good seats." },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    role: "Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    messages: [
      { from: "user", text: "How's the project going?" },
      { from: "me", text: "It's progressing well, should be done by Friday." },
    ],
  },
];

const ChatLayout = () => {
  const [activeUserId, setActiveUserId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeUser = users.find((user) => user.id === activeUserId);

  const handleUserSelect = (userId) => {
    setActiveUserId(userId);
    setSidebarOpen(false);
  };

  return (
    <div>
      <div className="bg-white dark:bg-darkinfo text-gray-900 dark:text-white rounded-lg shadow-lg overflow-hidden h-[calc(100vh-200px)]">
        <div className="flex h-full relative">
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
              absolute lg:relative z-50 lg:z-0
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
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleUserSelect(user.id)}
                    className={`w-full p-3 flex items-start gap-3 hover:bg-gray-100 dark:hover:bg-[#2c2e42] rounded-lg transition-colors text-left ${
                      activeUserId === user.id ? "bg-blue-50 dark:bg-[#2d3969] border border-blue-200 dark:border-blue-700" : ""
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
                        You: {user.messages[user.messages.length - 1]?.text || "No messages"}
                      </p>
                      <span className="text-xs text-gray-400">2:30 PM</span>
                    </div>
                  </button>
                ))}
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
                  {activeUser.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl text-sm ${
                          msg.from === "me"
                            ? "bg-blue-500 text-white rounded-br-md"
                            : "bg-white dark:bg-[#3a3b4d] text-gray-800 dark:text-gray-200 border dark:border-gray-600 rounded-bl-md"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1f2d]">
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">📎</button>
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-darkinfo text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Type a message..."
                    />
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">😊</button>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
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
