import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const ADMIN_PASSWORD = "123456";
const AUTH_KEY = "admin_logged_in";

const RESOURCE_TYPES = [
  {
    value: "story",
    label: "Truyện kể",
    typeLabel: "Truyện kể",
    emoji: "📚",
    color: "from-amber-200 to-orange-300",
    bgPattern: "bg-amber-50",
  },
  {
    value: "video",
    label: "Video",
    typeLabel: "Video",
    emoji: "🎬",
    color: "from-sky-200 to-blue-300",
    bgPattern: "bg-sky-50",
  },
  {
    value: "song",
    label: "Bài hát",
    typeLabel: "Bài hát",
    emoji: "🎵",
    color: "from-purple-200 to-violet-300",
    bgPattern: "bg-purple-50",
  },
  {
    value: "image",
    label: "Hình ảnh",
    typeLabel: "Hình ảnh",
    emoji: "🎨",
    color: "from-yellow-200 to-amber-300",
    bgPattern: "bg-yellow-50",
  },
];

const EMPTY_RESOURCE_FORM = {
  title: "",
  description: "",
  categoryId: "",
  type: "image",
  targetType: "class",
  childId: "",
  teacher: "",
  uploaderName: "",
  fileName: "",
  fileUrl: "#",
  thumbnailUrl: "",
  size: "Mới tải",
};

