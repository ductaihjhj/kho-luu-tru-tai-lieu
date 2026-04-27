import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ClassResourcesPage from "./pages/ClassResourcesPage";
import ChildResourcesPage from "./pages/ChildResourcesPage";
import AdminPage from "./pages/AdminPage";

import { useSiteConfig } from "./hooks/useSiteConfig";
import {
  MOCK_DATA,
  Header,
  TopTabs,
  LeftSidebar,
  ParentPanel,
  NotificationPanel,
  UploadModal,
  MobileDrawer,
  Toast,
} from "./components/app-components";

function createUploadedResource(uploadData) {
  const category = uploadData?.category || "Hoạt động của lớp";

  const categoryStyle = {
    "Hoạt động của lớp": {
      type: "video",
      typeLabel: "Video",
      emoji: "🎭",
      color: "from-pink-200 to-rose-300",
      bgPattern: "bg-pink-50",
      teacher: "Cô Hoa",
    },
    "Bài hát, thơ ca": {
      type: "song",
      typeLabel: "Bài hát",
      emoji: "🎵",
      color: "from-purple-200 to-violet-300",
      bgPattern: "bg-purple-50",
      teacher: "Cô Mai",
    },
    "Truyện kể chuyện": {
      type: "story",
      typeLabel: "Truyện kể",
      emoji: "📚",
      color: "from-amber-200 to-orange-300",
      bgPattern: "bg-amber-50",
      teacher: "Cô Lan",
    },
    "Hình ảnh, video": {
      type: "image",
      typeLabel: "Hình ảnh",
      emoji: "🎬",
      color: "from-sky-200 to-blue-300",
      bgPattern: "bg-sky-50",
      teacher: "Cô Hoa",
    },
    "Góc sáng tạo": {
      type: "image",
      typeLabel: "Hình ảnh",
      emoji: "🎨",
      color: "from-yellow-200 to-amber-300",
      bgPattern: "bg-yellow-50",
      teacher: "Cô Lan",
    },
  };

  const style = categoryStyle[category] || categoryStyle["Hoạt động của lớp"];

  return {
    id: Date.now(),
    title: uploadData?.title || uploadData?.fileName || "Tài liệu mới",
    description: uploadData?.fileName
      ? `Tài liệu vừa tải lên: ${uploadData.fileName}`
      : "Tài liệu mới vừa được thêm vào kho.",
    category,
    updatedAt: "Vừa xong",
    views: 0,
    size: uploadData?.size || "Mới tải",
    ...style,
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeMenu, setActiveMenu] = useState("all");
  const [resources, setResources] = useState(MOCK_DATA.resources || []);
  const [notifications, setNotifications] = useState(MOCK_DATA.notifications || []);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const { siteConfig, updateSiteConfig, resetSiteConfig } = useSiteConfig();

  const unreadCount = notifications.filter((item) => !item.read).length;

  const handleOpenUpload = (category = null) => {
    setUploadCategory(category);
    setUploadOpen(true);
  };

  const handleUploadSuccess = (message, uploadData) => {
    const newResource = createUploadedResource(uploadData);

    setResources((prev) => [newResource, ...prev]);
    setToast({
      type: "success",
      message: message || "Tài liệu đã được tải lên thành công!",
    });
  };

  const handleMarkRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              resources={resources}
              notifications={notifications}
              unreadCount={unreadCount}
              onUpload={handleOpenUpload}
              onMarkRead={handleMarkRead}
              mobileDrawerOpen={mobileDrawerOpen}
              setMobileDrawerOpen={setMobileDrawerOpen}
              siteConfig={siteConfig}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminPage
              siteConfig={siteConfig}
              updateSiteConfig={updateSiteConfig}
              resetSiteConfig={resetSiteConfig}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSuccess={handleUploadSuccess}
        defaultCategory={uploadCategory}
        siteConfig={siteConfig}
      />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

function MainLayout({
  activeTab,
  setActiveTab,
  activeMenu,
  setActiveMenu,
  resources,
  notifications,
  unreadCount,
  onUpload,
  onMarkRead,
  mobileDrawerOpen,
  setMobileDrawerOpen,
  siteConfig,
}) {
  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <Header
        notifCount={unreadCount}
        onNotificationsClick={onMarkRead}
        onMobileMenuToggle={() => setMobileDrawerOpen(true)}
        siteConfig={siteConfig}
      />

      <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <MobileDrawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        siteConfig={siteConfig}
      />

      <main className="flex gap-6 px-4 py-6 md:px-8">
        <div className="hidden lg:block">
          <LeftSidebar
            activeMenu={activeMenu}
            onMenuChange={setActiveMenu}
            siteConfig={siteConfig}
          />
        </div>

        {activeTab === "home" && (
          <HomePage
            activeMenu={activeMenu}
            resources={resources}
            onUpload={onUpload}
            siteConfig={siteConfig}
          />
        )}

        {activeTab === "class" && (
          <ClassResourcesPage
            activeMenu={activeMenu}
            resources={resources}
            onUpload={onUpload}
            siteConfig={siteConfig}
          />
        )}

        {activeTab === "child" && (
          <ChildResourcesPage
            resources={resources}
            onUpload={onUpload}
            siteConfig={siteConfig}
          />
        )}

        <aside className="hidden w-80 flex-shrink-0 space-y-5 xl:block">
          <ParentPanel onUpload={onUpload} siteConfig={siteConfig} />

          <NotificationPanel
            notifications={notifications}
            onMarkRead={onMarkRead}
          />
        </aside>
      </main>
    </div>
  );
}