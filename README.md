# WassJS

WassJS 是一个 Minecraft 1.20.1 Forge 的脚本 UI 模组：窗口用 XML 写结构、JavaScript 写逻辑、JSON 写数据，内容全部放在服务端 wass/ 目录里，改完文件 /wassjs reload 就生效。给整合包作者、服务器管理者和想加界面的模组作者用——不写 Java、不重新编译、不用发资源包。

WassJS is a scripted UI mod for Minecraft 1.20.1 Forge: windows are described in XML, driven by JavaScript, and filled with JSON data. All content lives in the server-side wass/ folder, and edits take effect after /wassjs reload. Built for modpack authors, server owners, and modders who want custom screens — no Java, no recompiling, no resource pack for players.

## 适用场景 / Use cases

- 服务器商店、菜单、任务面板、公告页，界面样式和布局随时改；
- 玩家客户端不需要装资源包，登录后自动收到服务端下发的内容；
- 物品图标、滑条、开关、输入框、滚动列表、全屏页面都能直接拼出来；
- 其他模组通过 Java 桥注册自己的 JS 页面，或用 WassJS 弹窗。

- Server shops, menus, quest boards and notice pages whose layout can change at any time.
- Players need no resource pack; content is delivered by the server after login.
- Item icons, sliders, toggles, text fields, scroll lists and fullscreen pages can be assembled directly.
- Other mods can register their own JS pages through the Java bridge, or open WassJS popups.

## 功能 / Features

