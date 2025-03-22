"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../utils/firebase";
import { getUserInfo, updateUserInfo } from "../../api/blogs/userApi";
import UserInfoForm from "./UserInfoForm";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false); // State for popup form
  const router = useRouter();

  // ✅ Fetch User Data on Load
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const data = await getUserInfo(user.uid);
          setUserInfo(data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Handle Profile Update
  const handleUpdateUserInfo = async (newData) => {
    if (!user) return;

    try {
      await updateUserInfo(user.uid, newData);
      setUserInfo((prev) => ({
        ...prev,
        ...newData,
      }));
      alert("Profile updated successfully!");
      setOpen(false); // Close the popup after successful update
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("Failed to update profile.");
    }
  };

  // ✅ Open/Close Popup
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!user) return <p>Loading...</p>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // mt: 6,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "60%",
          boxShadow: 3,
          borderRadius: 3,
          backgroundColor: "#fafafa",
        }}
      >
        <CardContent>
          {/* ✅ Profile Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar
              src={user?.photoURL || "/default-avatar.png"}
              alt="Profile"
              sx={{ width: 64, height: 64, border: "2px solid #ddd" }}
            />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {user?.displayName || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <IconButton
              onClick={handleOpen}
              sx={{ marginLeft: "auto" }}
            >
              <EditIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ✅ User Info */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" fontWeight="500">
              Phone:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo?.phone || "Not provided"}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" fontWeight="500">
              Summary:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userInfo?.summary || "No summary available"}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* ✅ Popup Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <UserInfoForm initialData={userInfo} onSubmit={handleUpdateUserInfo} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;
