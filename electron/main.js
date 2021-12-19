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

let mainWindow = null;

ioHook.on("keydown", (key) => {
  // console.log(keyNames[key.keycode]);
  console.log(key.keycode);
  mainWindow.webContents.send("keydown", key.keycode);
});

ioHook.on("keyup", (key) => {
  // console.log(keyNames[key.keycode]);
  console.log(key.keycode);

  mainWindow.webContents.send("keyup", key.keycode);
});

// ioHook.on("mouseclick", (event) => {
//   console.log("click");
//   // mainWindow.webContents.send("mouseclick", event);
// });

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
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      // allowRunningInsecureContent: serve,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
    },
  });

  // app.dock.hide();
  // mainWindow.setAlwaysOnTop(true, "normal");
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.setFullScreenable(false);

  //load the index.html from a url
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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
