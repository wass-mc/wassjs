// wass/js/shop_blocks.js
// 第二个菜单（方块区）：同一个 wass/json/shop.json 的第二个分组。
// Second menu (blocks): the second group of the same wass/json/shop.json.
(function () {
    var data = wass.json("shop");
    var page = wass.page("shop_blocks");

    var state = {
        selectedKey: data && data.groups && data.groups.length > 1
                ? data.groups[1].items[0].key : "emerald",
        quantity: 1
    };

    function group() {
        return data && data.groups && data.groups.length > 1 ? data.groups[1] : null;
    }

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
        var item = findItem(state.selectedKey) || group().items[0];
        page.text("selected_label", "§7当前商品：" + item.name + " §8(" + item.item + ")");
        page.text("qty_label", "购买数量：§e" + state.quantity);
        page.text("total_label", "总计：§e" + (item.price * state.quantity) + " §7" + currency());
        page.progress("stock_bar", state.quantity);
    }

    function highlight() {
        if (!page) {
            return;
        }
        var keys = ["emerald", "gold", "redstone"];
        for (var i = 0; i < keys.length; i++) {
            page.style("card_" + keys[i],
                    {background: state.selectedKey === keys[i] ? "#66FF5555" : "#33FF8888"});
        }
    }

    function select(key) {
        state.selectedKey = key;
        highlight();
        refresh();
        if (page) {
            page.sound("minecraft:ui.button.click");
        }
    }

    if (page && data) {
        page.onOpen(function () {
            var g = group();
            page.text("shop_title", data.shop.title);
            page.text("shop_subtitle", data.shop.subtitle);
            for (var i = 0; i < g.items.length; i++) {
                var item = g.items[i];
                page.text("name_" + item.key, item.name);
                page.text("price_" + item.key,
                        "§e" + item.price + " §7" + currency() + " / " + item.unit);
                page.text("desc_" + item.key, item.desc);
                page.setItem("item_" + item.key, item.item, {
                    orientation: item.orientation,
                    angle: item.angle
                });
            }
            highlight();
            refresh();
            page.animateAll("fadeIn", {stagger: 8, duration: 300});
        });

        page.onClick("pick_emerald", function () {
            select("emerald");
        });
        page.onClick("pick_gold", function () {
            select("gold");
        });
        page.onClick("pick_redstone", function () {
            select("redstone");
        });

        // 滑条变化：更新数量与总价 / slider changed: update quantity and total
        page.onChange("qty_slider", function (ctx) {
            state.quantity = Math.round(ctx.value);
            refresh();
        });

        // 购买：动作交给服务端执行 / buy: the action runs on the server
        page.onClick("btn_buy", function () {
            wass.ui.sendAction("buy", "btn_buy", state.selectedKey + ":" + state.quantity);
        });
        page.onClick("btn_close", function () {
            page.closeAnimated(200);
        });
        // 服务端结果回显 / show the server result
        page.onAction("buy", function (ctx) {
            page.text("shop_status", ctx.result == null ? "" : String(ctx.result));
        });
    }
})();
