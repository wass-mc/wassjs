wass/components/ 用于放可复用的 XML 组件。
wass/components/ holds reusable XML components.
- 这里的 XML 不会注册为菜单，只能被 main.xml 或其他组件 include。
- XML files here are not registered as menus; they can only be included by main.xml or another component.
- 支持多级子目录，例如 components/forms/input.xml。
- Subdirectories are allowed, for example components/forms/input.xml.
- 引用示例：<include src="components/button.xml"/>。
- Include example: <include src="components/button.xml"/>.
