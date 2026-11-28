# 最小可执行窗口 / Minimal working window

两个文件，约 30 行，验证 WassJS 能正常加载内容、打开页面、与服务端往返一次数据。
Two files, about 30 lines, to check that WassJS loads content, opens a page and round-trips data with the server.

## 用之前 / Before you start

- `mods/` 里有 `wassjs-1.0.0.jar` 和前置 LDLib2；
- `config/wassjs.toml` 里 `useLegacyJS = false`（默认）。

- `mods/` contains `wassjs-1.0.0.jar` and the LDLib2 dependency.
- `useLegacyJS = false` in `config/wassjs.toml` (the default).

## 安装 / Install

把两个文件复制到服务端（单人游戏就是游戏根目录）的 `wass/` 下：
Copy the two files into the server-side `wass/` folder (the game directory in single player):

```text
wass/
├── menus/hello.xml      ← 本目录的 hello.xml / hello.xml from this folder
└── js/hello.js          ← 本目录的 hello.js / hello.js from this folder
```

## 运行 / Run

```text
/wassjs reload
/wassjs open hello
```

预期 / Expected:

1. 窗口淡入，显示标题、状态行和两个按钮；
2. 状态行先变成 `已连接：CLIENT`；
3. 点「Ping 服务端」，状态行变成 `服务端返回：pong from <你的ID> (SERVER)`；
4. 点「关闭」，整页淡出后关闭。

1. The window fades in with a title, a status line and two buttons.
2. The status line first shows `已连接：CLIENT`.
3. Click "Ping 服务端" and the status line shows `服务端返回：pong from <your ID> (SERVER)`.
4. Click "关闭" and the whole page fades out and closes.

`/wassjs status` 中 errors 应为 0。
errors in `/wassjs status` should be 0.

## 文件说明 / Files

| 文件 File | 作用 Purpose |
| --- | --- |
| `hello.xml` | 页面结构：面板 + 标签 + 两个按钮，`id` 供 JS 查找 / page structure: panel, labels and two buttons; `id` is what JS looks up |
| `hello.js` | 绑定 `onOpen/onClick/onAction`，注册服务端动作 `ping` / binds `onOpen/onClick/onAction` and registers the server action `ping` |

## 已知行为 / Known behavior

- `wass.page("hello")` 在服务端返回 `null`，所以脚本第一句必须判空；
- 同一个按钮不要同时写 XML 的 `action` 和 `page.onClick`，前者会被后者覆盖；
- 动作在服务端执行，返回值以字符串形式回到 `page.onAction`。

- `wass.page("hello")` returns `null` on the server, so the script must check for null first.
- Do not set both the XML `action` and `page.onClick` on one button; the latter overrides the former.
- Actions run on the server and the return value comes back to `page.onAction` as a string.
