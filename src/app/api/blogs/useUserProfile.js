import { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
import { getUserInfo, updateUserInfo, createUserInfo } from "./userApi";
import { useRouter } from "next/navigation";

const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/auth/login"); // Redirect if not logged in
      } else {
        setUser(user);

        try {
          const data = await getUserInfo(user.uid);
          setUserInfo(data);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Update user info
  const handleUpdateUserInfo = async (info) => {
    if (user) {
      try {
        await updateUserInfo(user.uid, info);
        setUserInfo((prev) => ({ ...prev, ...info })); // Merge updated fields with existing data
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  // ✅ Create user info (if not exists)
  const handleCreateUserInfo = async (info) => {
    if (user) {
      try {
        await createUserInfo(user.uid, info);
        setUserInfo((prev) => ({ ...prev, ...info })); // Merge new info with existing state
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    }
  };

  return { user, userInfo, updateUserInfo: handleUpdateUserInfo, createUserInfo: handleCreateUserInfo };
};

export default useUserProfile;
