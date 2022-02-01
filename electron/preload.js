const { ipcRenderer, app } = require("electron");
window.ipcRenderer = ipcRenderer;
window.currentDirectory = __dirname;
