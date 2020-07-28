<template>
  <div id="wrapper">
    <h1>我是更新后的客户端程序</h1>
    <button @click="checkUpdate">检测更新</button>
    <Progress v-if="percent" :percent="percent" :stroke-width="20" status="active" text-inside/>
  </div>
</template>

<script>
  import {ipcRenderer} from 'electron'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        modal: false,
        percent: 0,
        message: null,
      };
    },
    created() {
      let vm = this;
      ipcRenderer.on('message', (event, data) => {
        console.log('message', data.msg)
        if (data.status === 'info') return;
        vm.message = data.msg;
        vm.$Notice.info({
          title: 'Notice',
          desc: data.msg,
        });
      })
      ipcRenderer.on('downloadProgress', (event, progressObj) => {
        console.log('downloadProgress', progressObj)
        vm.percent = progressObj.percent;
        // 可自定义下载渲染效果
      })
      ipcRenderer.on('isUpdateNow', (event, versionInfo) => {
        vm.message = versionInfo.remarks;
        // 自定义选择效果，效果自行编写
        let content = "";
        if (versionInfo.remarks) {
          for (let remark of versionInfo.remarks) {
            content += `<p>${remark}</p>`
          }
        }

        vm.$Modal.confirm({
          title: 'new version found: ' + versionInfo.version,
          content: content,
          okText: 'Now Install',
          cancelText: 'Cancel',
          onOk() {
            console.log('开始更新')
            ipcRenderer.send('updateNow')
          },
          onCancel(tx) {
          },
        });
      })
    },
    methods: {
      checkUpdate() { // 用来触发更新函数
        ipcRenderer.send('checkForUpdate')
      },
    },
    beforeDestroy() {
      // 移除ipcRenderer所有事件
      ipcRenderer.removeAllListeners();
    },
    destroyed() {
      // window.clearInterval(interval);
      // window.clearInterval(timeOut);
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  #wrapper {
    background: radial-gradient(
            ellipse at top left,
            rgba(255, 255, 255, 1) 40%,
            rgba(229, 229, 229, .9) 100%
    );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div {
    flex-basis: 50%;
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
