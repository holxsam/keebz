Must use Node version 14.17.0 (ABI 83) with Electron version 12.2.3 (ABI 87) in order for iohook to work.

To develop:

1. start the react dev server: `npm run start-react`
2. open another terminal and start the electron process: `npm run start-electron`

To distribute the application:

1. build react files: `npm run build-react`
2. build electron files (which really just copies them to the build folder): `npm run build-eletron`
3. generate installers: `npm run package`
