import React from "react";
import ArchivePage from "./ArchivePage";

const ClassResourcesPage = ({
  activeMenu,
  resources,
  categories,
  children,
  activeChild,
  onUpload,
  onViewResource,
  siteConfig,
}) => (
  <ArchivePage
    activeMenu={activeMenu}
    onUpload={onUpload}
    resources={resources}
    categories={categories}
    children={children}
    activeChild={activeChild}
    onViewResource={onViewResource}
    siteConfig={siteConfig}
    pageTitle="🏫 Tài liệu của lớp"
    pageDescription={`Tài liệu chung dành cho ${siteConfig?.className || "lớp học"}.`}
  />
);

export default ClassResourcesPage;