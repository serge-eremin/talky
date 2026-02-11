import { LogOut } from "lucide-react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();

  return (
    <div className="z-10 text-white">
      ChatPage
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default ChatPage;
// w-full h-screen flex items-center justify-center
