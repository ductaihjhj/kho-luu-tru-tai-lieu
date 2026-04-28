import React from "react";
import { getResourcePreviewMeta } from "../utils/resourcePreview";
// ============================================================
// MOCK DATA
// ============================================================
export const MOCK_DATA = {
  className: "Lớp Hoa Mai",
  user: {
    name: "Mẹ Bảo Linh",
    childName: "Bảo Linh",
    avatar: null,
    role: "Phụ huynh",
  },
  categories: [
    {
      id: 1,
      name: "Hoạt động của lớp",
      icon: "🎭",
      color: "from-pink-300 to-rose-400",
      bg: "bg-rose-50",
      count: 24,
    },
    {
      id: 2,
      name: "Bài hát, thơ ca",
      icon: "🎵",
      color: "from-purple-300 to-lavender-400",
      bg: "bg-purple-50",
      count: 18,
    },
    {
      id: 3,
      name: "Truyện kể chuyện",
      icon: "📚",
      color: "from-amber-300 to-orange-400",
      bg: "bg-amber-50",
      count: 32,
    },
    {
      id: 4,
      name: "Hình ảnh, video",
      icon: "🎬",
      color: "from-sky-300 to-blue-400",
      bg: "bg-sky-50",
      count: 47,
    },
    {
      id: 5,
      name: "Góc sáng tạo",
      icon: "🎨",
      color: "from-green-300 to-emerald-400",
      bg: "bg-green-50",
      count: 15,
    },
  ],
  resources: [
    {
      id: 1,
      title: 'Kể chuyện "Chú Ếch Con"',
      description:
        "Câu chuyện về chú ếch con học bơi cùng bạn bè ao làng, rất vui nhộn và bổ ích cho bé.",
      type: "story",
      typeLabel: "Truyện kể",
      category: "Truyện kể chuyện",
      updatedAt: "2 giờ trước",
      views: 128,
      emoji: "🐸",
      color: "from-emerald-200 to-teal-300",
      bgPattern: "bg-emerald-50",
      size: "2.4 MB",
      teacher: "Cô Lan",
    },
    {
      id: 2,
      title: "Buổi sinh hoạt lớp",
      description:
        "Ảnh và video buổi sinh hoạt lớp Hoa Mai tháng 3 - các bé vui chơi và học tập.",
      type: "video",
      typeLabel: "Video",
      category: "Hoạt động của lớp",
      updatedAt: "5 giờ trước",
      views: 95,
      emoji: "🎭",
      color: "from-pink-200 to-rose-300",
      bgPattern: "bg-pink-50",
      size: "45.2 MB",
      teacher: "Cô Hoa",
    },
    {
      id: 3,
      title: 'Bài hát "Con cào cào"',
      description:
        "Bài hát vui nhộn giúp bé phát triển ngôn ngữ và cảm thụ âm nhạc từ sớm.",
      type: "song",
      typeLabel: "Bài hát",
      category: "Bài hát, thơ ca",
      updatedAt: "1 ngày trước",
      views: 212,
      emoji: "🎵",
      color: "from-purple-200 to-violet-300",
      bgPattern: "bg-purple-50",
      size: "5.1 MB",
      teacher: "Cô Mai",
    },
    {
      id: 4,
      title: "Tranh của bé Bảo Linh",
      description:
        "Tác phẩm vẽ tranh màu nước tuyệt vời của bé Bảo Linh trong giờ học mỹ thuật.",
      type: "image",
      typeLabel: "Hình ảnh",
      category: "Góc sáng tạo",
      updatedAt: "2 ngày trước",
      views: 67,
      emoji: "🎨",
      color: "from-yellow-200 to-amber-300",
      bgPattern: "bg-yellow-50",
      size: "1.8 MB",
      teacher: "Cô Lan",
    },
    {
      id: 5,
      title: 'Thơ "Bé học chữ"',
      description:
        "Bài thơ đơn giản giúp bé làm quen với chữ cái tiếng Việt một cách vui nhộn.",
      type: "song",
      typeLabel: "Thơ ca",
      category: "Bài hát, thơ ca",
      updatedAt: "3 ngày trước",
      views: 143,
      emoji: "📝",
      color: "from-sky-200 to-blue-300",
      bgPattern: "bg-sky-50",
      size: "0.5 MB",
      teacher: "Cô Mai",
    },
    {
      id: 6,
      title: "Trò chơi vận động",
      description:
        "Video hướng dẫn các trò chơi vận động giúp bé phát triển thể chất toàn diện.",
      type: "video",
      typeLabel: "Video",
      category: "Hoạt động của lớp",
      updatedAt: "4 ngày trước",
      views: 78,
      emoji: "⚽",
      color: "from-orange-200 to-red-300",
      bgPattern: "bg-orange-50",
      size: "28.3 MB",
      teacher: "Cô Hoa",
    },
    {
      id: 7,
      title: 'Truyện "Rùa và Thỏ"',
      description:
        "Câu chuyện kinh điển về sự kiên nhẫn và cố gắng, giúp bé học bài học quý giá.",
      type: "story",
      typeLabel: "Truyện kể",
      category: "Truyện kể chuyện",
      updatedAt: "5 ngày trước",
      views: 189,
      emoji: "🐢",
      color: "from-lime-200 to-green-300",
      bgPattern: "bg-lime-50",
      size: "3.2 MB",
      teacher: "Cô Lan",
    },
    {
      id: 8,
      title: "Ảnh lễ 8/3",
      description:
        "Bộ ảnh kỷ niệm ngày 8/3 yêu thương, các bé tặng hoa cho cô giáo.",
      type: "image",
      typeLabel: "Hình ảnh",
      category: "Hình ảnh, video",
      updatedAt: "1 tuần trước",
      views: 324,
      emoji: "🌸",
      color: "from-pink-200 to-fuchsia-300",
      bgPattern: "bg-pink-50",
      size: "12.7 MB",
      teacher: "Cô Hoa",
    },
  ],
  notifications: [
    {
      id: 1,
      icon: "💬",
      text: "Cô giáo đã bình luận vào tranh của bé Bảo Linh",
      time: "5 phút trước",
      read: false,
      color: "bg-pink-100",
    },
    {
      id: 2,
      icon: "🎵",
      text: 'Thêm bài hát "Con cào cào" vào danh sách lớp',
      time: "30 phút trước",
      read: false,
      color: "bg-purple-100",
    },
    {
      id: 3,
      icon: "🎬",
      text: "Có video mới trong hoạt động của lớp",
      time: "2 giờ trước",
      read: true,
      color: "bg-sky-100",
    },
    {
      id: 4,
      icon: "📚",
      text: 'Cô giáo vừa thêm truyện "Rùa và Thỏ"',
      time: "1 ngày trước",
      read: true,
      color: "bg-amber-100",
    },
    {
      id: 5,
      icon: "🌟",
      text: "Bé Bảo Linh nhận được sao thưởng tuần này!",
      time: "2 ngày trước",
      read: true,
      color: "bg-yellow-100",
    },
  ],
  categoryCards: [
    {
      id: 1,
      title: "Hoạt động của lớp",
      desc: "Ảnh & video các hoạt động học và chơi tại trường",
      emoji: "🎭",
      count: 24,
      gradient: "from-rose-400 to-pink-500",
      lightGradient: "from-rose-100 to-pink-200",
      icon: "🎪",
    },
    {
      id: 2,
      title: "Bài hát, thơ ca",
      desc: "Âm nhạc và thơ giúp bé yêu thích ngôn ngữ",
      emoji: "🎵",
      count: 18,
      gradient: "from-violet-400 to-purple-500",
      lightGradient: "from-violet-100 to-purple-200",
      icon: "🎼",
    },
    {
      id: 3,
      title: "Truyện kể chuyện",
      desc: "Kho tàng truyện cổ tích và câu chuyện giáo dục",
      emoji: "📚",
      count: 32,
      gradient: "from-amber-400 to-orange-500",
      lightGradient: "from-amber-100 to-orange-200",
      icon: "🦁",
    },
    {
      id: 4,
      title: "Hình ảnh, video",
      desc: "Những khoảnh khắc đáng nhớ của bé tại lớp",
      emoji: "🎬",
      count: 47,
      gradient: "from-sky-400 to-blue-500",
      lightGradient: "from-sky-100 to-blue-200",
      icon: "📸",
    },
  ],
};

