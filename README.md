# Keebz

Keebz is an Electron + React application that let users create a custom keyboard layouts then get live visual feedback as they type on their keyboard (through the use of ioHook) even if the app is not in focus. This lets users use this application as overlay to their streams or videos to share their input combinations to their audience. It can also be used to visualize custom keyboard layouts that have multiple layers such as ones created by QMK.

# Developer Notes:

## Prerequisite:

1. Node version 14.17.0 (ABI 83)
2. Electron version 12.2.3 (ABI 87)
3. Must use BOTH versions or else program won't run properly (this is a ioHook requirement).

## To develop:

1. start the react dev server: `npm run start-react`
2. open another terminal and start the electron process: `npm run start-electron`

## To distribute the application:

1. build react files: `npm run build-react`
2. build electron files (which really just copies them to the build folder): `npm run build-electron`
3. generate installers: `npm run package`
