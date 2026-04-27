import React from "react";
import {
  MOCK_DATA,
  cn,
  SearchBar,
  FilterSelect,
  CategoryCard,
  ResourceCard,
  EmptyState,
} from "../components/app-components";

// MAIN CONTENT COMPONENT
// ============================================================
const ArchivePage = ({
  activeMenu,
  onUpload,
  resources,
  siteConfig,
  pageTitle = "🗂️ Kho lưu trữ tài liệu của lớp",
  pageDescription,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("all");
  const [viewMode, setViewMode] = React.useState("grid");
  const [visibleCount, setVisibleCount] = React.useState(8);

  const categoryMap = {
    all: null,
    activity: "Hoạt động của lớp",
    song: "Bài hát, thơ ca",
    story: "Truyện kể chuyện",
    media: "Hình ảnh, video",
    creative: "Góc sáng tạo",
  };

  const filtered = resources.filter((r) => {
    const catFilter =
      filterCategory === "all"
        ? true
        : r.category === categoryMap[filterCategory];
    const menuFilter =
      activeMenu === "all" ? true : r.category === categoryMap[activeMenu];
    const search =
      searchQuery === ""
        ? true
        : r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return catFilter && menuFilter && search;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="flex-1 min-w-0 space-y-6">
      {/* Page title */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h2
            className="text-2xl font-black text-gray-800"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            {pageTitle}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {pageDescription ||
              `Tất cả tài liệu học tập và hoạt động của ${
                siteConfig?.className || MOCK_DATA.className
              }`}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white/80 rounded-2xl p-3 shadow-sm border border-purple-50 backdrop-blur">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <FilterSelect value={filterCategory} onChange={setFilterCategory} />

        {/* View toggle */}
        <div className="flex gap-1 bg-purple-50 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center transition-all btn-bounce",
              viewMode === "grid"
                ? "bg-white shadow-sm text-purple-600"
                : "text-purple-400 hover:text-purple-600",
            )}
          >
            <i className="fas fa-th text-sm"></i>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center transition-all btn-bounce",
              viewMode === "list"
                ? "bg-white shadow-sm text-purple-600"
                : "text-purple-400 hover:text-purple-600",
            )}
          >
            <i className="fas fa-list text-sm"></i>
          </button>
        </div>

        <button
          onClick={() => onUpload(null)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-bold text-sm btn-bounce shadow-md ml-auto"
          style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
          }}
        >
          <i className="fas fa-upload"></i>
          <span className="hidden sm:inline">Tải tài liệu lên</span>
        </button>
      </div>

      {/* Category Cards */}
      {activeMenu === "all" && !searchQuery && filterCategory === "all" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-black text-gray-700"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              🌈 Danh mục nổi bật
            </h3>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {MOCK_DATA.categoryCards.map((card, i) => (
              <div
                key={card.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CategoryCard card={card} onUpload={onUpload} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Latest resources */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-lg font-black text-gray-700"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            ✨{" "}
            {searchQuery
              ? `Kết quả tìm kiếm (${filtered.length})`
              : "Tài liệu mới nhất"}
          </h3>
          {filtered.length > 0 && (
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-semibold">
              {filtered.length} tài liệu
            </span>
          )}
        </div>

        {visible.length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {visible.map((r, i) => (
              <div
                key={r.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ResourceCard resource={r} viewMode="grid" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((r, i) => (
              <div
                key={r.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ResourceCard resource={r} viewMode="list" />
              </div>
            ))}
          </div>
        )}

        {filtered.length > visibleCount && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount((v) => v + 4)}
              className="px-8 py-3 rounded-2xl font-bold text-sm btn-bounce shadow-md text-white"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
              }}
            >
              Xem thêm tài liệu <i className="fas fa-chevron-down ml-1"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================

export default ArchivePage;