// ============================================================
// DECORATIVE SVG COMPONENTS
// ============================================================
export const CloudSVG = ({ className = "", size = 100 }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 100 60"
    className={className}
    fill="none"
  >
    <ellipse cx="50" cy="40" rx="45" ry="20" fill="white" opacity="0.9" />
    <ellipse cx="35" cy="35" rx="25" ry="18" fill="white" opacity="0.9" />
    <ellipse cx="65" cy="33" rx="22" ry="16" fill="white" opacity="0.9" />
    <ellipse cx="50" cy="28" rx="20" ry="16" fill="white" opacity="0.9" />
  </svg>
);

export const RainbowSVG = ({ className = "" }) => (
  <svg
    width="200"
    height="110"
    viewBox="0 0 200 110"
    className={className}
    fill="none"
  >
    <path
      d="M 10 100 Q 100 0 190 100"
      stroke="#FF6B9D"
      strokeWidth="8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M 18 100 Q 100 12 182 100"
      stroke="#FF9F45"
      strokeWidth="8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M 26 100 Q 100 24 174 100"
      stroke="#FFE066"
      strokeWidth="8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M 34 100 Q 100 36 166 100"
      stroke="#6BCF7F"
      strokeWidth="8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M 42 100 Q 100 48 158 100"
      stroke="#4FC3F7"
      strokeWidth="8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M 50 100 Q 100 58 150 100"
      stroke="#A78BFA"
      strokeWidth="8"
      fill="none"
      opacity="0.7"
    />
  </svg>
);

export const BirdSVG = ({ className = "", size = 30 }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 30 18"
    className={className}
    fill="none"
  >
    <path d="M 15 9 Q 10 3 2 6 Q 8 8 15 9" fill="#7DD3FC" opacity="0.8" />
    <path d="M 15 9 Q 20 3 28 6 Q 22 8 15 9" fill="#7DD3FC" opacity="0.8" />
    <circle cx="15" cy="9" r="2" fill="#0EA5E9" opacity="0.8" />
  </svg>
);

export const FlowerSVG = ({ color = "#FF9DE2", size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" className={className}>
    <circle cx="14" cy="14" r="4" fill="#FFD700" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <ellipse
        key={i}
        cx={14 + 7 * Math.cos((angle * Math.PI) / 180)}
        cy={14 + 7 * Math.sin((angle * Math.PI) / 180)}
        rx="3.5"
        ry="2.5"
        transform={`rotate(${angle} ${
          14 + 7 * Math.cos((angle * Math.PI) / 180)
        } ${14 + 7 * Math.sin((angle * Math.PI) / 180)})`}
        fill={color}
        opacity="0.85"
      />
    ))}
  </svg>
);

export const MushroomSVG = ({ className = "", size = 36 }) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 36 44"
    className={className}
  >
    <rect x="14" y="26" width="8" height="14" rx="4" fill="#F5E6D3" />
    <ellipse cx="18" cy="24" rx="14" ry="10" fill="#FF6B6B" />
    <circle cx="12" cy="22" r="3" fill="white" opacity="0.8" />
    <circle cx="22" cy="18" r="2.5" fill="white" opacity="0.8" />
    <circle cx="18" cy="26" r="2" fill="white" opacity="0.8" />
  </svg>
);

export const StarSVG = ({ className = "", size = 20, color = "#FFD700" }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" className={className}>
    <polygon
      points="10,2 12.4,7.5 18.5,7.5 13.7,11.5 15.7,18 10,14 4.3,18 6.3,11.5 1.5,7.5 7.6,7.5"
      fill={color}
    />
  </svg>
);

