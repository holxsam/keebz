const path = require("path");
const url = require("url");
const {
  app,
  BrowserWindow,
  ipcMain,
  screen,
  protocol,
  Menu,
} = require("electron");
const ioHook = require("iohook");

console.log("packaged?:", app.isPackaged);

app.disableHardwareAcceleration();

let mainWindow = null;

ioHook.on("keydown", (key) => {
  console.log("down:", key.keycode);
  mainWindow.webContents.send("keydown", key.keycode);
});

ioHook.on("keyup", (key) => {
  console.log("up  :", key.keycode);
  mainWindow.webContents.send("keyup", key.keycode);
});

ioHook.on("mousedown", (event) => {
  // console.log("mdown:", event);
  mainWindow.webContents.send("mousedown", event);
});

ioHook.on("mouseup", (event) => {
  // console.log("mup  :", event);
  mainWindow.webContents.send("mouseup", event);
});

// lctrl + lshift + lalt + x => toggle dev tools
ioHook.registerShortcut([29, 42, 56, 45], () => {
  if (BrowserWindow.getFocusedWindow().webContents.isDevToolsOpened()) {
    BrowserWindow.getFocusedWindow().webContents.closeDevTools();
    BrowserWindow.getFocusedWindow().setResizable(false);
  } else {
    BrowserWindow.getFocusedWindow().webContents.openDevTools();
    BrowserWindow.getFocusedWindow().setResizable(true);
  }
});

ioHook.start();

const createWindow = () => {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    offscreen: true,
    width: 1000,
    height: 600,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      // allowRunningInsecureContent: serve,
      contextIsolation: false,
      enableRemoteModule: false,
      devTools: true,
      nativeWindowOpen: true,
    },
  });
  // mainWindow.setMenu(null);

  // app.dock.hide();
  // mainWindow.setAlwaysOnTop(true, "normal");
  // mainWindow.setMenuBarVisibility(false);

  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  //load the index.html from a url
  mainWindow.loadURL(startUrl);
  // mainWindow.removeMenu();
};

// IMPORTANT: option should be set to false to make it possible for ioHook global event
// tracker boundaries works correctly.
// app.allowRendererProcessReuse = false;

app.on("ready", () => {
  try {
    createWindow();
  } catch (error) {
    ioHook.stop();
    app.quit();
  }
});

app.on("window-all-closed", () => {
  // Quit when all windows are closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  if (process.platform !== "darwin") {
    ioHook.stop();
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("resize-main-window", (e, width, height) => {
  console.log("RESIZE MAIN WINDOW", width, height);
  mainWindow.setResizable(true);
  mainWindow.setSize(width || 1000, height || 1000);
  mainWindow.setResizable(false);
});

ipcMain.on("close-main-window", () => {
  BrowserWindow.getFocusedWindow().close();
});

ipcMain.on("minimize-main-window", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on("get-cursor-position", () => {
  const mousePosition = screen.getCursorScreenPoint();
  console.log(mousePosition);
});

ipcMain.on("get-window-position", () => {});

ipcMain.on(
  "manual-move-window",
  (e, windowToCursorDelta, currentCursorPosition) => {
    const wxf = currentCursorPosition.x - windowToCursorDelta.x;
    const wyf = currentCursorPosition.y - windowToCursorDelta.y;
    BrowserWindow.getFocusedWindow().setPosition(wxf, wyf);
  }
);

ipcMain.on("open-dev-tools", (e, open) => {
  if (open) BrowserWindow.getFocusedWindow().webContents.openDevTools();
  else BrowserWindow.getFocusedWindow().webContents.closeDevTools();
});

ipcMain.on("register-shortcut", (e, keycodes, fn) => {
  console.log(keycodes, fn);
  ioHook.registerShortcut(keycodes, fn);
});

ipcMain.on("unregister-shortcut", (e, keycodes) => {
  ioHook.unregisterShortcutByKeys(keycodes);
});
