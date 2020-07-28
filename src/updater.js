import {autoUpdater} from 'electron-updater'
import {ipcMain} from 'electron'
import {config} from "./common/config";

let mainWindow = null;

export function updateHandle(window) {
    // if (process.env.NODE_ENV === 'development') {
    //     autoUpdater.updateConfigPath = path.join(__dirname, 'app-update.yml')
    //     // mac的地址是'Contents/Resources/app-update.yml'
    // }
    mainWindow = window;
    let message = {
        error: {
            status: 'error',
            msg: 'Checking update exception!'
        },
        updateNotAva: {
            status: 'success',
            msg: 'You now use the version for the latest version, do not need to update!'
        },
        checking: {
            status: 'info',
            msg: 'checking the update...'
        },
        updateAva: {
            status: 'info',
            msg: 'checking a new version, is being downloaded, please later!'
        },
    }
    let versionInfo = ''
    autoUpdater.setFeedURL(config.upgradeServer)
    // 检测更新查询异常
    autoUpdater.on('error', function (error) {
        console.log(error)
        sendUpdateMessage(message)
    })
    // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', function () {
        sendUpdateMessage(message.checking)
    })
    // 当发现有可用更新的时候触发，更新包下载会自动开始
    autoUpdater.on('update-available', function (info) {
        sendUpdateMessage(message.updateAva)
    })
    // 当发现版本为最新版本触发
    autoUpdater.on('update-not-available', function (info) {
        sendUpdateMessage(message.updateNotAva)
    })
    // 下载进度百分比
    autoUpdater.on('download-progress', function (progressObj) {
        mainWindow.webContents.send('downloadProgress', progressObj)
    })
    // 包下载成功时触发
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        // 收到renderer进程确认更新
        ipcMain.on('updateNow', (e, arg) => {
            autoUpdater.quitAndInstall()// 包下载完成后，重启当前的应用并且安装更新
        })
        // 主进程向renderer进程发送是否确认更新
        mainWindow.webContents.send('isUpdateNow', versionInfo)
    })

    ipcMain.on('checkForUpdate', () => {
        // 收到renderer进程的检查通知后，执行自动更新检查
        // autoUpdater.checkForUpdates()
        let checkInfo = autoUpdater.checkForUpdates()
        checkInfo.then(function (data) {
            versionInfo = data.updateInfo // 获取更新包版本等信息
        })
    })
}

//给渲染进程发送消息
function sendUpdateMessage(text) {
    mainWindow.webContents.send('message', text)
}