export const BubbleSVG = ({ className = "", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" className={className}>
    <circle
      cx="10"
      cy="10"
      r="9"
      fill="none"
      stroke="#A78BFA"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <ellipse
      cx="7"
      cy="7"
      rx="2"
      ry="1.5"
      fill="white"
      opacity="0.5"
      transform="rotate(-30 7 7)"
    />
  </svg>
);

export const RabbitIllustration = () => (
  <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
    <ellipse cx="28" cy="22" rx="7" ry="16" fill="#F8C8DC" opacity="0.9" />
    <ellipse cx="52" cy="22" rx="7" ry="16" fill="#F8C8DC" opacity="0.9" />
    <ellipse cx="28" cy="22" rx="4" ry="12" fill="#FFB3CC" opacity="0.7" />
    <ellipse cx="52" cy="22" rx="4" ry="12" fill="#FFB3CC" opacity="0.7" />
    <ellipse cx="40" cy="70" rx="22" ry="28" fill="#FDE8F0" />
    <circle cx="40" cy="45" r="20" fill="#FDE8F0" />
    <circle cx="34" cy="43" r="3" fill="#333" opacity="0.8" />
    <circle cx="46" cy="43" r="3" fill="#333" opacity="0.8" />
    <circle cx="35" cy="42" r="1" fill="white" />
    <circle cx="47" cy="42" r="1" fill="white" />
    <ellipse cx="40" cy="49" rx="4" ry="2.5" fill="#FF9DE2" opacity="0.8" />
    <ellipse cx="30" cy="48" rx="4" ry="2.5" fill="#FFB3CC" opacity="0.5" />
    <ellipse cx="50" cy="48" rx="4" ry="2.5" fill="#FFB3CC" opacity="0.5" />
    <ellipse
      cx="22"
      cy="72"
      rx="6"
      ry="12"
      fill="#FDE8F0"
      transform="rotate(20 22 72)"
    />
    <ellipse
      cx="58"
      cy="72"
      rx="6"
      ry="12"
      fill="#FDE8F0"
      transform="rotate(-20 58 72)"
    />
    <rect
      x="26"
      y="74"
      width="28"
      height="20"
      rx="3"
      fill="#A78BFA"
      opacity="0.9"
    />
    <rect
      x="28"
      y="76"
      width="24"
      height="16"
      rx="2"
      fill="#7FBBF0"
      opacity="0.9"
    />
    <rect
      x="30"
      y="78"
      width="8"
      height="2"
      rx="1"
      fill="white"
      opacity="0.7"
    />
    <rect
      x="30"
      y="82"
      width="14"
      height="2"
      rx="1"
      fill="white"
      opacity="0.5"
    />
    <rect
      x="30"
      y="86"
      width="10"
      height="2"
      rx="1"
      fill="white"
      opacity="0.5"
    />
  </svg>
);

export const BearIllustration = () => (
  <svg width="60" height="75" viewBox="0 0 60 75" fill="none">
    <circle cx="14" cy="16" r="9" fill="#E8B96E" />
    <circle cx="46" cy="16" r="9" fill="#E8B96E" />
    <circle cx="14" cy="16" r="5" fill="#D4955A" />
    <circle cx="46" cy="16" r="5" fill="#D4955A" />
    <ellipse cx="30" cy="56" rx="20" ry="18" fill="#F5D08E" />
    <circle cx="30" cy="32" r="18" fill="#F5D08E" />
    <ellipse cx="30" cy="37" rx="9" ry="7" fill="#E8B96E" opacity="0.8" />
    <circle cx="24" cy="30" r="2.5" fill="#333" opacity="0.8" />
    <circle cx="36" cy="30" r="2.5" fill="#333" opacity="0.8" />
    <circle cx="24.8" cy="29.2" r="1" fill="white" />
    <circle cx="36.8" cy="29.2" r="1" fill="white" />
    <ellipse cx="30" cy="38" rx="3" ry="2" fill="#E07B6E" />
    <circle cx="30" cy="36" r="2.5" fill="#CC5A4A" />
    <ellipse cx="20" cy="35" rx="4" ry="2.5" fill="#FF9DE2" opacity="0.4" />
    <ellipse cx="40" cy="35" rx="4" ry="2.5" fill="#FF9DE2" opacity="0.4" />
    <ellipse cx="30" cy="55" rx="11" ry="9" fill="#F0C070" opacity="0.6" />
  </svg>
);

export const ElephantIllustration = () => (
  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
    <ellipse cx="45" cy="65" rx="30" ry="22" fill="#A5C4E8" />
    <circle cx="45" cy="38" r="22" fill="#A5C4E8" />
    <ellipse cx="18" cy="35" rx="12" ry="16" fill="#8AAFE0" opacity="0.8" />
    <ellipse cx="72" cy="35" rx="12" ry="16" fill="#8AAFE0" opacity="0.8" />
    <ellipse cx="18" cy="35" rx="7" ry="10" fill="#C4DAEA" opacity="0.6" />
    <ellipse cx="72" cy="35" rx="7" ry="10" fill="#C4DAEA" opacity="0.6" />
    <path
      d="M 38 50 Q 32 58 34 68 Q 35 74 38 72"
      stroke="#A5C4E8"
      strokeWidth="8"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="38" cy="34" r="3.5" fill="#333" opacity="0.8" />
    <circle cx="52" cy="34" r="3.5" fill="#333" opacity="0.8" />
    <circle cx="39" cy="33" r="1.2" fill="white" />
    <circle cx="53" cy="33" r="1.2" fill="white" />
    <ellipse cx="30" cy="40" rx="5" ry="3" fill="#FF9DE2" opacity="0.4" />
    <ellipse cx="60" cy="40" rx="5" ry="3" fill="#FF9DE2" opacity="0.4" />
    <rect x="22" y="80" width="12" height="10" rx="6" fill="#8AAFE0" />
    <rect x="38" y="82" width="12" height="8" rx="5" fill="#8AAFE0" />
    <rect x="54" y="82" width="12" height="8" rx="5" fill="#8AAFE0" />
  </svg>
);

export const DuckIllustration = () => (
  <svg width="60" height="65" viewBox="0 0 60 65" fill="none">
    <ellipse cx="30" cy="50" rx="22" ry="14" fill="#FFE066" />
    <circle cx="42" cy="28" r="13" fill="#FFE066" />
    <path d="M 54 26 L 62 28 L 54 30 Z" fill="#FF9F45" />
    <circle cx="46" cy="25" r="2.5" fill="#333" />
    <circle cx="47" cy="24.2" r="1" fill="white" />
    <ellipse
      cx="20"
      cy="48"
      rx="12"
      ry="8"
      fill="#FFC800"
      opacity="0.8"
      transform="rotate(-15 20 48)"
    />
    <path d="M 22 62 L 18 65 L 26 65 Z" fill="#FF9F45" />
    <path d="M 38 62 L 34 65 L 42 65 Z" fill="#FF9F45" />
    <ellipse cx="38" cy="32" rx="3.5" ry="2" fill="#FFB3CC" opacity="0.6" />
  </svg>
);

// ============================================================
// UTILITY
// ============================================================
export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const TYPE_ICONS = {
  story: "📖",
  video: "🎬",
  song: "🎵",
  image: "🖼️",
};

export const TYPE_COLORS = {
  story: "bg-emerald-100 text-emerald-700",
  video: "bg-rose-100 text-rose-700",
  song: "bg-purple-100 text-purple-700",
  image: "bg-amber-100 text-amber-700",
};

// ============================================================
// TOAST COMPONENT
// ============================================================
export const Toast = ({ message, type = "success", onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="toast-enter fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl"
      style={{
        background:
          type === "success"
            ? "linear-gradient(135deg, #86efac, #4ade80)"
            : "linear-gradient(135deg, #fca5a5, #f87171)",
        minWidth: 280,
      }}
    >
      <span className="text-2xl">{type === "success" ? "🎉" : "❌"}</span>
      <div>
        <div className="font-bold text-white text-sm">
          {type === "success" ? "Tuyệt vời!" : "Có lỗi!"}
        </div>
        <div className="text-white text-xs opacity-90">{message}</div>
      </div>
      <button
        onClick={onClose}
        className="ml-auto text-white opacity-70 hover:opacity-100 text-lg"
      >
        ✕
      </button>
    </div>
  );
};

// ============================================================
// HEADER COMPONENT
// ============================================================
export const Header = ({
  onNotificationsClick,
  notifCount,
  onMobileMenuToggle,
  siteConfig,
}) => {
  const config = {
    schoolName: siteConfig?.schoolName || "Nhật Ký Diễn Viên Nhí Số",
    className: siteConfig?.className || MOCK_DATA.className,
    schoolYear: siteConfig?.schoolYear || "Năm học 2024-2025",
    parentName: siteConfig?.parentName || MOCK_DATA.user.name,
    parentRole: siteConfig?.parentRole || MOCK_DATA.user.role,
    parentEmoji: siteConfig?.parentEmoji || "👩",
  };

  return (
    <header
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #a8edea 0%, #fed6e3 40%, #ffecd2 70%, #fcb69f 100%)",
        minHeight: 96,
      }}
    >
      <div className="absolute top-2 left-8 animate-cloud opacity-70">
        <CloudSVG size={80} />
      </div>
      <div className="absolute top-1 left-1/3 animate-cloud2 opacity-60">
        <CloudSVG size={60} />
      </div>
      <div className="absolute top-3 right-24 animate-cloud opacity-50">
        <CloudSVG size={70} />
      </div>
      <div className="absolute top-0 right-64 animate-cloud2 opacity-40">
        <CloudSVG size={50} />
      </div>

      <div className="absolute -top-2 right-10 opacity-50 hidden md:block">
        <RainbowSVG />
      </div>

      <div className="absolute top-6 left-1/2 animate-bird opacity-70">
        <BirdSVG size={24} />
      </div>
      <div
        className="absolute top-3 left-2/3 animate-bird opacity-60"
        style={{ animationDelay: "1s" }}
      >
        <BirdSVG size={18} />
      </div>

      <div
        className="absolute top-2 left-1/4 animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <StarSVG size={14} color="#FFD700" />
      </div>
      <div
        className="absolute top-4 right-1/3 animate-float"
        style={{ animationDelay: "1.2s" }}
      >
        <StarSVG size={10} color="#FFB3CC" />
      </div>

      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/50 backdrop-blur flex items-center justify-center text-purple-600 hover:bg-white/70 transition-all btn-bounce mr-1"
          >
            <i className="fas fa-bars text-lg"></i>
          </button>

          <div
            className="w-12 h-12 rounded-2xl shadow-lg flex items-center justify-center text-2xl animate-bounce-soft"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            🌟
          </div>

          <div>
            <h1
              className="text-lg md:text-2xl font-black leading-tight"
              style={{
                fontFamily: "'Baloo 2', cursive",
                background: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
              }}
            >
              {config.schoolName}
            </h1>

            <p className="text-xs md:text-sm text-purple-600 font-semibold opacity-80">
              🌸 {config.className} – {config.schoolYear}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="relative w-10 h-10 rounded-xl bg-white/50 backdrop-blur flex items-center justify-center hover:bg-white/70 transition-all btn-bounce icon-hover shadow-sm">
            <i className="fas fa-comment-dots text-purple-500 text-lg"></i>
          </button>

          <button
            onClick={onNotificationsClick}
            className="relative w-10 h-10 rounded-xl bg-white/50 backdrop-blur flex items-center justify-center hover:bg-white/70 transition-all btn-bounce icon-hover shadow-sm"
          >
            <i className="fas fa-bell text-amber-500 text-lg"></i>
            {notifCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                {notifCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 bg-white/50 backdrop-blur rounded-2xl px-3 py-1.5 shadow-sm hover:bg-white/70 transition-all cursor-pointer btn-bounce">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-inner"
              style={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              }}
            >
              {config.parentEmoji}
            </div>

            <div className="hidden md:block">
              <div className="text-xs font-bold text-purple-700">
                {config.parentName}
              </div>
              <div className="text-xs text-purple-400">{config.parentRole}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================================
// TOP TABS COMPONENT
// ============================================================
export const TopTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "home", label: "Trang chủ", icon: "🏠" },
    { id: "class", label: "Tài liệu của lớp", icon: "🏫" },
    { id: "child", label: "Tài liệu của con em", icon: "⭐" },
  ];

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-100 px-4 md:px-8">
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm whitespace-nowrap tab-transition btn-bounce",
              activeTab === tab.id
                ? "text-white shadow-lg"
                : "text-gray-500 hover:text-purple-600 hover:bg-purple-50",
            )}
            style={
              activeTab === tab.id
                ? {
                    background:
                      "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                  }
                : {}
            }
          >
            <span className="text-base">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// LEFT SIDEBAR COMPONENT
// ============================================================
export const LeftSidebar = ({ activeMenu, onMenuChange, siteConfig }) => {
  const config = {
    classCardTitle:
      siteConfig?.classCardTitle ||
      siteConfig?.className ||
      MOCK_DATA.className,
    classCardSubtitle:
      siteConfig?.classCardSubtitle ||
      siteConfig?.schoolYear ||
      "Năm học 2024-2025",
    classIcon: siteConfig?.classIcon || "🌸",
  };

  const menuItems = [
    { id: "all", label: "Tất cả tài liệu", icon: "📋", emoji: "📋" },
    { id: "activity", label: "Hoạt động của lớp", icon: "🎭", emoji: "🎭" },
    { id: "song", label: "Bài hát, thơ ca", icon: "🎵", emoji: "🎵" },
    { id: "story", label: "Truyện kể chuyện", icon: "📚", emoji: "📖" },
    { id: "media", label: "Hình ảnh, video", icon: "🎬", emoji: "📸" },
    { id: "creative", label: "Góc sáng tạo", icon: "🎨", emoji: "🖌️" },
  ];

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col"
      style={{ minHeight: "calc(100vh - 140px)" }}
    >
      <div
        className="rounded-3xl overflow-hidden shadow-lg h-full flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%)",
        }}
      >
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 bg-white/60 rounded-2xl px-4 py-3 backdrop-blur shadow-sm">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
              }}
            >
              {config.classIcon}
            </div>

            <div>
              <div
                className="font-black text-purple-700"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                {config.classCardTitle}
              </div>
              <div className="text-xs text-purple-400 font-medium">
                {config.classCardSubtitle}
              </div>
            </div>
          </div>
        </div>

        <nav className="px-4 flex-1">
          <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3 px-2">
            Danh mục
          </div>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onMenuChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-left sidebar-item",
                  activeMenu === item.id
                    ? "text-white shadow-md"
                    : "text-purple-600 hover:bg-white/50",
                )}
                style={
                  activeMenu === item.id
                    ? {
                        background:
                          "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                      }
                    : {}
                }
              >
                <span className="text-xl">{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="mt-auto px-4 pb-4 pt-6">
          <div className="bg-white/40 rounded-3xl p-3 backdrop-blur">
            <div className="text-xs text-center text-purple-500 font-semibold mb-2">
              Bé học giỏi mỗi ngày! 🌟
            </div>

            <div className="flex items-end justify-center gap-2">
              <div className="animate-float" style={{ animationDelay: "0s" }}>
                <RabbitIllustration />
              </div>

              <div className="flex flex-col items-center gap-1">
                <div
                  className="animate-float-slow"
                  style={{ animationDelay: "0.5s" }}
                >
                  <BearIllustration />
                </div>

                <div className="flex gap-1">
                  <MushroomSVG size={22} />
                  <FlowerSVG color="#FF9DE2" size={20} />
                  <FlowerSVG color="#A78BFA" size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ============================================================
// SEARCH BAR COMPONENT
// ============================================================
export const SearchBar = ({ value, onChange }) => (
  <div className="relative flex-1 min-w-48">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
      <i className="fas fa-search text-sm"></i>
    </div>
    <input
      type="text"
      placeholder="Tìm kiếm tài liệu..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-purple-100 bg-white/80 text-purple-700 placeholder-purple-300 font-medium text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all shadow-sm"
    />
  </div>
);

// ============================================================
// FILTER SELECT COMPONENT
// ============================================================
export const FilterSelect = ({ value, onChange }) => {
  const options = [
    { value: "all", label: "Tất cả danh mục" },
    { value: "activity", label: "Hoạt động lớp" },
    { value: "song", label: "Bài hát, thơ ca" },
    { value: "story", label: "Truyện kể" },
    { value: "media", label: "Hình ảnh, video" },
    { value: "creative", label: "Góc sáng tạo" },
  ];

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-3 rounded-2xl border-2 border-purple-100 bg-white/80 text-purple-700 font-semibold text-sm focus:outline-none focus:border-purple-400 focus:bg-white transition-all shadow-sm cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
        <i className="fas fa-chevron-down text-xs"></i>
      </div>
    </div>
  );
};

// ============================================================
// CATEGORY CARD COMPONENT
// ============================================================
export const CategoryCard = ({ card, onUpload }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
  className="card-hover category-card rounded-3xl overflow-hidden cursor-pointer relative"
      style={{
        background:
          "linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
  className={cn(
    "category-card-inner rounded-3xl p-5 flex flex-col gap-3",
    `bg-gradient-to-br ${card.lightGradient}`
  )}
        style={{
          boxShadow: hovered
            ? "0 8px 30px rgba(0,0,0,0.15)"
            : "0 2px 15px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md",
              `bg-gradient-to-br ${card.gradient}`,
            )}
          >
            {card.emoji}
          </div>

          <div className="bg-white/70 rounded-full px-3 py-1 text-xs font-bold text-gray-600 shadow-sm">
            {card.count} tài liệu
          </div>
        </div>

        <div className="flex-1">
          <h3
            className="font-black text-gray-800 text-base leading-tight"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            {card.title}
          </h3>
          <p className="category-card-desc mt-1 text-xs leading-relaxed text-gray-500">
  {card.desc}
</p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpload(card.title);
          }}
          className={cn(
  "category-card-action w-full py-2.5 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 btn-bounce shadow-md",
  `bg-gradient-to-r ${card.gradient}`
)}
        >
          <i className="fas fa-upload text-xs"></i>
          Tải tài liệu lên
        </button>
      </div>
    </div>
  );
};

