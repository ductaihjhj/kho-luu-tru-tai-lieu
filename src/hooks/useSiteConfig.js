import { useEffect, useState } from "react";
import { defaultSiteConfig } from "../data/defaultSiteConfig";

const STORAGE_KEY = "site_config";

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState(defaultSiteConfig);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setSiteConfig({
          ...defaultSiteConfig,
          ...JSON.parse(saved),
        });
      } catch {
        setSiteConfig(defaultSiteConfig);
      }
    }
  }, []);

  const updateSiteConfig = (newConfig) => {
    const mergedConfig = {
      ...siteConfig,
      ...newConfig,
    };

    setSiteConfig(mergedConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedConfig));
  };

  const resetSiteConfig = () => {
    setSiteConfig(defaultSiteConfig);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    siteConfig,
    updateSiteConfig,
    resetSiteConfig,
  };
}