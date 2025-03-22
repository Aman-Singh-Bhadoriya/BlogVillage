"use client";

import UserProfile from "./components/UserProfile";
import useUserProfile from "../api/blogs/useUserProfile";

export default function Dashboard() {
  const { user, userInfo, updateUserInfo } = useUserProfile();

  return (
    <div className="p-4">
      {/* Display User Profile */}
      <UserProfile user={user} userInfo={userInfo} />
    </div>
  );
}
