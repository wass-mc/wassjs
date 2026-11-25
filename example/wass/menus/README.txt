wass/menus/ 下的每个 .xml 都可以是一个菜单：
Each .xml file in wass/menus/ can be a menu:
- 根元素必须是 <menu>（或 <page>），id 属性就是菜单 id；
- The root must be <menu> (or <page>); the id attribute is the menu id.
- 没有 id 时使用文件名，例如 shop.xml -> shop；
- Without an id the file name is used, for example shop.xml -> shop.
- main.xml 固定为默认入口 main；
- main.xml is the default entry point main.
- 可加 fullscreen="true" 让菜单铺满屏幕；
- Add fullscreen="true" to fill the screen.
- 组件请放到 wass/components/，通过 <include src="components/xxx.xml"/> 引用。
- Put components in wass/components/ and reference them with <include src="components/xxx.xml"/>.
