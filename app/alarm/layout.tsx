import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Math Alarm",
  description: "수학 문제를 풀어야 꺼지는 간단한 아이폰 알람",
  applicationName: "Math Alarm",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Math Alarm",
  },
  icons: {
    icon: "/alarm-icon.svg",
    apple: "/alarm-icon.svg",
  },
  manifest: "/alarm-manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0f1419",
};

export default function AlarmLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