// ============================================================
// RESOURCE CARD COMPONENT
// ============================================================
const ResourcePreview = ({ resource }) => {
  const preview = getResourcePreviewMeta(resource);

  const fallback = (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        `bg-gradient-to-br ${resource.color || "from-purple-200 to-pink-300"}`
      )}
    >
      <span className="text-5xl">{resource.emoji || "📁"}</span>
    </div>
  );

  if (
    preview.kind === "thumbnail" ||
    preview.kind === "image" ||
    preview.kind === "drive-image"
  ) {
    return (
      <div className="relative h-full w-full bg-purple-50">
        <img
          src={preview.previewUrl}
          alt={resource.title || "Ảnh xem trước"}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      </div>
    );
  }

  if (preview.kind === "video") {
    return (
      <div className="relative h-full w-full bg-black">
        <video
          src={preview.previewUrl}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xl shadow-lg">
            ▶️
          </div>
        </div>
      </div>
    );
  }

  if (preview.kind === "drive-video") {
    return (
      <div className="relative h-full w-full bg-black">
        <img
          src={preview.previewUrl}
          alt={resource.title || "Video xem trước"}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xl shadow-lg">
            ▶️
          </div>
        </div>
      </div>
    );
  }

  if (preview.kind === "drive-document" || preview.kind === "drive-file") {
    return (
      <div className="relative h-full w-full bg-slate-100">
        <img
          src={preview.previewUrl}
          alt={resource.title || "Tài liệu xem trước"}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center bg-white/10">
          <div className="rounded-2xl bg-white/85 px-3 py-2 text-center text-xs font-black text-slate-600 shadow-md">
            📄 Tài liệu
          </div>
        </div>
      </div>
    );
  }

  if (preview.kind === "drive-audio" || preview.kind === "audio") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="mb-2 text-5xl">🎵</div>
        <div className="max-w-[80%] truncate rounded-full bg-white/75 px-3 py-1 text-xs font-black text-purple-500 shadow-sm">
          Âm thanh
        </div>
      </div>
    );
  }

  if (preview.kind === "document") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="mb-2 text-5xl">📄</div>
        <div className="max-w-[80%] rounded-full bg-white/80 px-3 py-1 text-center text-xs font-black text-slate-600 shadow-sm line-clamp-1">
          {resource.fileName || "Tài liệu"}
        </div>
      </div>
    );
  }

  return fallback;
};

