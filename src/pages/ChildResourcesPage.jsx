import React from "react";
import ArchivePage from "./ArchivePage";

const ChildResourcesPage = ({
  resources,
  categories,
  children,
  activeChild,
  onUpload,
  onViewResource,
  siteConfig,
}) => (
  <ArchivePage
    activeMenu="all"
    onUpload={onUpload}
    resources={resources}
    categories={categories}
    children={children}
    activeChild={activeChild}
    onViewResource={onViewResource}
    siteConfig={siteConfig}
    pageTitle={`⭐ Tài liệu riêng của ${activeChild?.nickname || activeChild?.name || "bé"}`}
    pageDescription="Các tài liệu, hình ảnh và nhận xét riêng dành cho bé."
  />
);

export default ChildResourcesPage;