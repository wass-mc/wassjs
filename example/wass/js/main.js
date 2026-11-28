// wass/js/main.js
// 商店页（main）：数据来自 wass/json/shop.json，结构来自 wass/menus/main.xml。
// Shop page (main): data comes from wass/json/shop.json, structure from wass/menus/main.xml.
// 用 IIFE 隔离作用域，避免多个页面脚本的同名函数互相覆盖。
// Wrapped in an IIFE so same-named functions in different page scripts do not overwrite each other.
(function () {
    var data = wass.json("shop");
    var page = wass.page("main");

    var state = {
        selectedKey: data && data.groups ? data.groups[0].items[0].key : "diamond",
        quantity: 1
    };

    function findItem(key) {
        if (!data || !data.groups) {
            return null;
        }
        for (var g = 0; g < data.groups.length; g++) {
            var items = data.groups[g].items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].key === key) {
                    return items[i];
                }
            }
        }
        return null;
    }

    function currency() {
        return data && data.currency ? data.currency : "金币";
    }

    function refresh() {
        if (!page || !data) {
            return;
        }
        var item = findItem(state.selectedKey) || data.groups[0].items[0];
        var total = item.price * state.quantity;
        page.text("selected_label", "§7当前商品：" + item.name + " §8(" + item.item + ")");
        page.text("qty_label", "购买数量：§e" + state.quantity);
        page.text("total_label", "总计：§e" + total + " §7" + currency());
        page.progress("stock_bar", state.quantity);
    }

    function highlight() {
        if (!page) {
            return;
        }
        page.style("card_diamond", {background: state.selectedKey === "diamond" ? "#66FF5555" : "#33FF8888"});
        page.style("card_iron", {background: state.selectedKey === "iron" ? "#66FF5555" : "#33FF8888"});
    }

    function select(key) {
        state.selectedKey = key;
        highlight();
        refresh();
        if (page) {
            page.sound("minecraft:ui.button.click");
        }
    }

    function applyData() {
        if (!page || !data) {
            return;
        }
        var group = data.groups[0];
        page.text("shop_title", data.shop.title);
        page.text("shop_subtitle", data.shop.subtitle);
        for (var i = 0; i < group.items.length; i++) {
            var item = group.items[i];
            page.text("name_" + item.key, item.name);
            page.text("price_" + item.key, "§e" + item.price + " §7" + currency() + " / " + item.unit);
            page.text("desc_" + item.key, item.desc);
            // Display Panel：图标 / 朝向 / 角度全部来自 JSON
            // Display Panel: icon, orientation and angle all come from JSON
            page.setItem("item_" + item.key, item.item, {
                orientation: item.orientation,
                angle: item.angle
            });
        }
        highlight();
        refresh();
    }

    // 服务端动作：服务端按 key 重新查价，再执行 /say 播报
    // Server action: look the price up again by key on the server, then broadcast with /say
    // /say Player<name> purchased <qty> <item>, spending <coins> coins in total!
    function buy(ctx) {
        var payload = ctx.payload == null ? "" : String(ctx.payload);
        var parts = payload.split(":");
        var key = parts.length > 0 ? parts[0] : "";
        var quantity = parts.length > 1 ? parseInt(parts[1], 10) : 1;
        if (!quantity || quantity < 1) {
            quantity = 1;
        }
        var item = findItem(key);
        if (!item) {
            return "§c商品不存在：" + key;
        }
        var coins = item.price * quantity;
        var command = "say Player" + ctx.name + " purchased " + quantity + " "
                + item.item + ", spending " + coins + " coins in total!";

        var asPlayer = false;
        try {
            asPlayer = ctx.player.hasPermissions(2);
        } catch (error) {
            asPlayer = false;
        }
        if (asPlayer) {
            wass.runCommand(command);
        } else {
            wass.console(command);
        }
        wass.log("[shop] " + command);
        return "§a已购买 §f" + quantity + " §e" + item.name
                + " §7(" + item.item + ")，共花费 " + coins + " " + currency();
    }

    if (page && data) {
        page.onOpen(function () {
            applyData();
            // 所有组件依次渐入 / fade every component in one after another
            // Fade every component in one after another
            page.animateAll("fadeIn", {stagger: 8, duration: 300});
        });

        page.onClick("pick_diamond", function () {
            select("diamond");
        });
        page.onClick("pick_iron", function () {
            select("iron");
        });

        page.onChange("qty_slider", function (ctx) {
            state.quantity = Math.round(ctx.value);
            refresh();
        });
        page.onChange("input_name", function (ctx) {
            page.text("echo_label", "§7回显：" + (ctx.value == null ? "" : ctx.value));
        });
        page.onChange("switch_sound", function (ctx) {
            page.text("switch_label", ctx.value ? "§a音效：开" : "§c音效：关");
            if (ctx.value) {
                page.sound("minecraft:ui.button.click");
            }
        });

        page.onClick("btn_buy", function () {
            wass.ui.sendAction("buy", "btn_buy", state.selectedKey + ":" + state.quantity);
        });
        page.onClick("btn_close", function () {
            page.closeAnimated(200);
        });
        page.onAction("buy", function (ctx) {
            page.text("shop_status", ctx.result == null ? "" : String(ctx.result));
        });
    }

    wass.registerAction("main", "buy", buy);
    wass.registerAction("shop_blocks", "buy", buy);
    wass.log("shop page ready: " + (data ? data.groups.length + " groups" : "no json")
            + ", json files=" + wass.getJsonFiles().length);
})();
