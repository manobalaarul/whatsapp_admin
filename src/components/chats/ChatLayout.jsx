import React, { useState } from "react";

const users = [
  {
    id: 1,
    name: "Michell Flintoffs",
    role: "Marketing Director",
    messages: [
      { from: "user", text: "If I don’t like something, I’ll stay away from it." },
      { from: "me", text: "If I don’t like something, I’ll stay away from it." },
      { from: "user", text: "I want more detailed information." },
      { from: "me", text: "They got there early, and they got really good seats." },
      { from: "me", text: "They got there early, and they got really good seats." },
      { from: "me", text: "They got there early, and they got really good seats." },
      { from: "me", text: "They got there early, and they got really good seats." },
      { from: "me", text: "They got there early, and they got really good seats." },

    ],
  },
  // Add more users if needed
];

const ChatLayout = () => {
  const [activeUserId, setActiveUserId] = useState(null);
  const activeUser = users.find((user) => user.id === activeUserId);

  return (
    <div className="card overflow-hidden chat-application">
      <div className="flex border rounded-md h-[calc(100vh-180px)]">
        {/* Left Panel */}
        <div className="left-part border-e rounded-sm dark:border-darkborder w-[30%] flex-shrink-0 hidden lg:block user-chat-box">
          <div className="py-3">
            {/* User Header */}
            <div className="flex items-center justify-between mb-3 px-5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src="../assets/images/profile/user-1.jpg"
                    alt="user1"
                    width={54}
                    height={54}
                    className="rounded-full"
                  />
                  <span className="absolute right-0 bottom-0.5 p-1 rounded-full bg-success"></span>
                </div>
                <div>
                  <h6 className="text-sm font-semibold text-dark dark:text-white mb-2">
                    Mathew Anderson
                  </h6>
                  <p className="text-xs text-bodytext dark:text-darklink">Marketing Director</p>
                </div>
              </div>
            </div>

            {/* Contact Search */}
            <div className="px-5">
              <input
                type="text"
                className="form-control search-chat py-2 ps-10"
                placeholder="Search Contact"
              />
            </div>

            {/* Chat List */}
            <div className="app-chat mt-3 px-5">
              <ul className="chat-users">
                {users.map((user) => (
                  <li key={user.id}>
                    <button
                      onClick={() => setActiveUserId(user.id)}
                      className={`px-3 py-2 w-full flex items-start gap-3 hover:bg-lightgray rounded-md transition-all ${
                        activeUserId === user.id ? "bg-lightgray dark:bg-darkgray" : ""
                      }`}
                    >
                      <img src={user.avatar} className="rounded-full h-12 w-12" alt={user.name} />
                      <div>
                        <h6 className="text-sm font-semibold">{user.name}</h6>
                        <span className="block text-xs text-bodytext">You: Last message...</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Chat Box */}
       <div className="flex-grow scrollbar-none overflow-auto space-y-5">
          {activeUser ? (
            <div className="chat-box-inner-part h-full flex flex-col">
              <div className="chat-meta-user py-3 px-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={activeUser.avatar} alt={activeUser.name} className="rounded-full h-12 w-12" />
                  <div>
                    <h6 className="text-sm font-semibold">{activeUser.name}</h6>
                    <p className="text-xs text-bodytext">{activeUser.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex-grow scrollbar-none overflow-auto p-5 space-y-5">
                {activeUser.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  >
                  
                    <div>
                      <div
                        className={`py-1.5 px-3 rounded-md text-sm max-w-xs ${
                          msg.from === "me"
                            ? "bg-lightinfo dark:bg-darkinfo text-dark dark:text-white"
                            : "bg-lightgray dark:bg-darkgray text-dark dark:text-white"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t px-3 py-3">
                <input
                  type="text"
                  className="w-full py-2 px-3 border rounded-md dark:bg-darkgray dark:text-white"
                  placeholder="Type a message..."
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <i className="ti ti-message-dots text-primary text-4xl" />
                <h6 className="mt-2">Open chat from the list</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
