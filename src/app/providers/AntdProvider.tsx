"use client";

import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

export const AntdProvider = ({ children }: PropsWithChildren) => (
  <ConfigProvider
    theme={{
      token: {
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
      },
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
          activeBorderColor: "#1677ff",
          hoverBorderColor: "#4096ff",
        },
        Table: {
          headerBg: "#f8faff",
          headerColor: "#1f1f1f",
          borderColor: "#e6ebf2",
          rowHoverBg: "#f5f9ff",
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
