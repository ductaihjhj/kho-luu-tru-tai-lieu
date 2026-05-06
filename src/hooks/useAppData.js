import { useEffect, useMemo, useState } from "react";
import { defaultAppData } from "../data/defaultAppData";
import {
  saveSettingsToFirebase,
  subscribeSettingsFromFirebase,
} from "../services/firebaseSettings";
const STORAGE_KEY = "nhat_ky_dien_vien_nhi_app_data";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function mergeById(defaultItems = [], savedItems = []) {
  const savedArray = Array.isArray(savedItems) ? savedItems : [];
  const defaultArray = Array.isArray(defaultItems) ? defaultItems : [];

  const savedIds = new Set(savedArray.map((item) => item.id));

  return [
    ...savedArray,
    ...defaultArray.filter((item) => !savedIds.has(item.id)),
  ];
}

function mergeAppData(savedData) {
  if (!savedData) return defaultAppData;

  return {
    ...defaultAppData,
    ...savedData,

    siteConfig: {
      ...defaultAppData.siteConfig,
      ...(savedData.siteConfig || {}),
    },

    children: mergeById(defaultAppData.children, savedData.children),

    categories: mergeById(defaultAppData.categories, savedData.categories),

    resources: mergeById(defaultAppData.resources, savedData.resources),

    notifications: mergeById(
      defaultAppData.notifications,
      savedData.notifications
    ),
  };
}

export function useAppData() {
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [appData, setAppData] = useState(defaultAppData);

  // Load localStorage trước
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = safeParse(saved);

    setAppData(mergeAppData(parsed));
    setHasLoadedStorage(true);
  }, []);

  // Chỉ save sau khi đã load xong localStorage
  useEffect(() => {
    if (!hasLoadedStorage) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  }, [appData, hasLoadedStorage]);
useEffect(() => {
  const unsubscribe = subscribeSettingsFromFirebase((cloudSettings) => {
    if (!cloudSettings) return;

    setAppData((prev) => ({
      ...prev,

      siteConfig: {
        ...prev.siteConfig,
        ...(cloudSettings.siteConfig || {}),
      },

      children:
        Array.isArray(cloudSettings.children) && cloudSettings.children.length > 0
          ? cloudSettings.children
          : prev.children,

      categories:
        Array.isArray(cloudSettings.categories) &&
        cloudSettings.categories.length > 0
          ? cloudSettings.categories
          : prev.categories,
    }));
  });

  return () => unsubscribe();
}, []);
const saveCloudSettings = async (nextData) => {
  try {
    await saveSettingsToFirebase({
      siteConfig: nextData.siteConfig,
      children: nextData.children,
      categories: nextData.categories,
    });
  } catch (error) {
    console.error("Không lưu được settings lên Firestore:", error);
  }
};
  const activeChild = useMemo(() => {
    const activeChildId = appData.siteConfig.activeChildId;

    return (
      appData.children.find((child) => child.id === activeChildId) ||
      appData.children[0] ||
      null
    );
  }, [appData.children, appData.siteConfig.activeChildId]);

  const classResources = useMemo(() => {
    return appData.resources.filter(
      (resource) => (resource.targetType || "class") === "class"
    );
  }, [appData.resources]);

  const childResources = useMemo(() => {
    if (!activeChild) return [];

    return appData.resources.filter(
      (resource) =>
        resource.targetType === "child" && resource.childId === activeChild.id
    );
  }, [appData.resources, activeChild]);

  const updateSiteConfig = (newConfig) => {
  setAppData((prev) => {
    const next = {
      ...prev,
      siteConfig: {
        ...prev.siteConfig,
        ...newConfig,
      },
    };

    saveCloudSettings(next);

    return next;
  });
};

  const createChild = (childData) => {
    const newChild = {
      id: childData.id || createId("child"),
      name: childData.name || "Tên bé",
      nickname: childData.nickname || childData.name || "Bé",
      avatarEmoji: childData.avatarEmoji || "⭐",
      parentName: childData.parentName || "",
    };

    setAppData((prev) => {
  const next = {
    ...prev,
    children: [newChild, ...prev.children],
  };

  saveCloudSettings(next);

  return next;
});

    return newChild;
  };
