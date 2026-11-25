wass/json/ 用于放脚本读取的数据（商品、配置、文案等）。
wass/json/ holds data read by scripts (products, config, text and so on).
- 任意数量的 .json，可建子目录；
- Any number of .json files, subdirectories allowed.
- 一个文件可以给多个菜单供数据；
- One file can feed several menus.
- 脚本读取：wass.json("shop") / wass.json("shop:data.products")。
- Read from scripts: wass.json("shop") / wass.json("shop:data.products").
