export function getGoogleDriveFileId(url = "") {
  if (!url) return null;

  const patterns = [
    /\/file\/d\/([^/]+)/,
    /[?&]id=([^&]+)/,
    /\/d\/([^/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function getFileExtension(fileName = "", fileUrl = "") {
  const source = `${fileName} ${fileUrl}`.toLowerCase();

  const knownExtensions = [
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp",
    "svg",
    "mp4",
    "webm",
    "mov",
    "avi",
    "pdf",
    "doc",
    "docx",
    "ppt",
    "pptx",
    "xls",
    "xlsx",
    "mp3",
    "wav",
  ];

  for (const extension of knownExtensions) {
    if (source.includes(`.${extension}`)) return extension;
  }

  return "";
}

export function isImageFile(extension = "", resource = {}) {
  return (
    ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension) ||
    resource.type === "image" ||
    resource.category?.toLowerCase().includes("ảnh") ||
    resource.category?.toLowerCase().includes("hình")
  );
}

export function isVideoFile(extension = "", resource = {}) {
  return (
    ["mp4", "webm", "mov", "avi"].includes(extension) ||
    resource.type === "video" ||
    resource.category?.toLowerCase().includes("video")
  );
}

export function isAudioFile(extension = "", resource = {}) {
  return (
    ["mp3", "wav"].includes(extension) ||
    resource.type === "song" ||
    resource.category?.toLowerCase().includes("bài hát") ||
    resource.category?.toLowerCase().includes("thơ")
  );
}

export function isDocumentFile(extension = "", resource = {}) {
  return (
    ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(extension) ||
    resource.type === "story" ||
    resource.category?.toLowerCase().includes("truyện") ||
    resource.category?.toLowerCase().includes("tài liệu")
  );
}

export function getResourcePreviewMeta(resource = {}) {
  if (resource.thumbnailUrl) {
    return {
      kind: "thumbnail",
      previewUrl: resource.thumbnailUrl,
    };
  }

  const fileUrl = resource.fileUrl || "";
  const fileName = resource.fileName || "";
  const extension = getFileExtension(fileName, fileUrl);
  const driveId = getGoogleDriveFileId(fileUrl);

  const image = isImageFile(extension, resource);
  const video = isVideoFile(extension, resource);
  const audio = isAudioFile(extension, resource);
  const document = isDocumentFile(extension, resource);

  if (driveId) {
    return {
      kind: video
        ? "drive-video"
        : image
          ? "drive-image"
          : document
            ? "drive-document"
            : audio
              ? "drive-audio"
              : "drive-file",
      previewUrl: `https://drive.google.com/thumbnail?id=${driveId}&sz=w1200`,
      driveId,
    };
  }

  if (image && fileUrl && fileUrl !== "#") {
    return {
      kind: "image",
      previewUrl: fileUrl,
    };
  }

  if (video && fileUrl && fileUrl !== "#") {
    return {
      kind: "video",
      previewUrl: fileUrl,
    };
  }

  if (audio) {
    return {
      kind: "audio",
      previewUrl: "",
    };
  }

  if (document) {
    return {
      kind: "document",
      previewUrl: "",
    };
  }

  return {
    kind: "fallback",
    previewUrl: "",
  };
}