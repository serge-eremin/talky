import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  areUsersLoading: false,
  areMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ areUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res?.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Get all contacts failed");
    } finally {
      set({ areUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ areUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res?.data || [] });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Get my chat partners failed",
      );
    } finally {
      set({ areUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ areMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ areMessagesLoading: false });
    }
  },
}));
