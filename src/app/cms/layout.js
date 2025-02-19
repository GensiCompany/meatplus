import LayoutCMS from "@/components/layoutCMS/LayoutCMS";

export const metadata = {
  title: "Quản trị hệ thống",
  description: "Quản trị hệ thống",
};

export default function RootLayout({ children }) {
  return (<LayoutCMS>
    {children}
  </LayoutCMS>);
}
