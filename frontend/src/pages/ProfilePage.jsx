import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  User,
  Wallet,
  Ticket,
  Star,
  LogOut,
  Edit,
  Save,
  X,
} from "lucide-react";

const ProfilePage = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    logout,
    updateProfile,
    isUpdatingProfile,
  } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editError, setEditError] = useState(null);
  const navigate = useNavigate();

  // Convert image to base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Handle profile picture upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setSelectedImg(URL.createObjectURL(file));
      const base64 = await convertToBase64(file);
      await updateProfile({ profilePic: base64 });
      setSelectedImg(null);
    } catch {
      alert("Image upload failed");
    }
  };

  // Edit name
  const handleEditProfile = () => {
    setEditedName(user?.name || "");
    setIsEditing(true);
  };

  // Save updated profile
  const handleSaveProfile = async () => {
    try {
      setEditError(null);
      await updateProfile({ name: editedName });
      setIsEditing(false);
    } catch (error) {
      setEditError("Failed to update profile");
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(user?.name || "");
  };

  // Logout
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Loading state
  if (!isAuthenticated || isLoading || !user) {
    return (
      <div className="h-screen flex items-center justify-center text-emerald-700">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex flex-col md:flex-row backdrop-blur-md">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-white/70 backdrop-blur-md border-r border-emerald-200 shadow-lg p-6 flex flex-col items-center space-y-5 md:rounded-tr-3xl md:rounded-br-3xl">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={user?.profilePic || selectedImg || "/avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
            onError={(e) => (e.target.src = "/avatar.png")}
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-emerald-600 hover:bg-emerald-700 p-2 rounded-full cursor-pointer shadow-md"
          >
            <Camera className="w-4 h-4 text-white" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* User Info */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-emerald-800 tracking-tight">
            {user?.name}
          </h2>
          <p className="text-emerald-600 text-sm">{user?.email}</p>
        </div>

        <div className="w-full border-t border-emerald-200"></div>

        {/* Quick Stats */}
        <div className="w-full space-y-3">
          {[
            { icon: Wallet, label: "Wallet", value: `₹${user.wallet || 0}` },
            { icon: Ticket, label: "Coupons", value: user.coupons?.length || 0 },
            { icon: Star, label: "Alertify Points", value: user.sakhiPoints || 0 },
          ].map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white/80 p-3 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all"
            >
              <span className="flex items-center gap-2 text-emerald-700 font-medium">
                <item.icon className="w-4 h-4" /> {item.label}
              </span>
              <span className="font-semibold text-emerald-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-emerald-800">
            Account Overview
          </h1>
          {!isEditing && (
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>

        {/* Profile Info Card */}
        <div className="bg-white/80 backdrop-blur-md border border-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-emerald-800 mb-3">
            Profile Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-emerald-700 flex items-center gap-2 mb-1">
                <User className="w-4 h-4" /> Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              ) : (
                <p className="px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800">
                  {user?.name}
                </p>
              )}
            </div>

            {editError && <p className="text-red-500 text-sm">{editError}</p>}

            {isEditing && (
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={isUpdatingProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-md"
                >
                  <Save className="w-4 h-4" />
                  {isUpdatingProfile ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-white/80 backdrop-blur-md border border-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-lg font-semibold text-emerald-800 mb-3">
            Account Information
          </h2>
          <div className="flex justify-between text-sm">
            <span className="text-emerald-700">Member Since</span>
            <span className="text-emerald-900 font-medium">
              {user.createdAt?.split("T")[0]}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-emerald-700">Account Status</span>
            <span className="text-emerald-700 font-semibold">Active</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
