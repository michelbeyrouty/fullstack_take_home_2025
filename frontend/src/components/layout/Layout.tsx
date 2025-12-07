import "./Layout.css";
import NavMenu from "../library/NavMenu/NavMenu";
import MobileWarning from "../library/MobileWarning/MobileWarning";

interface LayoutProps {
  children?: any;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <MobileWarning />
      <div className="layout custom-background">
        <NavMenu />
        <div className="layout-body">{children}</div>
      </div>
    </>
  );
}
