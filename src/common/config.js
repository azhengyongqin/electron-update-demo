const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`;
const host = 'http://127.0.0.1:18910';

export const config = {
    //main process
    winURL,
    devTools: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
    port: ':18910',
    title: 'Dragon-AIO v0.1.9-beta',

    //client renderer
    URL: host,
    UPLOAD: host + '/api/common/upload',

    upgradeServer: 'http://localhost:8023/electron/',

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: false,
};
