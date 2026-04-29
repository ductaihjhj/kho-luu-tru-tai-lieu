import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  markAllNotificationsReadInFirebase,
  subscribeNotificationsFromFirebase,
} from "./services/firebaseNotifications";
import {
  createResourceInFirebase,
  fetchResourcesFromFirebase,
  updateResourceInFirebase,
  deleteResourceFromFirebase,
} from "./services/firebaseResources";

import HomePage from "./pages/HomePage";
import ClassResourcesPage from "./pages/ClassResourcesPage";
import ChildResourcesPage from "./pages/ChildResourcesPage";
import AdminPage from "./pages/AdminPage";

import { defaultAppData } from "./data/defaultAppData";
import { useAppData } from "./hooks/useAppData";

import {
  Header,
  TopTabs,
  LeftSidebar,
  ParentPanel,
  NotificationPanel,
  UploadModal,
  MobileDrawer,
  Toast,
} from "./components/app-components";

function getResourceTypeByCategory(categoryName = "") {
  const lower = categoryName.toLowerCase();

  if (lower.includes("bài hát") || lower.includes("thơ")) {
    return {
      type: "song",
      typeLabel: "Bài hát",
      emoji: "🎵",
      color: "from-purple-200 to-violet-300",
      bgPattern: "bg-purple-50",
    };
  }

  if (lower.includes("truyện")) {
    return {
      type: "story",
      typeLabel: "Truyện kể",
      emoji: "📚",
      color: "from-amber-200 to-orange-300",
      bgPattern: "bg-amber-50",
    };
  }

  if (lower.includes("hình") || lower.includes("video")) {
    return {
      type: "image",
      typeLabel: "Hình ảnh",
      emoji: "🎬",
      color: "from-sky-200 to-blue-300",
      bgPattern: "bg-sky-50",
    };
  }

  if (lower.includes("sáng tạo")) {
    return {
      type: "image",
      typeLabel: "Hình ảnh",
      emoji: "🎨",
      color: "from-yellow-200 to-amber-300",
      bgPattern: "bg-yellow-50",
    };
  }

  return {
    type: "video",
    typeLabel: "Video",
    emoji: "🎭",
    color: "from-pink-200 to-rose-300",
    bgPattern: "bg-pink-50",
  };
}

export default function App() {
  const [deletedResourceIds, setDeletedResourceIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("deleted_resource_ids") || "[]");
    } catch {
      return [];
    }
  });
