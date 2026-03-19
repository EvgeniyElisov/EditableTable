"use client";

import { ConfigProvider, theme as antdTheme } from "antd";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

export const AntdProvider = ({ children }: PropsWithChildren) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (event?: MediaQueryListEvent) => {
      setIsDark(event ? event.matches : mq.matches);
    };

    apply();

    // Safari fallback: older versions might not support addEventListener on MediaQueryList
    type LegacyMediaQueryList = MediaQueryList & {
      addListener?: (
        listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
      ) => void;
      removeListener?: (
        listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
      ) => void;
    };

    const legacyMq = mq as LegacyMediaQueryList;

    if (typeof legacyMq.addEventListener === "function") {
      legacyMq.addEventListener("change", apply);
      return () => legacyMq.removeEventListener("change", apply);
    }

    legacyMq.addListener?.(apply);
    return () => legacyMq.removeListener?.(apply);
  }, []);

  const token = isDark
    ? {
        colorPrimary: "#4096ff",
        colorBgLayout: "#0b1220",
        colorBgContainer: "#111827",
        colorText: "#e5e7eb",
        fontSize: 14,
        lineHeight: 1.5,
        controlHeight: 36,
        padding: 16,
        borderRadiusLG: 12,
        boxShadowSecondary: "0 14px 40px rgba(0, 0, 0, 0.55)",
      }
    : {
        colorPrimary: "#1677ff",
        colorBgLayout: "#f5f7fb",
        colorBgContainer: "#ffffff",
        colorText: "#1f1f1f",
        fontSize: 14,
        lineHeight: 1.5,
        controlHeight: 36,
        padding: 16,
        borderRadiusLG: 12,
        boxShadowSecondary: "0 8px 24px rgba(0, 0, 0, 0.08)",
      };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token,
        components: {
          Card: {
            bodyPadding: 24,
          },
          Button: {
            fontWeight: 500,
            controlHeight: 36,
            borderRadius: 8,
          },
          Input: {
            controlHeight: 36,
            activeBorderColor: isDark ? "#4096ff" : "#1677ff",
            hoverBorderColor: isDark ? "#74c0ff" : "#4096ff",
          },
          Table: {
            headerBg: isDark ? "#0f172a" : "#f8faff",
            headerColor: isDark ? "#e5e7eb" : "#1f1f1f",
            borderColor: isDark ? "#273244" : "#e6ebf2",
            rowHoverBg: isDark ? "#0b1a33" : "#f5f9ff",
            headerBorderRadius: 10,
            cellPaddingBlock: 12,
            cellPaddingInline: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
