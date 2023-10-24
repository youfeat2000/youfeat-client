import React, { createContext, useEffect, useState } from "react";
const ProfileContext = createContext();
export function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [vote, setVote] = useState([]);
  const [search, setSearch] = useState();
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const i = users.filter((value) => value.video);
    setSearch(i);
  }, [users]);

  return (
    <ProfileContext.Provider
      value={{
        user,
        setUser,
        setUsers,
        users,
        vote,
        setVote,
        toggle,
        setToggle,
        search,
        setSearch,
        comment,
        setComment,
      }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileContext;
