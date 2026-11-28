// wass/js/animation_lab.js
// 动画演示页：按钮重放预设 + 三个常驻动画
// Animation demo page: buttons replay presets plus three looping animations
(function () {
    var page = wass.page("animation_lab");
    if (!page) {
        return;
    }

    // 打开时启动三个常驻动画，并让整页渐入 / on open: start three looping animations and fade the page in
    page.onOpen(function () {
        page.spin("spin_box", {speed: 90});
        page.bob("bob_box", {distance: 6, duration: 1200});
        page.preset("breathe_box", "breathe", {});
        page.animateAll("fadeIn", {stagger: 40, duration: 300});
    });

    // 下面每个按钮重放一种预设或手写关键帧 / each button below replays a preset or a hand-written keyframe
    page.onClick("btn_fadein", function () {
        page.preset("anim_box", "fadeIn", {duration: 400});
    });
    page.onClick("btn_slide", function () {
        page.slideIn("anim_box", "left", {duration: 420});
    });
    page.onClick("btn_popin", function () {
        page.preset("anim_box", "popIn", {duration: 420});
    });
    page.onClick("btn_pulse", function () {
        page.preset("anim_box", "pulse", {duration: 380});
    });
    page.onClick("btn_rotate", function () {
        page.animate("anim_box", {
            rotate: [0, 180],
            duration: 600,
            alternate: true,
            loop: 2
        });
    });
    page.onClick("btn_move", function () {
        page.animate("anim_box", {
            translateX: [0, 80],
            duration: 500,
            alternate: true,
            loop: 2
        });
    });
    page.onClick("btn_scale", function () {
        page.animate("anim_box", {
            scale: [1, 1.4],
            duration: 420,
            alternate: true,
            loop: 2
        });
    });
    page.onClick("btn_shake", function () {
        page.preset("anim_box", "shake", {});
    });
    page.onClick("btn_replay", function () {
        page.animate("anim_box", {
            opacity: [0.2, 1],
            scale: [0.8, 1],
            duration: 380
        });
    });
    page.onClick("btn_close_lab", function () {
        page.closeAnimated();
    });
})();
