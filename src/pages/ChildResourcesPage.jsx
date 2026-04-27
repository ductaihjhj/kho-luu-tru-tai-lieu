import React from "react";
import { MOCK_DATA, ResourceCard, EmptyState } from "../components/app-components";

const ChildResourcesPage = ({ resources, onUpload, siteConfig }) => {
  const childName = siteConfig?.childName || MOCK_DATA.user.childName;
  const parentName = siteConfig?.parentName || MOCK_DATA.user.name;

  const childResources = resources.filter((item) =>
    item.title.includes(childName) ||
    item.description.includes(childName) ||
    item.category === "Góc sáng tạo" ||
    item.teacher === parentName
  );

  return (
    <div className="flex-1 min-w-0 space-y-6">
      <div
        className="rounded-3xl p-5 shadow-lg border border-pink-100 overflow-hidden relative"
        style={{
          background:
            "linear-gradient(135deg, #fff7ed 0%, #fdf2f8 50%, #eef2ff 100%)",
        }}
      >
        <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-pink-200/40 blur-xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">
              Góc riêng của bé
            </p>

            <h2
              className="text-2xl font-black text-gray-800"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              ⭐ Tài liệu của bé {childName}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Tập trung vào tác phẩm, hình ảnh và tài liệu liên quan trực tiếp đến bé.
            </p>
          </div>

          <button
            onClick={() => onUpload("Góc sáng tạo")}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-sm btn-bounce shadow-md"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            }}
          >
            <i className="fas fa-upload"></i>
            Thêm tài liệu của bé
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ["🌟", childResources.length, "Tài liệu liên quan"],
          [
            "🎨",
            childResources.filter((r) => r.category === "Góc sáng tạo").length,
            "Tác phẩm sáng tạo",
          ],
          [
            "👀",
            childResources.reduce((sum, r) => sum + (r.views || 0), 0),
            "Lượt xem",
          ],
        ].map(([icon, value, label]) => (
          <div
            key={label}
            className="bg-white/80 rounded-3xl p-4 shadow-sm border border-purple-50"
          >
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-2xl font-black text-purple-700">{value}</div>
            <div className="text-xs text-gray-400 font-semibold">{label}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-lg font-black text-gray-700"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            ✨ Bộ sưu tập của bé
          </h3>

          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-semibold">
            {childResources.length} tài liệu
          </span>
        </div>

        {childResources.length === 0 ? (
          <EmptyState searchQuery="" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {childResources.map((resource, i) => (
              <div
                key={resource.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ResourceCard resource={resource} viewMode="grid" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildResourcesPage;