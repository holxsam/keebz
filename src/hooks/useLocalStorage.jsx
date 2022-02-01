import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const KB_LAYOUTS = "kb_layouts";
const DEFAULT_LAYOUTS = "default_layouts";
const CUSTOM_LAYOUTS = "custom_layouts";
const LAYOUT_ID_SELECTED = "layout_id_selected";

const loadDefaultLayouts = () => {
  const context = require.context("../keyboard-layouts", true, /.json$/);
  const all = [];
  context.keys().forEach((file) => {
    console.log("k", file);
    const fileName = file.replace("./", "");
    const resource = require(`../keyboard-layouts/${fileName}`);
    all.push(JSON.parse(JSON.stringify(resource)));
  });

  return all;
};

// const getIntitialLayouts = () => {
//   const defaultLayouts = window.localStorage.getItem(DEFAULT_LAYOUTS);
//   const customLayouts = window.localStorage.getItem(CUSTOM_LAYOUTS);

//   const initialValue = [
//     ...(defaultLayouts ? JSON.parse(defaultLayouts) : loadJson()),
//     ...(customLayouts ? JSON.parse(customLayouts) : []),
//   ];

//   return initialValue;
// };

const getIntitialLayouts = () => {
  const layouts = window.localStorage.getItem(KB_LAYOUTS);
  return layouts ? JSON.parse(layouts) : loadDefaultLayouts();
};

const getInitialLayoutId = () =>
  JSON.parse(window.localStorage.getItem(LAYOUT_ID_SELECTED));

const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const getBlankLayout = () => ({
  id: nanoid(10),
  name: `Untitled`,
  desc: "",
  custom: true,
  layout: [],
});

const useLocalStorage = () => {
  const [layoutIdSelected, setLayoutIdSelected] = useState(getInitialLayoutId);
  const [layouts, setLayouts] = useState(getIntitialLayouts);

  const selectedLayout =
    layouts.find((layout) => layout.id === layoutIdSelected) ||
    layouts.find((layout) => layout.id === "default2");

  const addLayout = (layout) => {
    setLayouts((list) => [...list, layout]);
  };

  const removeLayout = (layoutId) => {
    setLayouts((list) => {
      const index = list.findIndex((layout) => layout.id === layoutId);
      return index === -1
        ? list
        : [...list.slice(0, index), ...list.slice(index + 1)];
    });
  };

  const copyLayout = (layout) => {
    addLayout({
      ...layout,
      id: nanoid(10),
      name: `${layout.name} (copy)`,
      custom: true,
    });
  };

  const editLayout = (layoutId, keyId, values) => {
    setLayouts((layouts) => {
      const layoutIndex = layouts.findIndex((layout) => layout.id === layoutId);

      if (layoutIndex !== -1) {
        const layoutConfig = layouts[layoutIndex];
        const layout = layoutConfig.layout;

        // key in this context means each key on a keyboard
        const keyIndex = layout.findIndex((key) => key.id === keyId);

        if (keyIndex !== -1) {
          const newKeyValues = { ...layout[keyIndex], ...values };
          const newLayout = [
            ...layout.slice(0, keyIndex),
            ...layout.slice(keyIndex + 1),
            newKeyValues,
          ];
          const newLayoutConfig = { ...layoutConfig, layout: newLayout };

          return [
            ...layouts.slice(0, layoutIndex),
            newLayoutConfig,
            ...layouts.slice(layoutIndex + 1),
          ];
        } else return layouts;
      } else return layouts;
    });
  };

  // const copyLayoutById = (layoutId) => {
  //   const layoutData = layouts.find((layout) => layout.id === layoutId);
  //   if (layoutData) copyLayout(layoutData);
  //   else copyLayout()
  // };

  const changeLayout = () => {};

  useEffect(() => {
    setLocalStorage(KB_LAYOUTS, layouts);
  }, [layouts]);

  useEffect(() => {
    setLocalStorage(LAYOUT_ID_SELECTED, layoutIdSelected);
  }, [layoutIdSelected]);

  return {
    selectedLayout,
    layouts,
    setLayouts,
    addLayout,
    editLayout,
    copyLayout,
    removeLayout,
    layoutIdSelected,
    setLayoutIdSelected,
  };
};

export default useLocalStorage;
