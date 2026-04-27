import React, { useEffect, useState } from "react";
import { defaultSiteConfig } from "../data/defaultSiteConfig";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "123456";
const AUTH_KEY = "admin";

export default function AdminPage({
  siteConfig,
  updateSiteConfig,
  resetSiteConfig,
}) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(AUTH_KEY) === "true",
  );

  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState(siteConfig);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setFormData(siteConfig);
  }, [siteConfig]);

  const handleLogin = (event) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setIsLoggedIn(true);
      setMessage("");
    } else {
      setMessage("Sai mật khẩu rồi nha.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
    setPassword("");
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateSiteConfig(formData);
    setMessage("Đã lưu thay đổi thành công.");
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Bạn có chắc muốn khôi phục nội dung mặc định không?",
    );

    if (!confirmReset) return;

    resetSiteConfig();
    setFormData(defaultSiteConfig);
    setMessage("Đã khôi phục nội dung mặc định.");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#eaf7ff] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-[2rem] bg-white/80 p-6 shadow-xl border border-white"
        >
          <h1 className="text-2xl font-black text-purple-500 mb-2">
            Đăng nhập Admin
          </h1>

          <p className="text-sm text-purple-400 mb-5">
            Nhập mật khẩu để chỉnh sửa nội dung hiển thị.
          </p>

          <input
            type="password"
            placeholder="Mật khẩu admin"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-purple-100 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300"
          />

          {message && (
            <p className="mt-3 text-sm font-semibold text-pink-500">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-2xl bg-purple-500 px-4 py-3 font-bold text-white shadow-lg hover:bg-purple-600"
          >
            Đăng nhập
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-3 w-full rounded-2xl bg-purple-100 px-4 py-3 font-bold text-purple-500 hover:bg-purple-200"
          >
            Quay về trang chính
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaf7ff] p-4">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white/80 p-6 shadow-xl border border-white">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-purple-500">
              Trang quản trị nội dung
            </h1>
            <p className="text-sm text-purple-400">
              Chỉnh sửa các nội dung đang hiển thị ở trang chính.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-2xl bg-purple-100 px-4 py-2 font-bold text-purple-500 hover:bg-purple-200"
            >
              Xem trang
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-2xl bg-pink-100 px-4 py-2 font-bold text-pink-500 hover:bg-pink-200"
            >
              Đăng xuất
            </button>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <AdminInput
            label="Tên ứng dụng"
            value={formData.schoolName}
            onChange={(value) => handleChange("schoolName", value)}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput
              label="Tên lớp"
              value={formData.className}
              onChange={(value) => handleChange("className", value)}
            />

            <AdminInput
              label="Năm học"
              value={formData.schoolYear}
              onChange={(value) => handleChange("schoolYear", value)}
            />
          </div>

          <div className="rounded-3xl bg-purple-50 p-4">
            <h2 className="mb-4 font-black text-purple-500">
              Thông tin phụ huynh
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AdminInput
                label="Emoji"
                value={formData.parentEmoji}
                onChange={(value) => handleChange("parentEmoji", value)}
              />

              <AdminInput
                label="Tên phụ huynh"
                value={formData.parentName}
                onChange={(value) => handleChange("parentName", value)}
              />

              <AdminInput
                label="Vai trò"
                value={formData.parentRole}
                onChange={(value) => handleChange("parentRole", value)}
              />

              <AdminInput
                label="Tên bé"
                value={formData.childName}
                onChange={(value) => handleChange("childName", value)}
              />
            </div>
          </div>

          <div className="rounded-3xl bg-purple-50 p-4">
            <h2 className="mb-4 font-black text-purple-500">Thẻ lớp học</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AdminInput
                label="Icon lớp"
                value={formData.classIcon}
                onChange={(value) => handleChange("classIcon", value)}
              />

              <AdminInput
                label="Tiêu đề"
                value={formData.classCardTitle}
                onChange={(value) => handleChange("classCardTitle", value)}
              />

              <AdminInput
                label="Mô tả"
                value={formData.classCardSubtitle}
                onChange={(value) => handleChange("classCardSubtitle", value)}
              />

              <AdminInput
                label="Tên bé"
                value={formData.childName}
                onChange={(value) => handleChange("childName", value)}
              />
            </div>
          </div>

          {message && (
            <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-600">
              {message}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-2xl bg-purple-500 px-4 py-3 font-bold text-white shadow-lg hover:bg-purple-600"
            >
              Lưu thay đổi
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 rounded-2xl bg-orange-100 px-4 py-3 font-bold text-orange-500 hover:bg-orange-200"
            >
              Khôi phục mặc định
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminInput({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-purple-500">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-purple-100 bg-white px-4 py-3 text-purple-700 outline-none focus:ring-2 focus:ring-purple-300"
      />
    </label>
  );
}