export default function AdminPage({
  siteConfig,
  children = [],
  activeChild,
  categories = [],
  resources = [],

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

  resetAllData,
}) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(AUTH_KEY) === "true"
  );

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [activeSection, setActiveSection] = useState("site");

  const [siteForm, setSiteForm] = useState(siteConfig);
  const [childForm, setChildForm] = useState(activeChild || {});
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    icon: "📁",
    color: "from-purple-300 to-pink-400",
    bg: "bg-purple-50",
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [resourceForm, setResourceForm] = useState(EMPTY_RESOURCE_FORM);
  const [editingResourceId, setEditingResourceId] = useState(null);

  const selectedResourceType = useMemo(() => {
    return (
      RESOURCE_TYPES.find((item) => item.value === resourceForm.type) ||
      RESOURCE_TYPES[0]
    );
  }, [resourceForm.type]);

  useEffect(() => {
    setSiteForm(siteConfig);
  }, [siteConfig]);

  useEffect(() => {
    setChildForm(activeChild || {});
  }, [activeChild]);

  useEffect(() => {
    if (!resourceForm.categoryId && categories.length > 0) {
      setResourceForm((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories, resourceForm.categoryId]);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsLoggedIn(true);
      setPassword("");
      setMessage("");
      return;
    }

    setMessage("Sai mật khẩu rồi nha.");
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
    setPassword("");
  };

  const handleSaveSite = (event) => {
    event.preventDefault();

    updateSiteConfig(siteForm);
    showMessage("Đã lưu thông tin trang.");
  };

  const handleSaveChild = (event) => {
    event.preventDefault();

    if (!activeChild?.id) {
      const newChild = createChild({
        name: childForm.name || "Tên bé",
        nickname: childForm.nickname || childForm.name || "Bé",
        avatarEmoji: childForm.avatarEmoji || "⭐",
        parentName: childForm.parentName || siteForm.parentName || "",
      });

      updateSiteConfig({
        activeChildId: newChild.id,
      });

      showMessage("Đã thêm bé mới.");
      return;
    }

    updateChild(activeChild.id, {
      name: childForm.name || "Tên bé",
      nickname: childForm.nickname || childForm.name || "Bé",
      avatarEmoji: childForm.avatarEmoji || "⭐",
      parentName: childForm.parentName || siteForm.parentName || "",
    });

    updateSiteConfig({
      activeChildId: activeChild.id,
    });

    showMessage("Đã lưu thông tin bé.");
  };

  const handleCreateChild = () => {
    const newChild = createChild({
      name: "Tên bé mới",
      nickname: "Bé mới",
      avatarEmoji: "⭐",
      parentName: siteForm.parentName || "",
    });

    updateSiteConfig({
      activeChildId: newChild.id,
    });

    showMessage("Đã tạo bé mới.");
  };

  const handleSelectChild = (childId) => {
    updateSiteConfig({
      activeChildId: childId,
    });
  };

  const handleDeleteChild = (childId) => {
    if (children.length <= 1) {
      showMessage("Cần giữ lại ít nhất 1 bé.");
      return;
    }

    const ok = window.confirm("Bạn có chắc muốn xoá bé này không?");
    if (!ok) return;

    deleteChild(childId);
    showMessage("Đã xoá bé.");
  };

  const handleSaveCategory = (event) => {
    event.preventDefault();

    if (!categoryForm.name.trim()) {
      showMessage("Vui lòng nhập tên danh mục.");
      return;
    }

    if (editingCategoryId) {
      updateCategory(editingCategoryId, categoryForm);
      showMessage("Đã cập nhật danh mục.");
    } else {
      createCategory(categoryForm);
      showMessage("Đã thêm danh mục.");
    }

    setCategoryForm({
      name: "",
      icon: "📁",
      color: "from-purple-300 to-pink-400",
      bg: "bg-purple-50",
    });
    setEditingCategoryId(null);
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setCategoryForm({
      name: category.name || "",
      icon: category.icon || "📁",
      color: category.color || "from-purple-300 to-pink-400",
      bg: category.bg || "bg-purple-50",
    });
  };

  const handleCancelCategory = () => {
    setEditingCategoryId(null);
    setCategoryForm({
      name: "",
      icon: "📁",
      color: "from-purple-300 to-pink-400",
      bg: "bg-purple-50",
    });
  };

  const handleDeleteCategory = (categoryId) => {
    const ok = window.confirm(
      "Xoá danh mục này? Tài liệu thuộc danh mục này sẽ được chuyển về danh mục mặc định."
    );

    if (!ok) return;

    deleteCategory(categoryId);
    showMessage("Đã xoá danh mục.");
  };

const handleSaveResource = async (event) => {
    event.preventDefault();

    if (!resourceForm.title.trim()) {
      showMessage("Vui lòng nhập tiêu đề tài liệu.");
      return;
    }

    const selectedCategory =
      categories.find((item) => item.id === resourceForm.categoryId) ||
      categories[0];

    const uploaderName =
  resourceForm.uploaderName?.trim() ||
  resourceForm.teacher?.trim() ||
  "Người đăng";

const payload = {
  ...resourceForm,

  teacher: uploaderName,
  uploaderName,

  category: selectedCategory?.name || "Hoạt động của lớp",
  typeLabel: typeMeta.typeLabel,
  emoji: typeMeta.emoji,
  color: typeMeta.color,
  bgPattern: typeMeta.bgPattern,

  fileUrl: resourceForm.fileUrl || "#",
  thumbnailUrl: resourceForm.thumbnailUrl || "",
};

    try {
  if (editingResourceId) {
    await updateResource(editingResourceId, payload);
    showMessage("Đã cập nhật tài liệu.");
  } else {
    await createResource(payload);
    showMessage("Đã thêm tài liệu.");
  }

  setEditingResourceId(null);
  setResourceForm({
  ...EMPTY_RESOURCE_FORM,
  categoryId: categories[0]?.id || "",
  childId: activeChild?.id || "",
  teacher: "",
  uploaderName: "",
});
} catch (error) {
  console.error(error);
  showMessage("Lưu tài liệu thất bại.");
}

    setEditingResourceId(null);
    setResourceForm({
  ...EMPTY_RESOURCE_FORM,
  categoryId: categories[0]?.id || "",
  childId: activeChild?.id || "",
  teacher: "",
  uploaderName: "",
});
  };

  const handleEditResource = (resource) => {
    setEditingResourceId(resource.id);
    setActiveSection("resources");

    setResourceForm({
  title: resource.title || "",
  description: resource.description || "",
  categoryId: resource.categoryId || categories[0]?.id || "",
  type: resource.type || "image",
  targetType: resource.targetType || "class",
  childId: resource.childId || activeChild?.id || "",
  teacher: resource.teacher || resource.uploaderName || "",
  uploaderName: resource.uploaderName || resource.teacher || "",
  fileName: resource.fileName || "",
  fileUrl: resource.fileUrl || "#",
  thumbnailUrl: resource.thumbnailUrl || "",
  size: resource.size || "Mới tải",
});
  };

  const handleCancelResource = () => {
    setEditingResourceId(null);
    setResourceForm({
  ...EMPTY_RESOURCE_FORM,
  categoryId: categories[0]?.id || "",
  childId: activeChild?.id || "",
  teacher: "",
  uploaderName: "",
});
  };

  const handleDeleteResource = async (resourceId) => {
  const ok = window.confirm("Bạn có chắc muốn xoá tài liệu này không?");
  if (!ok) return;

  try {
    await deleteResource(resourceId);
    showMessage("Đã xoá tài liệu.");
  } catch (error) {
    console.error(error);
    showMessage("Xoá tài liệu thất bại.");
  }
};

  const handleResetAllData = () => {
    const ok = window.confirm(
      "Bạn có chắc muốn xoá toàn bộ dữ liệu đã chỉnh và khôi phục mặc định không?"
    );

    if (!ok) return;

    resetAllData();
    showMessage("Đã khôi phục dữ liệu mặc định.");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[2rem] bg-white/90 p-6 shadow-xl border border-purple-100"
        >
          <div className="mb-5 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-400 to-pink-400 text-3xl shadow-lg">
              🔐
            </div>

            <h1
              className="text-2xl font-black text-purple-600"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Đăng nhập Admin
            </h1>

            <p className="mt-1 text-sm font-semibold text-purple-400">
              Nhập mật khẩu để quản lý nội dung app.
            </p>
          </div>

          <input
            type="password"
            placeholder="Mật khẩu admin"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border-2 border-purple-100 bg-white px-4 py-3 text-purple-700 outline-none transition focus:border-purple-400"
          />

          {message && (
            <p className="mt-3 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-bold text-pink-500">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-3 font-black text-white shadow-lg btn-bounce"
          >
            Đăng nhập
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-3 w-full rounded-2xl bg-purple-50 px-4 py-3 font-black text-purple-500 btn-bounce"
          >
            Quay về trang chính
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="rounded-[2rem] border border-purple-100 bg-white/90 p-5 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-pink-400">
                Admin Dashboard
              </p>

              <h1
                className="text-2xl font-black text-purple-700 md:text-3xl"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                Quản trị Nhật Ký Diễn Viên Nhí
              </h1>

              <p className="mt-1 text-sm font-semibold text-gray-400">
                Chỉnh nội dung, danh mục và tài liệu hiển thị trong app.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-2xl bg-purple-50 px-4 py-2 text-sm font-black text-purple-600 btn-bounce"
              >
                Xem trang
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-pink-50 px-4 py-2 text-sm font-black text-pink-500 btn-bounce"
              >
                Đăng xuất
              </button>
            </div>
          </div>

          {message && (
            <div className="mt-4 rounded-2xl bg-green-50 px-4 py-3 text-sm font-black text-green-600">
              {message}
            </div>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[2rem] border border-purple-100 bg-white/90 p-3 shadow-sm">
            <AdminNavButton
              active={activeSection === "site"}
              icon="🏫"
              label="Thông tin trang"
              onClick={() => setActiveSection("site")}
            />

            <AdminNavButton
              active={activeSection === "children"}
              icon="⭐"
              label="Thông tin bé"
              onClick={() => setActiveSection("children")}
            />

            <AdminNavButton
              active={activeSection === "categories"}
              icon="📁"
              label="Danh mục"
              onClick={() => setActiveSection("categories")}
            />

            <AdminNavButton
              active={activeSection === "resources"}
              icon="📚"
              label="Tài liệu"
              onClick={() => setActiveSection("resources")}
            />

            <div className="mt-3 border-t border-purple-100 pt-3">
              <button
                type="button"
                onClick={handleResetAllData}
                className="w-full rounded-2xl bg-orange-50 px-4 py-3 text-left text-sm font-black text-orange-500 btn-bounce"
              >
                🧹 Reset dữ liệu demo
              </button>
            </div>
          </aside>

          <section className="min-w-0">
            {activeSection === "site" && (
              <SiteSettingsSection
                siteForm={siteForm}
                setSiteForm={setSiteForm}
                onSave={handleSaveSite}
              />
            )}

            {activeSection === "children" && (
              <ChildrenSection
                children={children}
                activeChild={activeChild}
                childForm={childForm}
                setChildForm={setChildForm}
                onSave={handleSaveChild}
                onCreateChild={handleCreateChild}
                onSelectChild={handleSelectChild}
                onDeleteChild={handleDeleteChild}
              />
            )}

            {activeSection === "categories" && (
              <CategoriesSection
                categories={categories}
                categoryForm={categoryForm}
                setCategoryForm={setCategoryForm}
                editingCategoryId={editingCategoryId}
                onSave={handleSaveCategory}
                onEdit={handleEditCategory}
                onCancel={handleCancelCategory}
                onDelete={handleDeleteCategory}
              />
            )}

            {activeSection === "resources" && (
              <ResourcesSection
                resources={resources}
                categories={categories}
                children={children}
                activeChild={activeChild}
                resourceForm={resourceForm}
                setResourceForm={setResourceForm}
                editingResourceId={editingResourceId}
                onSave={handleSaveResource}
                onEdit={handleEditResource}
                onCancel={handleCancelResource}
                onDelete={handleDeleteResource}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function SiteSettingsSection({ siteForm, setSiteForm, onSave }) {
  return (
    <AdminCard title="🏫 Thông tin trang" description="Sửa tên app, lớp học, năm học và thông tin phụ huynh.">
      <form onSubmit={onSave} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminInput
            label="Tên ứng dụng"
            value={siteForm.schoolName || ""}
            onChange={(value) =>
              setSiteForm((prev) => ({ ...prev, schoolName: value }))
            }
          />

          <AdminInput
            label="Tên lớp"
            value={siteForm.className || ""}
            onChange={(value) =>
              setSiteForm((prev) => ({ ...prev, className: value }))
            }
          />

          <AdminInput
            label="Năm học"
            value={siteForm.schoolYear || ""}
            onChange={(value) =>
              setSiteForm((prev) => ({ ...prev, schoolYear: value }))
            }
          />
        </div>

        <div className="rounded-3xl bg-purple-50 p-4">
          <h3 className="mb-4 font-black text-purple-600">
            Thông tin phụ huynh
          </h3>

          <div className="grid gap-4 md:grid-cols-3">
            <AdminInput
              label="Emoji phụ huynh"
              value={siteForm.parentEmoji || ""}
              onChange={(value) =>
                setSiteForm((prev) => ({ ...prev, parentEmoji: value }))
              }
            />

            <AdminInput
              label="Tên phụ huynh"
              value={siteForm.parentName || ""}
              onChange={(value) =>
                setSiteForm((prev) => ({ ...prev, parentName: value }))
              }
            />

            <AdminInput
              label="Vai trò"
              value={siteForm.parentRole || ""}
              onChange={(value) =>
                setSiteForm((prev) => ({ ...prev, parentRole: value }))
              }
            />
          </div>
        </div>

        <div className="rounded-3xl bg-pink-50 p-4">
          <h3 className="mb-4 font-black text-pink-600">Thẻ lớp học</h3>

          <div className="grid gap-4 md:grid-cols-3">
            <AdminInput
              label="Icon lớp"
              value={siteForm.classIcon || ""}
              onChange={(value) =>
                setSiteForm((prev) => ({ ...prev, classIcon: value }))
              }
            />

            <AdminInput
              label="Tiêu đề thẻ"
              value={siteForm.classCardTitle || ""}
              onChange={(value) =>
                setSiteForm((prev) => ({ ...prev, classCardTitle: value }))
              }
            />

            <AdminInput
              label="Mô tả thẻ"
              value={siteForm.classCardSubtitle || ""}
              onChange={(value) =>
                setSiteForm((prev) => ({ ...prev, classCardSubtitle: value }))
              }
            />
          </div>
        </div>

        <SubmitButton>Lưu thông tin trang</SubmitButton>
      </form>
    </AdminCard>
  );
}

function ChildrenSection({
  children,
  activeChild,
  childForm,
  setChildForm,
  onSave,
  onCreateChild,
  onSelectChild,
  onDeleteChild,
}) {
  return (
    <AdminCard title="⭐ Thông tin bé" description="Quản lý bé đang được hiển thị ở trang phụ huynh.">
      <div className="mb-5 flex flex-wrap gap-2">
        {children.map((child) => (
          <button
            key={child.id}
            type="button"
            onClick={() => onSelectChild(child.id)}
            className={[
              "rounded-2xl px-4 py-2 text-sm font-black btn-bounce",
              activeChild?.id === child.id
                ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md"
                : "bg-purple-50 text-purple-500",
            ].join(" ")}
          >
            {child.avatarEmoji || "⭐"} {child.nickname || child.name}
          </button>
        ))}

        <button
          type="button"
          onClick={onCreateChild}
          className="rounded-2xl bg-green-50 px-4 py-2 text-sm font-black text-green-600 btn-bounce"
        >
          + Thêm bé
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-4">
          <AdminInput
            label="Emoji bé"
            value={childForm.avatarEmoji || ""}
            onChange={(value) =>
              setChildForm((prev) => ({ ...prev, avatarEmoji: value }))
            }
          />

          <AdminInput
            label="Tên bé"
            value={childForm.name || ""}
            onChange={(value) =>
              setChildForm((prev) => ({ ...prev, name: value }))
            }
          />

          <AdminInput
            label="Tên hiển thị"
            value={childForm.nickname || ""}
            onChange={(value) =>
              setChildForm((prev) => ({ ...prev, nickname: value }))
            }
          />

          <AdminInput
            label="Tên phụ huynh của bé"
            value={childForm.parentName || ""}
            onChange={(value) =>
              setChildForm((prev) => ({ ...prev, parentName: value }))
            }
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SubmitButton>Lưu thông tin bé</SubmitButton>

          {activeChild?.id && (
            <button
              type="button"
              onClick={() => onDeleteChild(activeChild.id)}
              className="flex-1 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-500 btn-bounce"
            >
              Xoá bé đang chọn
            </button>
          )}
        </div>
      </form>
    </AdminCard>
  );
}

function CategoriesSection({
  categories,
  categoryForm,
  setCategoryForm,
  editingCategoryId,
  onSave,
  onEdit,
  onCancel,
  onDelete,
}) {
  return (
    <AdminCard title="📁 Danh mục tài liệu" description="Thêm, sửa hoặc xoá danh mục trong kho tài liệu.">
      <form onSubmit={onSave} className="mb-6 rounded-3xl bg-purple-50 p-4">
        <h3 className="mb-4 font-black text-purple-600">
          {editingCategoryId ? "Sửa danh mục" : "Thêm danh mục"}
        </h3>

        <div className="grid gap-4 md:grid-cols-4">
          <AdminInput
            label="Icon"
            value={categoryForm.icon}
            onChange={(value) =>
              setCategoryForm((prev) => ({ ...prev, icon: value }))
            }
          />

          <AdminInput
            label="Tên danh mục"
            value={categoryForm.name}
            onChange={(value) =>
              setCategoryForm((prev) => ({ ...prev, name: value }))
            }
          />

          <AdminInput
            label="Gradient màu"
            value={categoryForm.color}
            onChange={(value) =>
              setCategoryForm((prev) => ({ ...prev, color: value }))
            }
          />

          <AdminInput
            label="Background"
            value={categoryForm.bg}
            onChange={(value) =>
              setCategoryForm((prev) => ({ ...prev, bg: value }))
            }
          />
        </div>

        <div className="mt-4 flex gap-3">
          <SubmitButton>
            {editingCategoryId ? "Lưu danh mục" : "Thêm danh mục"}
          </SubmitButton>

          {editingCategoryId && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-black text-gray-500 btn-bounce"
            >
              Huỷ sửa
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-3 md:grid-cols-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl border border-purple-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-3xl">{category.icon}</div>
                <h4 className="mt-2 font-black text-gray-700">
                  {category.name}
                </h4>
                <p className="text-xs font-semibold text-gray-400">
                  ID: {category.id}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(category)}
                  className="rounded-xl bg-purple-50 px-3 py-2 text-xs font-black text-purple-500 btn-bounce"
                >
                  Sửa
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(category.id)}
                  className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-500 btn-bounce"
                >
                  Xoá
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}

function ResourcesSection({
  resources,
  categories,
  children,
  activeChild,
  resourceForm,
  setResourceForm,
  editingResourceId,
  onSave,
  onEdit,
  onCancel,
  onDelete,
}) {
  return (
    <AdminCard title="📚 Tài liệu" description="Thêm, sửa, xoá tài liệu và gắn tài liệu cho lớp hoặc riêng từng bé.">
      <form onSubmit={onSave} className="mb-6 rounded-3xl bg-purple-50 p-4">
        <h3 className="mb-4 font-black text-purple-600">
          {editingResourceId ? "Sửa tài liệu" : "Thêm tài liệu"}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Tiêu đề"
            value={resourceForm.title}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, title: value }))
            }
          />
<AdminInput
  label="Tên người đăng"
  value={resourceForm.uploaderName || resourceForm.teacher || ""}
  onChange={(value) =>
    setResourceForm((prev) => ({
      ...prev,
      uploaderName: value,
      teacher: value,
    }))
  }
/>
          <AdminSelect
            label="Danh mục"
            value={resourceForm.categoryId}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, categoryId: value }))
            }
            options={categories.map((category) => ({
              value: category.id,
              label: `${category.icon} ${category.name}`,
            }))}
          />

          <AdminSelect
            label="Loại tài liệu"
            value={resourceForm.type}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, type: value }))
            }
            options={RESOURCE_TYPES.map((type) => ({
              value: type.value,
              label: `${type.emoji} ${type.label}`,
            }))}
          />

          <AdminSelect
            label="Hiển thị cho"
            value={resourceForm.targetType}
            onChange={(value) =>
              setResourceForm((prev) => ({
                ...prev,
                targetType: value,
                childId: value === "child" ? activeChild?.id || "" : "",
              }))
            }
            options={[
              { value: "class", label: "Cả lớp" },
              { value: "child", label: "Riêng một bé" },
            ]}
          />

          {resourceForm.targetType === "child" && (
            <AdminSelect
              label="Chọn bé"
              value={resourceForm.childId}
              onChange={(value) =>
                setResourceForm((prev) => ({ ...prev, childId: value }))
              }
              options={children.map((child) => ({
                value: child.id,
                label: `${child.avatarEmoji || "⭐"} ${
                  child.nickname || child.name
                }`,
              }))}
            />
          )}

          <AdminInput
            label="Giáo viên / người đăng"
            value={resourceForm.teacher}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, teacher: value }))
            }
          />

          <AdminInput
            label="Tên file"
            value={resourceForm.fileName}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, fileName: value }))
            }
          />

          <AdminInput
            label="Link file"
            value={resourceForm.fileUrl}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, fileUrl: value }))
            }
          />

          <AdminInput
  label="Link ảnh bìa / thumbnail"
  value={resourceForm.thumbnailUrl}
  onChange={(value) =>
    setResourceForm((prev) => ({ ...prev, thumbnailUrl: value }))
  }
