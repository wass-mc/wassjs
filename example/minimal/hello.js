// wass/js/hello.js
// 最小可执行窗口：复制到 <游戏根目录>/wass/js/ 下，配合 menus/hello.xml
// Minimal working window: copy into <game directory>/wass/js/ together with menus/hello.xml
(function () {
    var page = wass.page("hello");
    if (!page) {
        return;                     // 服务端没有界面，直接退出 / no UI on the server, exit
    }

    // 页面打开：更新状态行并让组件依次渐入 / on open: update the status line and fade in the components
    page.onOpen(function () {
        page.text("status", "已连接：" + wass.getSide());
        page.animateAll("fadeIn", {stagger: 20});
    });

    // 点击 Ping：把动作发给服务端 / click Ping: send the action to the server
    page.onClick("btn_ping", function () {
        wass.ui.sendAction("ping", "btn_ping", "hello");
    });
    // 收到服务端返回：显示到状态行 / on the server result: show it in the status line
    page.onAction("ping", function (ctx) {
        page.text("status", "服务端返回：" + ctx.result);
    });

    // 关闭：整页淡出后关闭 / close: fade the page out, then close
    page.onClick("btn_close", function () {
        page.closeAnimated(180);
    });

    // 服务端动作：客户端点击后由服务端执行，返回值回传给页面
    // Server action: runs on the server after the client click, and its return value goes back to the page
    wass.registerAction("hello", "ping", function (ctx) {
        return "pong from " + ctx.name + " (" + ctx.side + ")";
    });
})();
