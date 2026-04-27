import React from "react";
import ArchivePage from "./ArchivePage";
import { MOCK_DATA } from "../components/app-components";

const HomePage = ({ activeMenu, resources, onUpload, siteConfig }) => {
  const className = siteConfig?.className || MOCK_DATA.className;

  return (
    <ArchivePage
      activeMenu={activeMenu}
      onUpload={onUpload}
      resources={resources}
      siteConfig={siteConfig}
      pageTitle="🏠 Trang chủ kho tài liệu"
      pageDescription={`Tổng quan tài liệu mới nhất và danh mục nổi bật của ${className}.`}
    />
  );
};

export default HomePage;