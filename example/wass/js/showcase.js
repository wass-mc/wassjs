// wass/js/showcase.js
// 全屏菜单：旋转的绿色方块 + 组件渐入 / 渐出
// Fullscreen menu: rotating green square with fade-in and fade-out
(function () {
    var page = wass.page("showcase");
    if (!page) {
        return;                     // 服务端没有界面 / no UI on the server
    }

    page.onOpen(function () {
        // 常驻旋转（每秒 60 度）/ continuous rotation, 60 degrees per second
        page.spin("square", {speed: 60});
        // 出现时弹一下 / a small pop when it appears
        page.preset("square", "popIn", {duration: 520, delay: 120});
        // 所有组件渐入 / fade every component in
        page.animateAll("fadeIn", {stagger: 90, duration: 420});
        page.text("showcase_hint", "§7整屏背景 + 会旋转的方块，全部由 XML + JS 构建");
    });

    // 关闭：整页淡出 / close: fade the page out
    page.onClick("btn_back", function () {
        page.closeAnimated(220);
    });
})();
