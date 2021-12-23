import DynamicPortal from "./DynamicPortal";

const DrawerItem = ({ children }) => {
  return <DynamicPortal portalId="drawer">{children}</DynamicPortal>;
};

export default DrawerItem;