- 页面：wass/menus/*.xml 一个文件一个菜单，支持 fullscreen；components/ 做可复用片段。
- 逻辑：Rhino 跑 wass/js/*.js，page.onOpen / onClick / onChange / onAction，可改文本、样式、布局、显隐。
- 数据：wass/json/*.json 随内容下发，wass.json("name", "path") 读取，一份 JSON 可驱动多个菜单。
- 图标：Display Panel，任意物品（含模组物品）的 2D 图标，尺寸、朝向、角度、数量角标可配。
- 动画：淡入淡出、平移、缩放、旋转；20+ 预设，支持循环、往返、错峰渐入，closeAnimated 渐出关闭。
- 交互：按钮动作走服务端执行，结果回传页面；默认点击音效可换可关。
- 字体：内置未来荧黑（Glow Sans SC），不受客户端字体包影响，可关闭。
- 扩展：WassJSBridge 注册脚本、Java 函数、脚本目录，打开/刷新/关闭窗口；KubeJS 提供 wassjs 绑定。
- 工具：热重载、/wassjs list、/wassjs status、/wassjs scripts、/wassjs reload、OP 权限边界、纯客户端调试模式。

- Pages: one file in wass/menus/ is one menu, with fullscreen support; components/ holds reusable fragments.
- Logic: Rhino runs wass/js/*.js with page.onOpen / onClick / onChange / onAction to change text, style, layout and visibility.
- Data: wass/json/*.json is delivered with the content and read via wass.json("name", "path"); one JSON can drive several menus.
- Icons: Display Panel shows a 2D icon of any item, including modded items, with configurable size, orientation, angle and stack count.
- Animation: fade, translate, scale and rotate; 20+ presets with loop, alternate and staggered fade-in, plus closeAnimated for fade-out closing.
- Interaction: button actions run on the server and the result returns to the page; the default click sound can be changed or turned off.
- Font: bundled Glow Sans SC, unaffected by client font packs, and can be disabled.
- Extensions: WassJSBridge registers scripts, Java functions and script directories and opens, refreshes or closes windows; KubeJS gets a wassjs binding.
- Tools: hot reload, /wassjs list, /wassjs status, /wassjs scripts, /wassjs reload, operator permission boundaries and a client-only debug mode.

## 环境 / Environment

| 依赖 Dependency | 版本 Version |
| --- | --- |
| Minecraft | 1.20.1 |
| Forge | 47.x（开发用 47.4.6 / dev 47.4.6） |
| Java | 17 |
| LDLib2 | 2.2.43 |

把 wassjs-1.0.0.jar 和前置模组放进 mods/，启动后游戏目录会自动生成 wass/ 示例。

Put wassjs-1.0.0.jar and its dependencies into mods/; the game folder gets a sample wass/ directory on first launch.

## 快速开始 / Quick start

内容目录结构 / Content folder layout:

```text
<游戏根目录 Game directory>/
├── config/wassjs.toml
└── wass/
    ├── menus/        # 一个 <menu> 文件 = 一个页面 / one <menu> file = one page
    ├── components/   # 只能被 <include> 引用的片段 / fragments referenced by <include> only
    ├── js/           # 页面逻辑 / page logic
    ├── json/         # 数据 / data
    └── tex/          # 图片（PNG，单张不超过 512KB）/ images (PNG, max 512KB each)
```

最小可执行窗口在 example/minimal/：一个 XML 加一个 JS，约 30 行，放进 wass/ 后执行 /wassjs reload，再执行 /wassjs open hello 即可看到窗口。

The minimal working window is in example/minimal/: one XML plus one JS file, about 30 lines. Copy them into wass/, run /wassjs reload, then /wassjs open hello.

常用命令 / Common commands:

```text
/wassjs                    打开默认菜单（commandMenu）/ open the default menu (commandMenu)
/wassjs open <id>          打开指定菜单 / open the given menu
/wassjs reload             重载 XML / JS / JSON 并推给客户端（OP 2 及以上）/ reload XML, JS and JSON and push to clients (OP 2+)
/wassjs status             查看脚本数、菜单数、JSON 数、错误数（OP 2 及以上）/ show script, menu, JSON and error counts (OP 2+)
```

## 示例 / Examples

示例内容都在仓库的 example/ 下：example/minimal/ 是最小可执行窗口，example/wass/ 是完整的示例内容目录，可以整份复制到 <游戏根目录>/wass/。

Sample content lives under example/: example/minimal/ is the minimal window, and example/wass/ is a complete content folder that can be copied as a whole into <game directory>/wass/.

| 菜单 Menu | 内容 Content |
| --- | --- |
| main | 红色主题商店：两件商品、数量滑条、实时总价、服务端 /say 购买播报 / red-themed shop with two products, quantity slider, live total and a server-side /say purchase broadcast |
| shop_blocks | 同一份 shop.json 的第二个分组，演示一份数据驱动多个菜单 / second group of the same shop.json, showing one data file driving several menus |
| showcase | 全屏页面 + 旋转的绿色方块 + 整体渐入渐出 / fullscreen page with a rotating green square and page-wide fade in and out |
| animation_lab | 预设动画按钮 + 三个常驻动画 / preset animation buttons plus three looping animations |

## AI 辅助开发 / AI-assisted development

AI-assisted development:

Read llms.txt first, then AI_REFERENCE.md and ERROR_CORRECTION.md.

llms.txt 是入口索引，AI_REFERENCE.md 是 API 契约，ERROR_CORRECTION.md 是已知错误与修复。

llms.txt is the entry index, AI_REFERENCE.md is the API contract, and ERROR_CORRECTION.md lists known errors and fixes.

## 文档 / Documentation

| 文件 File | 内容 Content |
| --- | --- |
| docs/事件列表.md | 交互后能执行的事件函数名与 ctx 字段 / event function names available after interaction and their ctx fields |
| docs/动画API.md | 动画属性、参数、预设、缓动 / animation properties, options, presets and easing |
| docs/JSON数据.md | JSON 位置、读取路径、结构示例 / JSON location, read paths and structure examples |
| docs/其他模组接入.md | WassJSBridge 用法 / using WassJSBridge |
| docs/权限边界与客户端模式.md | 服务端权威、OP 限制、客户端调试模式 / server authority, operator limits and client debug mode |
| docs/KubeJS集成.md | KubeJS 传数据与打开窗口 / passing data and opening windows from KubeJS |
| docs/WassJS 商店系统开发教程.docx | 从零到商店的完整教程 / full tutorial from first page to a shop |
| docs/WassJS AI 使用手册.docx | 给 AI 的 API 契约与任务配方 / API contract and task recipes for AI |

## 构建 / Building

```bash
./gradlew build        # 产物：build/libs/wassjs-1.0.0.jar（需要 JDK 17）/ output: build/libs/wassjs-1.0.0.jar (needs JDK 17)
./gradlew runClient    # 开发客户端，内容目录为 run/wass / dev client, content folder is run/wass
```

开发期依赖放在 libs/：LDLib2、NeoBackports、Rhino、taffy、Kotlin for Forge、KubeJS。构建脚本用 files() 与 flatDir 引用，不依赖私有 maven。

Development jars sit in libs/ (LDLib2, NeoBackports, Rhino, taffy, Kotlin for Forge, KubeJS). The build script references them with files() and flatDir, so no private maven is needed.

## 目录 / Layout

```text
src/main/java/com/wassjs/     模组代码 / mod code
src/main/resources/           字体、mixins、语言文件 / font, mixins, language files
libs/                         开发期依赖 jar / development dependency jars
example/minimal/              最小可执行窗口（hello.xml + hello.js）/ minimal working window
example/wass/                 完整示例内容（可整份复制到 wass/）/ full sample content (copy into wass/)
docs/                         文档 / documentation
screenshots/                  截图 / screenshots
llms.txt / AI_REFERENCE.md / ERROR_CORRECTION.md   AI 辅助开发入口 / AI-assisted development entry points
```

## 许可 / License

代码以 BSD-3-Clause 发布，见 LICENSE。LDLib2（MIT）、Rhino（MPL-2.0）、Glow Sans SC（SIL OFL 1.1）遵循各自许可。

Code is released under BSD-3-Clause, see LICENSE. LDLib2 (MIT), Rhino (MPL-2.0) and Glow Sans SC (SIL OFL 1.1) follow their own licenses.
