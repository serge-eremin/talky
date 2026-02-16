import { useEffect } from "react";

import { useChatStore } from "../store/useChatStore";
import { UsersLoadingSceleton } from "./UsersLoadingSceleton";

export const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, areUsersLoading } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (areUsersLoading) {
    return <UsersLoadingSceleton />;
  }

  return (
    <>
      {allContacts.map((contact) => {
        return (
          <div
            key={contact._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
            onClick={() => setSelectedUser(contact)}
          >
            <div className="flex items-center gap-3">
              {/* TODO MAKE IT WORK WITH SOCKET */}
              <div className={`avatar avatar-online`}>
                <div className="size-12 rounded-full">
                  <img
                    src={contact.profilePic || "/avatar.png"}
                    // alt={contact.fullName}
                  />
                </div>
              </div>
              <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
            </div>
          </div>
        );
      })}
    </>
  );
};
