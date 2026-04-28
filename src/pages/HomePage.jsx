import React from "react";
import ArchivePage from "./ArchivePage";
import { MOCK_DATA } from "../components/app-components";

const HomePage = ({
  activeMenu,
  resources,
  classResources,
  childResources,
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
    classResources={classResources}
    childResources={childResources}
    categories={categories}
    children={children}
    activeChild={activeChild}
    onViewResource={onViewResource}
    siteConfig={siteConfig}
    pageTitle="🏠 Trang chủ kho tài liệu"
    pageDescription={
      "Tổng quan tài liệu mới nhất và danh mục nổi bật của " +
      (siteConfig?.className || MOCK_DATA.className) +
      "."
    }
  />
);

export default HomePage;