const [firebaseNotifications, setFirebaseNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [activeMenu, setActiveMenu] = useState("all");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [firebaseResources, setFirebaseResources] = useState([]);
  const [isLoadingFirebase, setIsLoadingFirebase] = useState(false);

  const {
    siteConfig,
    children,
    activeChild,
    categories,
    resources,
    notifications,

    updateSiteConfig,

    createChild,
    updateChild,
    deleteChild,

    createCategory,
    updateCategory,
    deleteCategory,

    updateResource,
    deleteResource,
    incrementResourceViews,

    markNotificationsRead,
    resetAllData,
  } = useAppData();
useEffect(() => {
  const unsubscribe = subscribeNotificationsFromFirebase((data) => {
    setFirebaseNotifications(data);
  });

  return () => unsubscribe();
}, []);
  const rememberDeletedResource = (resourceId) => {
    setDeletedResourceIds((prev) => {
      const next = [...new Set([...prev, resourceId])];
      localStorage.setItem("deleted_resource_ids", JSON.stringify(next));
      return next;
    });
  };
const handleMarkNotificationsRead = async () => {
  markNotificationsRead();

  try {
    await markAllNotificationsReadInFirebase();
  } catch (error) {
    console.error("Không đánh dấu thông báo Firebase được:", error);
  }
};
  const normalizedFirebaseResources = firebaseResources.map((item) => ({
    ...item,
    id: item.id,
    title: item.title || "Tài liệu chưa có tiêu đề",
    description: item.description || "Chưa có mô tả.",
    type: item.type || "image",
    typeLabel: item.typeLabel || "Tài liệu",
    categoryId: item.categoryId || "activity",
    category: item.category || "Hoạt động của lớp",
    targetType: item.targetType || "class",
    childId: item.targetType === "child" ? item.childId || null : null,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : null,
    updatedAt:
      typeof item.updatedAt === "string" ? item.updatedAt : "Vừa xong",
    views: item.views || 0,
    emoji: item.emoji || "📄",
    color: item.color || "from-purple-200 to-pink-300",
    bgPattern: item.bgPattern || "bg-purple-50",
    size: item.size || "Link Drive",
    teacher: item.teacher || "Cô giáo",
    fileName: item.fileName || "",
    fileUrl: item.fileUrl || "#",
    thumbnailUrl: item.thumbnailUrl || "",
    isFirebase: true,
  }));

  const localStorageResources = (resources || []).map((item) => ({
    ...item,
    isLocal: true,
  }));

  const defaultDemoResources = (defaultAppData.resources || []).map((item) => ({
    ...item,
    isDemo: true,
  }));

  const allResources = [
    ...normalizedFirebaseResources,
    ...localStorageResources,
    ...defaultDemoResources,
  ]
    .filter((item, index, array) => {
      return array.findIndex((resource) => resource.id === item.id) === index;
    })
    .filter((item) => !deletedResourceIds.includes(item.id));

  const allClassResources = allResources.filter(
    (item) => (item.targetType || "class") === "class"
  );

  const allChildResources = allResources.filter(
    (item) =>
      item.targetType === "child" && item.childId === activeChild?.id
  );

  useEffect(() => {
    let mounted = true;

    async function loadFirebaseResources() {
      try {
        setIsLoadingFirebase(true);
        const data = await fetchResourcesFromFirebase();

        if (mounted) {
          setFirebaseResources(data);
        }
      } catch (error) {
        console.error("Không tải được tài liệu từ Firebase:", error);
      } finally {
        if (mounted) setIsLoadingFirebase(false);
      }
    }

    loadFirebaseResources();

    return () => {
      mounted = false;
    };
  }, []);

 

const allNotifications = [
  ...firebaseNotifications,
  ...(notifications || []),
].filter((item, index, array) => {
  return array.findIndex((notification) => notification.id === item.id) === index;
});

const unreadCount = allNotifications.filter((item) => !item.read).length;

  const handleOpenUpload = (category = null) => {
    setUploadCategory(category);
    setUploadOpen(true);
  };

  const handleUploadSuccess = async (message, uploadData = {}) => {
    const categoryName =
      uploadData.category || uploadCategory || "Hoạt động của lớp";

    const matchedCategory =
      categories.find((item) => item.name === categoryName) || categories[0];

    const resourceType = getResourceTypeByCategory(categoryName);

    const payload = {
      title: uploadData.title || uploadData.fileName || "Tài liệu mới",
      description: uploadData.fileName
        ? `Tài liệu vừa thêm: ${uploadData.fileName}`
        : "Tài liệu mới vừa được thêm vào kho.",
      categoryId: matchedCategory?.id || "activity",
      category: matchedCategory?.name || categoryName,

      targetType: "class",
      childId: null,

      fileName: uploadData.fileName || uploadData.title || "Tài liệu",
      fileUrl: uploadData.fileUrl || "#",
      thumbnailUrl: uploadData.thumbnailUrl || "",
      size: uploadData.size || "Link Drive",

      teacher: uploadData.teacher || "Cô giáo",
      updatedAt: "Vừa xong",
      views: 0,

      ...resourceType,
    };

    try {
      const newResource = await createResourceInFirebase(payload);

      setFirebaseResources((prev) => [newResource, ...prev]);

      setToast({
        type: "success",
        message: message || "Đã lưu tài liệu lên Firestore!",
      });
    } catch (error) {
      console.error(error);

      setToast({
        type: "error",
        message: "Lưu Firestore thất bại.",
      });
    }
  };

  const handleAdminCreateResource = async (payload) => {
    const newResource = await createResourceInFirebase(payload);

    setFirebaseResources((prev) => [newResource, ...prev]);

    return newResource;
  };

  const handleAdminUpdateResource = async (resourceId, payload) => {
    await updateResourceInFirebase(resourceId, payload);

    setFirebaseResources((prev) =>
      prev.map((item) =>
        item.id === resourceId
          ? {
              ...item,
              ...payload,
              updatedAt: "Vừa xong",
            }
          : item
      )
    );

    updateResource(resourceId, payload);
  };

  const handleAdminDeleteResource = async (resourceId) => {
    try {
      await deleteResourceFromFirebase(resourceId);
    } catch (error) {
      console.error(
        "Không xoá được trên Firestore hoặc tài liệu không tồn tại:",
        error
      );
    }

    setFirebaseResources((prev) =>
      prev.filter((item) => item.id !== resourceId)
    );

    deleteResource(resourceId);
    rememberDeletedResource(resourceId);
  };

  const handleResetAllData = () => {
    localStorage.removeItem("deleted_resource_ids");
    setDeletedResourceIds([]);
    resetAllData();
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
              siteConfig={siteConfig}
              children={children}
              activeChild={activeChild}
              categories={categories}
              resources={allResources}
              classResources={allClassResources}
              childResources={allChildResources}
              notifications={allNotifications}
              unreadCount={unreadCount}
              onUpload={handleOpenUpload}
              onMarkRead={handleMarkNotificationsRead}
              onViewResource={incrementResourceViews}
              mobileDrawerOpen={mobileDrawerOpen}
              setMobileDrawerOpen={setMobileDrawerOpen}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminPage
              siteConfig={siteConfig}
              children={children}
              activeChild={activeChild}
              categories={categories}
              resources={allResources}
              notifications={allNotifications}
              updateSiteConfig={updateSiteConfig}
              createChild={createChild}
              updateChild={updateChild}
              deleteChild={deleteChild}
              createCategory={createCategory}
              updateCategory={updateCategory}
              deleteCategory={deleteCategory}
              createResource={handleAdminCreateResource}
              updateResource={handleAdminUpdateResource}
              deleteResource={handleAdminDeleteResource}
              resetAllData={handleResetAllData}
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
        categories={categories}
        children={children}
        activeChild={activeChild}
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
  siteConfig,
  children,
  activeChild,
  categories,
  resources,
  classResources,
  childResources,
  notifications,
  unreadCount,
  onUpload,
  onMarkRead,
  onViewResource,
  mobileDrawerOpen,
  setMobileDrawerOpen,
}) {
  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <Header
        notifCount={unreadCount}
        onNotificationsClick={onMarkRead}
        onMobileMenuToggle={() => setMobileDrawerOpen(true)}
        siteConfig={siteConfig}
        activeChild={activeChild}
      />

      <TopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <MobileDrawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        siteConfig={siteConfig}
        categories={categories}
      />

      <main className="flex gap-6 px-4 py-6 md:px-8">
        <div className="hidden lg:block">
          <LeftSidebar
            activeMenu={activeMenu}
            onMenuChange={setActiveMenu}
            siteConfig={siteConfig}
            categories={categories}
          />
        </div>

        {activeTab === "home" && (
          <HomePage
            activeMenu={activeMenu}
            resources={resources}
            classResources={classResources}
            childResources={childResources}
            categories={categories}
            children={children}
            activeChild={activeChild}
            onUpload={onUpload}
            onViewResource={onViewResource}
            siteConfig={siteConfig}
          />
        )}

        {activeTab === "class" && (
          <ClassResourcesPage
            activeMenu={activeMenu}
            resources={classResources}
            categories={categories}
            children={children}
            activeChild={activeChild}
            onUpload={onUpload}
            onViewResource={onViewResource}
            siteConfig={siteConfig}
          />
        )}

        {activeTab === "child" && (
          <ChildResourcesPage
            resources={childResources}
            categories={categories}
            children={children}
            activeChild={activeChild}
            onUpload={onUpload}
            onViewResource={onViewResource}
            siteConfig={siteConfig}
          />
        )}

        <aside className="hidden w-80 flex-shrink-0 space-y-5 xl:block">
          <ParentPanel
            onUpload={onUpload}
            siteConfig={siteConfig}
            activeChild={activeChild}
          />

          <NotificationPanel
            notifications={notifications}
            onMarkRead={onMarkRead}
          />
        </aside>
      </main>
    </div>
  );
}