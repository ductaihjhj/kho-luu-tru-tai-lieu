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
  activeMenu = "all",
  onUpload,
  resources = [],
  categories = [],
  siteConfig,
  pageTitle = "🗂️ Kho lưu trữ tài liệu của lớp",
  pageDescription,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("all");
  const [viewMode, setViewMode] = React.useState("grid");
  const [visibleCount, setVisibleCount] = React.useState(8);

  const safeCategories =
    categories.length > 0
      ? categories
      : [
          {
            id: "activity",
            name: "Hoạt động của lớp",
            icon: "🎭",
            color: "from-rose-400 to-pink-500",
            lightGradient: "from-rose-100 to-pink-200",
          },
          {
            id: "song",
            name: "Bài hát, thơ ca",
            icon: "🎵",
            color: "from-violet-400 to-purple-500",
            lightGradient: "from-violet-100 to-purple-200",
          },
          {
            id: "story",
            name: "Truyện kể chuyện",
            icon: "📚",
            color: "from-amber-400 to-orange-500",
            lightGradient: "from-amber-100 to-orange-200",
          },
          {
            id: "media",
            name: "Hình ảnh, video",
            icon: "🎬",
            color: "from-sky-400 to-blue-500",
            lightGradient: "from-sky-100 to-blue-200",
          },
        ];

  const getCategoryById = (categoryId) => {
    return safeCategories.find((category) => category.id === categoryId);
  };

  const getCategoryByName = (categoryName) => {
    return safeCategories.find((category) => category.name === categoryName);
  };

  const matchesCategory = (resource, categoryId) => {
    if (categoryId === "all") return true;

    const category = getCategoryById(categoryId);

    return (
      resource.categoryId === categoryId ||
      resource.category === categoryId ||
      resource.category === category?.name
    );
  };

  const filtered = (resources || []).filter((resource) => {
    const catFilter = matchesCategory(resource, filterCategory);
    const menuFilter = matchesCategory(resource, activeMenu);

    const title = resource.title || "";
    const description = resource.description || "";
    const categoryName = resource.category || "";

    const search =
      searchQuery.trim() === ""
        ? true
        : title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          categoryName.toLowerCase().includes(searchQuery.toLowerCase());

    return catFilter && menuFilter && search;
  });

  const visible = filtered.slice(0, visibleCount);

  const dynamicCategoryCards = safeCategories.map((category) => {
    const count = (resources || []).filter((resource) => {
      return (
        resource.categoryId === category.id ||
        resource.category === category.name
      );
    }).length;

    return {
      id: category.id,
      title: category.name,
      desc:
        category.description ||
        `Tài liệu thuộc danh mục ${category.name}`,
      emoji: category.icon || "📁",
      count,
      gradient:
        category.gradient ||
        category.color ||
        "from-purple-400 to-pink-500",
      lightGradient:
        category.lightGradient ||
        category.bgGradient ||
        "from-purple-100 to-pink-200",
      icon: category.icon || "📁",
    };
  });

  React.useEffect(() => {
    setVisibleCount(8);
  }, [searchQuery, filterCategory, activeMenu]);

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

        <DynamicFilterSelect
          value={filterCategory}
          onChange={setFilterCategory}
          categories={safeCategories}
        />

        {/* View toggle */}
        <div className="flex gap-1 bg-purple-50 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center transition-all btn-bounce",
              viewMode === "grid"
                ? "bg-white shadow-sm text-purple-600"
                : "text-purple-400 hover:text-purple-600"
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
                : "text-purple-400 hover:text-purple-600"
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
            {dynamicCategoryCards.map((card, index) => (
              <div
                key={card.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
            {visible.map((resource, index) => (
              <div
                key={resource.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <ResourceCard resource={resource} viewMode="grid" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((resource, index) => (
              <div
                key={resource.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <ResourceCard resource={resource} viewMode="list" />
              </div>
            ))}
          </div>
        )}

        {filtered.length > visibleCount && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount((value) => value + 4)}
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
// DYNAMIC FILTER SELECT
// ============================================================

const DynamicFilterSelect = ({ value, onChange, categories = [] }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none pl-4 pr-10 py-3 rounded-2xl border-2 border-purple-100 bg-white/80 text-purple-700 font-semibold text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all shadow-sm cursor-pointer"
      >
        <option value="all">Tất cả danh mục</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.icon || "📁"} {category.name}
          </option>
        ))}
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
        <i className="fas fa-chevron-down text-xs"></i>
      </div>
    </div>
  );
};

export default ArchivePage;