const updateChild = (childId, childData) => {
  setAppData((prev) => {
    const next = {
      ...prev,
      children: prev.children.map((child) =>
        child.id === childId
          ? {
              ...child,
              ...childData,
            }
          : child
      ),
    };

    saveCloudSettings(next);

    return next;
  });
};
 const deleteChild = (childId) => {
  setAppData((prev) => {
    const children = prev.children.filter((child) => child.id !== childId);

    const next = {
      ...prev,
      children,
      resources: prev.resources.map((resource) =>
        resource.childId === childId
          ? {
              ...resource,
              targetType: "class",
              childId: null,
            }
          : resource
      ),
      siteConfig: {
        ...prev.siteConfig,
        activeChildId:
          prev.siteConfig.activeChildId === childId
            ? children[0]?.id || ""
            : prev.siteConfig.activeChildId,
      },
    };

    saveCloudSettings(next);

    return next;
  });
};

  

  const createCategory = (categoryData) => {
    const newCategory = {
      id: categoryData.id || createId("category"),
      name: categoryData.name || "Danh mục mới",
      icon: categoryData.icon || "📁",
      color: categoryData.color || "from-purple-300 to-pink-400",
      bg: categoryData.bg || "bg-purple-50",
      gradient:
        categoryData.gradient ||
        categoryData.color ||
        "from-purple-400 to-pink-500",
      lightGradient:
        categoryData.lightGradient ||
        categoryData.bgGradient ||
        "from-purple-100 to-pink-200",
      description: categoryData.description || "",
    };

    setAppData((prev) => {
  const next = {
    ...prev,
    categories: [newCategory, ...prev.categories],
  };

  saveCloudSettings(next);

  return next;
});

    return newCategory;
  };

  const updateCategory = (categoryId, categoryData) => {
  setAppData((prev) => {
    const next = {
      ...prev,
      categories: prev.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              ...categoryData,
              gradient:
                categoryData.gradient ||
                categoryData.color ||
                category.gradient,
              lightGradient:
                categoryData.lightGradient ||
                categoryData.bgGradient ||
                category.lightGradient,
            }
          : category
      ),
      resources: prev.resources.map((resource) =>
        resource.categoryId === categoryId
          ? {
              ...resource,
              category: categoryData.name || resource.category,
            }
          : resource
      ),
    };

    saveCloudSettings(next);

    return next;
  });
};
  const deleteCategory = (categoryId) => {
  setAppData((prev) => {
    const next = {
      ...prev,
      categories: prev.categories.filter(
        (category) => category.id !== categoryId
      ),
      resources: prev.resources.map((resource) =>
        resource.categoryId === categoryId
          ? {
              ...resource,
              categoryId: "activity",
              category: "Hoạt động của lớp",
            }
          : resource
      ),
    };

    saveCloudSettings(next);

    return next;
  });
};

  const createResource = (resourceData) => {
    const category = appData.categories.find(
      (item) => item.id === resourceData.categoryId
    );

    const newResource = {
      id: createId("resource"),
      title: resourceData.title || "Tài liệu mới",
      description: resourceData.description || "Mô tả tài liệu.",
      type: resourceData.type || "image",
      typeLabel: resourceData.typeLabel || "Tài liệu",
      categoryId: resourceData.categoryId || "activity",
      category: category?.name || resourceData.category || "Hoạt động của lớp",

      targetType: resourceData.targetType || "class",
      childId:
        resourceData.targetType === "child"
          ? resourceData.childId || activeChild?.id || null
          : null,

      updatedAt: "Vừa xong",
      views: 0,
      emoji: resourceData.emoji || "📄",
      color: resourceData.color || "from-purple-200 to-pink-300",
      bgPattern: resourceData.bgPattern || "bg-purple-50",
      size: resourceData.size || "Mới tải",
      teacher: resourceData.teacher || "Cô giáo",
      fileName: resourceData.fileName || "",
      fileUrl: resourceData.fileUrl || "#",
      thumbnailUrl: resourceData.thumbnailUrl || "",
    };

    setAppData((prev) => ({
      ...prev,
      resources: [newResource, ...prev.resources],
      notifications: [
        {
          id: createId("notification"),
          icon: "📌",
          text: `Có tài liệu mới: ${newResource.title}`,
          time: "Vừa xong",
          read: false,
          color: "bg-purple-100",
          childId: newResource.childId,
        },
        ...prev.notifications,
      ],
    }));

    return newResource;
  };

  const updateResource = (resourceId, resourceData) => {
    const category = appData.categories.find(
      (item) => item.id === resourceData.categoryId
    );

    setAppData((prev) => ({
      ...prev,
      resources: prev.resources.map((resource) =>
        resource.id === resourceId
          ? {
              ...resource,
              ...resourceData,
              category:
                category?.name || resourceData.category || resource.category,
              childId:
                resourceData.targetType === "child"
                  ? resourceData.childId || resource.childId
                  : null,
            }
          : resource
      ),
    }));
  };

  const deleteResource = (resourceId) => {
    setAppData((prev) => ({
      ...prev,
      resources: prev.resources.filter(
        (resource) => resource.id !== resourceId
      ),
    }));
  };

  const incrementResourceViews = (resourceId) => {
    setAppData((prev) => ({
      ...prev,
      resources: prev.resources.map((resource) =>
        resource.id === resourceId
          ? {
              ...resource,
              views: (resource.views || 0) + 1,
            }
          : resource
      ),
    }));
  };

  const markNotificationsRead = () => {
    setAppData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    }));
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAppData(defaultAppData);
  };

  return {
    appData,

    siteConfig: appData.siteConfig,
    children: appData.children,
    activeChild,
    categories: appData.categories,
    resources: appData.resources,
    classResources,
    childResources,
    notifications: appData.notifications,

    updateSiteConfig,

    createChild,
    updateChild,
    deleteChild,

    createCategory,
    updateCategory,
    deleteCategory,

    createResource,
    updateResource,
    deleteResource,
    incrementResourceViews,

    markNotificationsRead,
    resetAllData,
  };
}