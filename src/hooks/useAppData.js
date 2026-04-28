import { useEffect, useMemo, useState } from "react";
import { defaultAppData } from "../data/defaultAppData";

const STORAGE_KEY = "nhat_ky_dien_vien_nhi_app_data";

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function mergeById(defaultItems = [], savedItems = []) {
  const savedIds = new Set(savedItems.map((item) => item.id));

  return [
    ...savedItems,
    ...defaultItems.filter((item) => !savedIds.has(item.id)),
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

    children: mergeById(defaultAppData.children, savedData.children || []),

    categories: mergeById(
      defaultAppData.categories,
      savedData.categories || []
    ),

    resources: mergeById(
      defaultAppData.resources,
      savedData.resources || []
    ),

    notifications: mergeById(
      defaultAppData.notifications,
      savedData.notifications || []
    ),
  };
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useAppData() {
  const [appData, setAppData] = useState(defaultAppData);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = safeParse(saved);

    setAppData(mergeAppData(parsed));
  }, []);

  useEffect(() => {
  if (!appData) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}, [appData]);

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
      (resource) => resource.targetType === "class"
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
    setAppData((prev) => ({
      ...prev,
      siteConfig: {
        ...prev.siteConfig,
        ...newConfig,
      },
    }));
  };

  const createChild = (childData) => {
    const newChild = {
      id: childData.id || createId("child"),
      name: childData.name || "Tên bé",
      nickname: childData.nickname || childData.name || "Bé",
      avatarEmoji: childData.avatarEmoji || "⭐",
      parentName: childData.parentName || "",
    };

    setAppData((prev) => ({
      ...prev,
      children: [newChild, ...prev.children],
    }));

    return newChild;
  };

  const updateChild = (childId, childData) => {
    setAppData((prev) => ({
      ...prev,
      children: prev.children.map((child) =>
        child.id === childId ? { ...child, ...childData } : child
      ),
    }));
  };

  const deleteChild = (childId) => {
    setAppData((prev) => {
      const children = prev.children.filter((child) => child.id !== childId);

      return {
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
    });
  };

  const createCategory = (categoryData) => {
    const newCategory = {
      id: categoryData.id || createId("category"),
      name: categoryData.name || "Danh mục mới",
      icon: categoryData.icon || "📁",
      color: categoryData.color || "from-purple-300 to-pink-400",
      bg: categoryData.bg || "bg-purple-50",
    };

    setAppData((prev) => ({
      ...prev,
      categories: [newCategory, ...prev.categories],
    }));

    return newCategory;
  };

  const updateCategory = (categoryId, categoryData) => {
    setAppData((prev) => ({
      ...prev,
      categories: prev.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              ...categoryData,
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
    }));
  };

  const deleteCategory = (categoryId) => {
    setAppData((prev) => ({
      ...prev,
      categories: prev.categories.filter((category) => category.id !== categoryId),
      resources: prev.resources.map((resource) =>
        resource.categoryId === categoryId
          ? {
              ...resource,
              categoryId: "activity",
              category: "Hoạt động của lớp",
            }
          : resource
      ),
    }));
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
              category: category?.name || resourceData.category || resource.category,
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
      resources: prev.resources.filter((resource) => resource.id !== resourceId),
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