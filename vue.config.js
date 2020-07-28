module.exports = {
    configureWebpack: {
        // Configuration applied to all builds
    },
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                // "productName": "Dragon-AIO",
                // "appId": "com.dragon.aio",
                // "directories": {
                //     "output": "build"
                // },
                // "copyright": "Copyright @ 2020 dargonbot.io",
                // "files": [
                //     "dist/electron/**/*",
                //     "!**/node_modules/*/{CHANGELOG.md,README.md,README,readme.md,readme}",
                //     "!**/node_modules/*/{test,__tests__,tests,powered-test,example,examples}",
                //     "!**/node_modules/*.d.ts",
                //     "!**/node_modules/.bin",
                //     "!**/*.{iml,o,hprof,orig,pyc,pyo,rbc,swp,csproj,sln,xproj}",
                //     "!.editorconfig",
                //     "!**/._*",
                //     "!**/{.DS_Store,.git,.hg,.svn,CVS,RCS,SCCS,.gitignore,.gitattributes}",
                //     "!**/{__pycache__,thumbs.db,.flowconfig,.idea,.vs,.nyc_output}",
                //     "!**/{appveyor.yml,.travis.yml,circle.yml}",
                //     "!**/{npm-debug.log,yarn.lock,.yarn-integrity,.yarn-metadata.json}"
                // ],
                // "dmg": {
                //     "contents": [
                //         {
                //             "x": 410,
                //             "y": 150,
                //             "type": "link",
                //             "path": "/Applications"
                //         },
                //         {
                //             "x": 130,
                //             "y": 150,
                //             "type": "file"
                //         }
                //     ]
                // },
                // "mac": {
                //     "icon": "build/icons/icon.icns",
                //     "extraResources": [
                //         {
                //             "from": "./src/partner",
                //             "to": "./partner",
                //             "filter": [
                //                 "**/*.dylib",
                //                 "**/*.md"
                //             ]
                //         }
                //     ]
                // },
                // "win": {
                //     "target": [
                //         "nsis-web"
                //     ],
                //     "publish": [
                //         {
                //             "provider": "custom",
                //             "providerName": "alioss",
                //             "localConfig": "./alioss.json",
                //             "path": "/dragon-client/latest",
                //             "releaseType": "release"
                //         },
                //         {
                //             "provider": "custom",
                //             "providerName": "alioss",
                //             "localConfig": "./alioss.json",
                //             "path": "/dragon-client/${os}_${arch}_${version}"
                //         }
                //     ],
                //     "icon": "build/icons/icon.ico"
                // },
                // "extraResources": [
                //     {
                //         "from": "./src/partner",
                //         "to": "../partner",
                //         "filter": [
                //             "**/dragon.dll",
                //             "**/*.md"
                //         ]
                //     },
                //     {
                //         "from": "./src/partner/@dragon",
                //         "to": "../",
                //         "filter": [
                //             "**/d3dcompiler_*.dll"
                //         ]
                //     },
                //     {
                //         "from": "./src/extra",
                //         "to": "../extra",
                //         "filter": [
                //             "**/*"
                //         ]
                //     }
                // ],
                // "nsisWeb": {
                //     "appPackageUrl": "https://dragon-aio.oss-accelerate.aliyuncs.com/dragon-client/latest",
                //     "artifactName": "dragon-installer.${ext}"
                // },
                // "linux": {
                //     "icon": "build/icons"
                // },
                nsis: {
                    oneClick: false,
                    perMachine: false,
                    createDesktopShortcut: "always",
                    allowToChangeInstallationDirectory: true
                },
                publish: [
                    {
                        provider: "generic",
                        url: ""
                    }
                ]

            }
        }
    }
}