/>

          <AdminInput
            label="Dung lượng"
            value={resourceForm.size}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, size: value }))
            }
          />
        </div>

        <div className="mt-4">
          <AdminTextarea
            label="Mô tả"
            value={resourceForm.description}
            onChange={(value) =>
              setResourceForm((prev) => ({ ...prev, description: value }))
            }
          />
        </div>

        <div className="mt-4 flex gap-3">
          <SubmitButton>
            {editingResourceId ? "Lưu tài liệu" : "Thêm tài liệu"}
          </SubmitButton>

          {editingResourceId && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-2xl bg-gray-100 px-4 py-3 text-sm font-black text-gray-500 btn-bounce"
            >
              Huỷ sửa
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {resources.length === 0 ? (
          <div className="rounded-3xl bg-white p-6 text-center text-sm font-bold text-gray-400">
            Chưa có tài liệu.
          </div>
        ) : (
          resources.map((resource) => {
            const child = children.find((item) => item.id === resource.childId);

            return (
              <div
                key={resource.id}
                className="rounded-3xl border border-purple-100 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-black text-purple-500">
                        {resource.emoji} {resource.typeLabel}
                      </span>

                      <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-black text-pink-500">
                        {resource.category}
                      </span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-500">
                        {resource.targetType === "child"
                          ? `Riêng: ${child?.nickname || child?.name || "Bé"}`
                          : "Cả lớp"}
                      </span>
                    </div>

                    <h4 className="truncate font-black text-gray-700">
                      {resource.title}
                    </h4>

                    <p className="line-clamp-2 text-sm font-semibold text-gray-400">
                      {resource.description}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-400">
                      File: {resource.fileName || "Chưa có"} ·{" "}
                      {resource.size || "Không rõ"}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(resource)}
                      className="rounded-xl bg-purple-50 px-3 py-2 text-xs font-black text-purple-500 btn-bounce"
                    >
                      Sửa
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(resource.id)}
                      className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-500 btn-bounce"
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminCard>
  );
}

function AdminCard({ title, description, children }) {
  return (
    <div className="rounded-[2rem] border border-purple-100 bg-white/90 p-5 shadow-lg">
      <div className="mb-5">
        <h2
          className="text-xl font-black text-purple-700"
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm font-semibold text-gray-400">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

function AdminNavButton({ active, icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-black btn-bounce",
        active
          ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-md"
          : "bg-transparent text-purple-500 hover:bg-purple-50",
      ].join(" ")}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function AdminInput({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-purple-500">
        {label}
      </span>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border-2 border-purple-100 bg-white px-4 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-purple-400"
      />
    </label>
  );
}

function AdminTextarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-purple-500">
        {label}
      </span>

      <textarea
        value={value}
        rows={4}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none rounded-2xl border-2 border-purple-100 bg-white px-4 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-purple-400"
      />
    </label>
  );
}

function AdminSelect({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-purple-500">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border-2 border-purple-100 bg-white px-4 py-3 text-sm font-bold text-gray-700 outline-none transition focus:border-purple-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      className="flex-1 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-3 text-sm font-black text-white shadow-lg btn-bounce"
    >
      {children}
    </button>
  );
}