export const ResourceCard = ({ resource, viewMode = "grid" }) => {
  if (viewMode === "list") {
    return (
      <div className="card-hover flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-purple-50">
        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl bg-purple-100">
          <ResourcePreview resource={resource} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "text-xs font-bold px-2.5 py-0.5 rounded-full",
                TYPE_COLORS[resource.type] || "bg-purple-100 text-purple-700"
              )}
            >
              {TYPE_ICONS[resource.type] || "📄"}{" "}
              {resource.typeLabel || "Tài liệu"}
            </span>

            <span className="text-xs text-gray-400">
              {resource.updatedAt || "Vừa xong"}
            </span>
          </div>

          <h4 className="font-bold text-gray-800 mt-1 text-sm truncate">
            {resource.title || "Tài liệu chưa có tiêu đề"}
          </h4>

          <p className="text-xs text-gray-500 truncate">
            {resource.description || "Chưa có mô tả."}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={resource.fileUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center hover:bg-purple-200 btn-bounce transition-all"
            title="Xem tài liệu"
          >
            <i className="fas fa-eye text-xs"></i>
          </a>

          <a
            href={resource.fileUrl || "#"}
            target="_blank"
            rel="noreferrer"
            download
            className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 btn-bounce transition-all flex-shrink-0"
            title="Tải xuống"
          >
            <i className="fas fa-download text-xs"></i>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="card-hover resource-card rounded-3xl overflow-hidden bg-white shadow-sm border border-purple-50 flex flex-col">
      <div className="resource-card-preview relative h-32 overflow-hidden">
        <ResourcePreview resource={resource} />

        <div className="absolute top-2 right-2">
          <FlowerSVG color="rgba(255,255,255,0.7)" size={18} />
        </div>

        <div className="absolute bottom-2 left-2">
          <BubbleSVG size={14} />
        </div>

        <div
          className={cn(
            "absolute top-2 left-2 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm bg-white/90 backdrop-blur",
            TYPE_COLORS[resource.type] || "text-purple-700"
          )}
        >
          {TYPE_ICONS[resource.type] || "📄"}{" "}
          {resource.typeLabel || "Tài liệu"}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h4
          className="font-black text-gray-800 text-sm leading-tight line-clamp-2"
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          {resource.title || "Tài liệu chưa có tiêu đề"}
        </h4>

        <p className="text-xs text-gray-500 line-clamp-2 flex-1">
          {resource.description || "Chưa có mô tả."}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          <span className="flex items-center gap-1">
            <i className="fas fa-clock text-purple-300"></i>
            {resource.updatedAt || "Vừa xong"}
          </span>

          <span className="flex items-center gap-1">
            <i className="fas fa-eye text-sky-300"></i>
            {resource.views || 0}
          </span>
        </div>

        <div className="flex gap-2 mt-1">
          <a
            href={resource.fileUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-bold btn-bounce shadow-sm flex items-center justify-center gap-1"
          >
            <i className="fas fa-eye text-xs"></i>
            Xem chi tiết
          </a>

          <a
            href={resource.fileUrl || "#"}
            target="_blank"
            rel="noreferrer"
            download
            className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 btn-bounce transition-all flex-shrink-0"
            title="Tải xuống"
          >
            <i className="fas fa-download text-xs"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// EMPTY STATE COMPONENT
// ============================================================
export const EmptyState = ({ searchQuery }) => (
  <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up">
    <div className="text-6xl mb-4 animate-bounce-soft">🔍</div>

    <div className="w-16 h-16 mx-auto mb-4">
      <ElephantIllustration />
    </div>

    <h3
      className="text-xl font-black text-gray-600 mb-2"
      style={{ fontFamily: "'Baloo 2', cursive" }}
    >
      Không tìm thấy tài liệu
    </h3>

    <p className="text-gray-400 text-sm text-center max-w-xs">
      {searchQuery
        ? `Không có kết quả cho "${searchQuery}". Hãy thử từ khóa khác nhé!`
        : "Chưa có tài liệu nào trong danh mục này."}
    </p>

    <div className="mt-4 flex items-center gap-2">
      <FlowerSVG color="#FFB3CC" size={20} />
      <FlowerSVG color="#A78BFA" size={24} />
      <FlowerSVG color="#93C5FD" size={20} />
    </div>
  </div>
);

// ============================================================
// UPLOAD MODAL COMPONENT
// ============================================================
export const UploadModal = ({ open, onClose, onSuccess, defaultCategory }) => {
  const [dragging, setDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [category, setCategory] = React.useState(
    defaultCategory || "Hoạt động của lớp",
  );
  const [title, setTitle] = React.useState("");
  const fileInputRef = React.useRef();

  React.useEffect(() => {
    if (defaultCategory) setCategory(defaultCategory);
  }, [defaultCategory]);

  const handleDrop = (e) => {
  e.preventDefault();
  setDragging(false);

  const file = e.dataTransfer.files[0];

  if (file) {
    setSelectedFile(file);
    setFileName(file.name);
  }
};

  const handleFile = (e) => {
  const file = e.target.files[0];

  if (file) {
    setSelectedFile(file);
    setFileName(file.name);
  }
};

  const handleUpload = () => {
  if (!selectedFile && !title) return;

  setUploading(true);
  setProgress(0);

  onSuccess("Đang tải tài liệu lên...", {
    title,
    category,
    file: selectedFile,
    fileName: selectedFile?.name || fileName,
    size: selectedFile ? `${Math.round(selectedFile.size / 1024)} KB` : "Mới tải",
  });

  setUploading(false);
  setProgress(0);
  setSelectedFile(null);
  setFileName(null);
  setTitle("");
  onClose();
};

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 modal-overlay"
      style={{
        background: "rgba(91, 33, 182, 0.25)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div
          className="relative px-6 py-5 text-center"
          style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
          }}
        >
          <div className="text-4xl mb-1">☁️</div>

          <h2
            className="text-xl font-black text-white"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            Tải tài liệu lên
          </h2>

          <p className="text-purple-200 text-xs">
            Chia sẻ tài liệu với lớp Hoa Mai
          </p>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all"
          >
            ✕
          </button>

          <div className="absolute top-2 left-4 opacity-50">
            <FlowerSVG color="white" size={20} />
          </div>

          <div className="absolute bottom-2 right-8 opacity-50">
            <StarSVG size={14} color="white" />
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-purple-700 mb-1.5">
              Tiêu đề tài liệu
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Bài hát thiếu nhi tháng 3..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-purple-100 text-gray-700 text-sm font-medium focus:outline-none focus:border-purple-400 transition-all placeholder-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-purple-700 mb-1.5">
              Danh mục
            </label>

            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none px-4 py-3 rounded-2xl border-2 border-purple-100 text-gray-700 text-sm font-medium focus:outline-none focus:border-purple-400 transition-all bg-white pr-10"
              >
                {MOCK_DATA.categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={cn(
              "border-3 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all",
              dragging
                ? "drop-zone-active"
                : "border-purple-200 hover:border-purple-400 hover:bg-purple-50/50",
            )}
            style={{ borderWidth: 2.5 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFile}
            />

            {fileName ? (
              <div className="space-y-1">
                <div className="text-3xl">📄</div>
                <div className="text-sm font-bold text-purple-700 truncate">
                  {fileName}
                </div>
                <div className="text-xs text-purple-400">
                  Nhấn để chọn file khác
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-4xl">☁️</div>
                <div className="text-sm font-bold text-purple-600">
                  Kéo thả file vào đây
                </div>
                <div className="text-xs text-gray-400">
                  hoặc{" "}
                  <span className="text-purple-500 underline">chọn file</span>{" "}
                  từ thiết bị
                </div>
                <div className="text-xs text-gray-400">
                  Hỗ trợ: PDF, MP4, MP3, JPG, PNG
                </div>
              </div>
            )}
          </div>

          {uploading && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-purple-600">
                <span>Đang tải lên...</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="w-full h-3 bg-purple-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #a78bfa, #ec4899)",
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-bold text-sm btn-bounce hover:bg-purple-50 transition-all"
            >
              Huỷ bỏ
            </button>

            <button
              onClick={handleUpload}
              disabled={uploading || (!fileName && !title)}
              className="flex-1 py-3 rounded-2xl text-white font-bold text-sm btn-bounce shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
              }}
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Đang tải...
                </>
              ) : (
                <>
                  <i className="fas fa-upload"></i> Tải lên ngay
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// PARENT PANEL COMPONENT
// ============================================================
export const ParentPanel = ({ onUpload, siteConfig }) => {
  const config = {
    parentName: siteConfig?.parentName || MOCK_DATA.user.name,
    parentEmoji: siteConfig?.parentEmoji || "👩",
    childName: siteConfig?.childName || MOCK_DATA.user.childName,
  };

  return (
    <div
      className="rounded-3xl overflow-hidden shadow-lg"
      style={{
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      }}
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            }}
          >
            {config.parentEmoji}
          </div>

          <div>
            <div className="text-xs font-bold text-orange-500 uppercase tracking-wide">
              Tài khoản
            </div>

            <div
              className="font-black text-orange-800"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              {config.parentName}
            </div>

            <div className="text-xs text-orange-500 flex items-center gap-1">
              <span></span> {config.childName}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/60 rounded-2xl p-3 text-center backdrop-blur">
            <div className="text-2xl font-black text-orange-700">12</div>
            <div className="text-xs text-orange-500 font-semibold">
              Tài liệu đã xem
            </div>
          </div>

          <div className="bg-white/60 rounded-2xl p-3 text-center backdrop-blur">
            <div className="text-2xl font-black text-orange-700">3</div>
            <div className="text-xs text-orange-500 font-semibold">
              Tác phẩm bé
            </div>
          </div>
        </div>

        <button
          onClick={() => onUpload(null)}
          className="w-full py-3.5 rounded-2xl text-white font-black text-sm btn-bounce shadow-lg flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          }}
        >
          <i className="fas fa-upload"></i>✨ Tải tài liệu lên
        </button>
      </div>
    </div>
  );
};

// ============================================================
// NOTIFICATION PANEL COMPONENT
// ============================================================
export const NotificationPanel = ({ notifications, onMarkRead }) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="rounded-3xl overflow-hidden shadow-lg bg-white border border-purple-50">
      <div
        className="px-5 py-4 border-b border-purple-50 flex items-center justify-between"
        style={{
          background: "linear-gradient(135deg, #f5f3ff 0%, #fce7f3 100%)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <i className="fas fa-bell text-white text-sm"></i>
          </div>

          <div>
            <div
              className="font-black text-purple-700 text-sm"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Thông báo
            </div>

            {unreadCount > 0 && (
              <div className="text-xs text-purple-400">
                {unreadCount} chưa đọc
              </div>
            )}
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkRead}
            className="text-xs text-purple-500 font-bold hover:text-purple-700 btn-bounce"
          >
            Đánh dấu đã đọc
          </button>
        )}
      </div>

      <div className="divide-y divide-purple-50">
        {notifications.map((notif, i) => (
          <div
            key={notif.id}
            className={cn(
              "flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-purple-50/50 transition-all animate-fade-in-up",
              !notif.read && "bg-purple-50/30",
            )}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm",
                notif.color,
              )}
            >
              {notif.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={cn(
                  "text-xs leading-snug",
                  !notif.read
                    ? "font-bold text-gray-700"
                    : "font-medium text-gray-500",
                )}
              >
                {notif.text}
              </p>

              <div className="flex items-center gap-1.5 mt-1">
                <i className="fas fa-clock text-gray-300 text-xs"></i>
                <span className="text-xs text-gray-400">{notif.time}</span>

                {!notif.read && (
                  <span className="ml-1 w-2 h-2 rounded-full bg-purple-400 inline-block"></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-4 bg-gradient-to-b from-transparent to-purple-50/50">
        <div className="flex items-end justify-center gap-3">
          <div className="animate-float" style={{ animationDelay: "0.3s" }}>
            <ElephantIllustration />
          </div>

          <div className="flex flex-col items-center gap-1 mb-2">
            <div
              className="animate-float-slow"
              style={{ animationDelay: "0.8s" }}
            >
              <DuckIllustration />
            </div>

            <div className="flex gap-1 flex-wrap justify-center">
              <BubbleSVG size={16} />
              <BubbleSVG size={12} />
              <FlowerSVG color="#FF9DE2" size={16} />
              <FlowerSVG color="#A78BFA" size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MOBILE DRAWER COMPONENT
// ============================================================
export const MobileDrawer = ({
  open,
  onClose,
  activeMenu,
  onMenuChange,
  siteConfig,
}) => {
  const config = {
    classCardTitle:
      siteConfig?.classCardTitle ||
      siteConfig?.className ||
      MOCK_DATA.className,
    classCardSubtitle:
      siteConfig?.classCardSubtitle ||
      siteConfig?.schoolYear ||
      "Năm học 2024-2025",
    classIcon: siteConfig?.classIcon || "🌸",
  };

  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[998] flex">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-72 animate-slide-right flex flex-col"
        style={{
          background:
            "linear-gradient(160deg, #e0f2fe 0%, #ddd6fe 50%, #fce7f3 100%)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/50 backdrop-blur flex items-center justify-center text-purple-600 hover:bg-white/70 transition-all"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 bg-white/60 rounded-2xl px-4 py-3 backdrop-blur">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm"
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
              }}
            >
              {config.classIcon}
            </div>

            <div>
              <div
                className="font-black text-purple-700"
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                {config.classCardTitle}
              </div>

              <div className="text-xs text-purple-400 font-medium">
                {config.classCardSubtitle}
              </div>
            </div>
          </div>
        </div>

        <nav className="px-4 flex-1 overflow-y-auto scrollbar-hide">
          {[
            { id: "all", label: "Tất cả tài liệu", emoji: "📋" },
            { id: "activity", label: "Hoạt động của lớp", emoji: "🎭" },
            { id: "song", label: "Bài hát, thơ ca", emoji: "🎵" },
            { id: "story", label: "Truyện kể chuyện", emoji: "📖" },
            { id: "media", label: "Hình ảnh, video", emoji: "📸" },
            { id: "creative", label: "Góc sáng tạo", emoji: "🖌️" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onMenuChange(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-left sidebar-item mb-1",
                activeMenu === item.id
                  ? "text-white shadow-md"
                  : "text-purple-600 hover:bg-white/50",
              )}
              style={
                activeMenu === item.id
                  ? {
                      background:
                        "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                    }
                  : {}
              }
            >
              <span className="text-xl">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-white/40 rounded-3xl p-3 backdrop-blur flex items-center justify-center gap-2">
            <div className="animate-float">
              <RabbitIllustration />
            </div>

            <div className="flex flex-col gap-1">
              <FlowerSVG color="#FF9DE2" size={20} />
              <MushroomSVG size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// LOADING PAGE COMPONENT
// ============================================================
export const LoadingPage = () => (
  <div
    className="fixed inset-0 flex flex-col items-center justify-center"
    style={{
      background:
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 40%, #ffecd2 70%, #fcb69f 100%)",
    }}
  >
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="absolute -top-8 -left-8 animate-cloud opacity-60">
          <CloudSVG size={80} />
        </div>
        <div className="absolute -top-4 -right-12 animate-cloud2 opacity-50">
          <CloudSVG size={60} />
        </div>
      </div>

      <div className="flex items-end justify-center gap-4">
        <div className="animate-float" style={{ animationDelay: "0s" }}>
          <RabbitIllustration />
        </div>
        <div className="animate-float-slow" style={{ animationDelay: "0.3s" }}>
          <BearIllustration />
        </div>
        <div className="animate-float" style={{ animationDelay: "0.6s" }}>
          <DuckIllustration />
        </div>
      </div>

      <div>
        <h1
          className="text-3xl font-black"
          style={{
            fontFamily: "'Baloo 2', cursive",
            background: "linear-gradient(135deg, #667eea 0%, #f093fb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Nhật Ký Diễn Viên Nhí Số
        </h1>

        <p className="text-purple-500 font-semibold mt-1">
          🌸 Đang tải dữ liệu lớp Hoa Mai...
        </p>
      </div>

      <div className="w-48 h-3 bg-white/50 rounded-full mx-auto overflow-hidden">
        <div
          className="h-full rounded-full animate-progress"
          style={{
            background: "linear-gradient(90deg, #a78bfa, #ec4899, #f59e0b)",
          }}
        />
      </div>

      <div className="flex items-center justify-center gap-2">
        <FlowerSVG color="#FFB3CC" size={22} />
        <FlowerSVG color="#A78BFA" size={26} />
        <FlowerSVG color="#93C5FD" size={22} />
        <StarSVG size={18} color="#FFD700" />
        <FlowerSVG color="#86EFAC" size={22} />
      </div>
    </div>
  </div>
);
