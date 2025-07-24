import React from 'react'

const ChatField = ({handleSendMessage,setNewMessage,newMessage,handleKeyPress}) => {
    return (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1f2d]">
            <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    📎
                </button>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full bg-white dark:bg-darkinfo text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                />
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    😊
                </button>
                <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatField