import React from "react";
import ArchivePage from "./ArchivePage";
import { MOCK_DATA } from "../components/app-components";

const ClassResourcesPage = ({ activeMenu, resources, onUpload, siteConfig }) => {
  const className = siteConfig?.className || MOCK_DATA.className;

  return (
    <ArchivePage
      activeMenu={activeMenu}
      onUpload={onUpload}
      resources={resources}
      siteConfig={siteConfig}
      pageTitle="🏫 Tài liệu của lớp"
      pageDescription={`Kho tài liệu chung của ${className}, gồm hoạt động, bài hát, truyện kể và hình ảnh.`}
    />
  );
};

export default ClassResourcesPage;