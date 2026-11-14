# RHINE LAB · MEMORY ARCHIVE（莱茵生命风格相册）

本仓库 fork 自 **[LBEILC/RhineLabUI](https://github.com/LBEILC/RhineLabUI)**（作者：**路北路陈 / LBEILC**，MIT 许可），把原来的「莱茵生命档案终端」改造成一个长期使用的私人电子相册。

**首页（2026-11-14 改版）是「时间档案柜」**：开场动画结束后，莱茵生命风格的档案柜被推进画面，每个抽屉是一段时光（一卷），抽屉面板上的小窗露出里面的照片。

- 点抽屉：抽屉拉出，里面的照片变成一张张「档案纸」，每张按照片自己的比例排版（竖幅窄、横幅宽，不裁切）。
- 点一张档案纸：照片被抽出、翻面，变成一张《明日方舟》风格的**干员档案卡**——照片大而清晰（按原比例），旁边是编号、抽屉、日期、地点、标签、说明、备注；没填的项目不显示，统一列在「待补充」里，不会出现假文字。
- 档案卡上：左右滑动 / ← → 切换，点照片进入全屏查看（缩放、滑动、导出），＋ 收藏，↓ 导出原图。
- 右上角：检索（按编号、标题、日期、地点、标签）、收藏、▦ 相册总览、设置。底部 REINITIALIZE 重放开场。
- **原项目的开场动画、音效配乐、亮暗配色、画质设置、PWA 离线都保留**；原来的三维档案阵列仍在：「设置 → CLASSIC 3D ARRAY」或网址加 `?classic=1`（只在正好 5 卷时可用）。三维引擎和 GLB 模型只在经典模式下才下载，首页不再加载。
- 从纪念网页跳过来时网址带 `?from=jelly`，进入后会短暂显示 `ACCESS ROUTE / JELLY`。

在线地址：<https://smartlotus.github.io/rhine-album/>

## 添加照片（以后只需要这几步）

需要 Node.js 22.12+（推荐 24）。第一次先 `npm ci`。

```sh
# 1. 把原图复制进 photos/ 并追加到清单末尾（会自动跳过完全相同或看起来是同一张的图）
npm run add-photos -- ~/Downloads/a.jpg ~/Downloads/b.jpg

# 2. 生成网页用图片（AVIF + WebP，三种尺寸，去掉 GPS 等全部 EXIF，方向已校正）
npm run photos

# 3. 本地预览（可选）
npm run dev

# 4. 提交并发布到 GitHub Pages
git add content public/photos && git commit -m "添加照片"
git push
npm run deploy:pages
```

`photos/` 里的原图**不会**提交到 GitHub（`.gitignore` 已忽略），公开的只有 `public/photos/` 里去掉元数据的网页版本。

## 写文字：`content/album.json`

```json
{
  "volumes": [
    { "name": "第一卷", "en": "VOLUME 01", "period": "2025 · 夏", "note": "这一段时光的一句话" }
  ],
  "photos": [
    {
      "file": "0001.jpg",
      "volume": 1,
      "title": "",
      "en": "",
      "date": "",
      "place": "",
      "caption": "",
      "notes": [],
      "tags": []
    }
  ]
}
```

| 字段 | 说明 |
| --- | --- |
| `volumes` | 1–12 卷，每卷是档案柜的一个抽屉（按顺序从上到下）。`name` 中文卷名，`en` 英文小标题；可选 `period`（时间段，显示在抽屉面板上）、`note`（打开抽屉时显示的一句话）。经典三维阵列固定 5 列，只在正好 5 卷时可用 |
| `file` | `photos/` 里的文件名 |
| `volume` | 放在第几个抽屉（1–卷数）。留空则按顺序平均分到各卷——**以后要加抽屉，建议给每张照片写上 `volume`**，否则加卷后照片会重新平均分配 |
| `title` / `en` | 中文标题 / 大号英文标题，留空显示「影像 001」/「MEMORY NO.001」 |
| `date` | 日期，留空时用照片 EXIF 的拍摄日期 |
| `place`、`caption`、`notes`、`tags` | 地点、说明（可用 `\n` 换行）、备注列表、标签列表，都可以留空 |
| `clearance` | 可选，右上角的小字，默认 `PRIVATE ARCHIVE` |

规则：每卷最多 20 张；某一卷没有照片时，抽屉显示 EMPTY。照片在清单里的顺序决定编号（X-001…），新照片请加在末尾，这样收藏不会错位。

`npm run check:content` 会检查清单；`npm run build` 前也会自动检查。

## 时间档案柜与干员档案卡

- **数据驱动**：抽屉 = `content/album.json` 的 `volumes`，照片 = `photos`。加照片、加卷后重新构建，档案柜自动变高 / 变多抽屉；抽屉高度按数量自动压缩（竖屏 80–112px，横屏按屏幕高度）。
- **档案纸**：抽屉里是两端对齐的等高行（flex `flex-grow: 比例`），每张保持 `width / height`；竖屏手机一行约 300px 高，横屏按屏幕高度。
- **档案卡**：照片框按比例计算（竖屏最高约 54% 屏高，横屏占满高度、档案在右侧），白边画在照片外面，照片本身不被裁切。开卡动画：档案纸位置 → 抽出放大 → 翻到背面（莱茵生命标识 / CLASSIFIED）→ 翻回正面，档案字段由遮挡条依次揭开。全程只用 `transform` / `opacity`（WAAPI），不触发重排。
- **流畅度**：
  - 首页不加载 three.js（约 180KB gzip）和 GLB 模型；首屏脚本约 76KB gzip。PWA 离线缓存也不再预存 GLB，只有打开经典模式时才下载。
  - 档案柜模式下不跑每帧的三维渲染循环。
  - 画质联动：「超级性能」或关闭 AO + 景深时使用精简效果（去掉阴影、光泽、透视）；自动画质下，开抽屉 / 翻牌时帧率连续两次低于 45fps 会自动切到精简效果。
  - 「减弱动态效果」时不翻牌、不扫描，直接显示。
- **横竖屏**：竖屏单列；手机横屏左侧标题、右侧档案柜，档案卡左图右文；所有按钮避开刘海与底部横条，转屏时有原来的扫描过渡，状态（打开的抽屉 / 卡片）保持。
- **键盘**：档案柜 ↑↓ 选抽屉、Enter 打开；抽屉里 ←→ 换抽屉、↑↓ 选照片；档案卡 ←→ 换照片、Esc 返回。
- 自检：`npm run check:cabinet`（竖屏 / 横屏手机 + 桌面：开场进入档案柜、抽屉数量、档案纸和卡片比例、无假文字、上一张 / 下一张、收藏、导出、全屏查看、检索跳卡、安全区、转屏、减弱动效、4× CPU 降速下的帧间隔与长任务、不请求 GLB / three.js、经典模式可用）。`check:landscape`、`check:perf` 现在测试经典三维模式。

## 照片比例与横竖屏

- **每张照片按自己的比例显示**（9:16、3:4、4:3……），比例来自 `content/album.generated.json` 里生成时记下的 `width` / `height`，不读图片本身，所以图片还没下载完时位置也不会跳。
  - 三维档案盒里的「印片」：照片完整放进纸面，不拉伸、不裁切；竖幅照片左侧留一栏规格（FILE / RATIO / FORMAT / SIZE），横幅照片的比例标在右下角；外面一圈白边、黑色细框和裁切角标。
  - 文档里的照片：外框随比例变高或变宽，右下角标出比例（如 `9:16`），图注写尺寸和 PORTRAIT / LANDSCAPE。
  - 相册总览：等高行排版，每张缩略图的宽度按自己的比例，不再裁成正方形。
  - 全屏查看：完整显示（contain），手机竖着、横着都铺满可用区域的一边。
- **手机横屏**（如 844×390、667×375）：沿用原项目的紧凑横屏布局；全屏查看在横屏时把标题、翻页和按钮放到右侧一栏，照片占左侧整个高度；总览和文档里的照片自动变矮。所有按钮都避开刘海和底部横条（`env(safe-area-inset-*)`）。
- **转动手机**时有一层莱茵风格的「扫描」过渡：带网格的纸面从上往下盖住画面，三维画面在下面按新尺寸重新适配，然后橙色扫描线把纸面从上往下擦掉。系统开启「减弱动态效果」时只做 0.2 秒淡入淡出。页面不锁定方向。
- 自检：`npm run check:ratio`（比例换算的单元测试）；`npm run check:landscape`（浏览器检查，需要先 `npm run build:pages` 并在本地以 `/rhine-album/` 路径提供 `dist/`，详见 `scripts/check-landscape.mjs` 开头）。

更新记录见 [CHANGELOG.md](CHANGELOG.md)。

## 流畅度（手机）

- **手机默认「均衡」画质**：景深、玻璃、环境光遮蔽、1.5 倍像素比都保留，只把环境光遮蔽采样从 32 降到 16、阴影贴图从 2048 降到 1024、玻璃折射分辨率从 100% 降到 75%。电脑默认仍是「原始」。在「设置 → 渲染画质」里随时可以改回「原始 / 高 / 极高」，选过之后就按你的选择，不再自动。
- **动态分辨率**（只在自动画质时）：三维画面连续 2 秒低于约 48 帧，就把渲染分辨率降一档（最低 67%）；稳定在 57 帧以上一段时间后再升回去。画面静止时不计。
- **按需渲染**：原项目本来就在画面不变时复用上一帧；现在全屏查看和相册总览完全盖住时，三维画面直接暂停，关掉后继续。去掉了这两层上看不出来的背景模糊（97% 不透明，却每帧都要重新模糊下面的三维画面）。
- **档案盒印片**：照片改为在后台线程解码，并直接缩放到印片上照片的实际尺寸（≤ 896px）；切换档案时，退回去的档案盒直接带走当前印片，新的档案盒换一张新画布，不再每次复制一张 1024×744 的图再上传一次。空档案也不会再误删正在用的印片材质。
- **全屏查看**：先显示文档里已经下载好的中图，原图在后台解码好后再无缝替换；预载相邻照片改为中图（每翻一张少下载约 290KB）。
- **修复**：从 3 张照片的卷切到 2 张照片的卷时，右侧刻度会报错，导致编号和标题不更新（例如第一卷 → 第三卷）。
- 自检：`npm run check:perf`（默认画质、手动画质保留、跨卷切换无报错、连续切换纹理不增长、全屏查看先中图后原图、盖住时三维暂停）。

## 隐私

- 仓库和 Pages 都是**公开**的（GitHub 上 fork 的公开仓库不能设为私有，免费账号的 Pages 也需要公开仓库）。知道网址的人都能看到照片；页面加了 `noindex`，不会被搜索引擎收录，但这不等于加密。
- 网页图片已去掉 GPS、相机型号、拍摄时间等全部 EXIF。
- 如果以后想要真正私密，可以改为私有仓库 + Cloudflare Pages / Vercel 加访问密码，或换成非 fork 的私有仓库。

## 致谢与许可

- 界面、三维模型（`public/assets/*.glb`、`art/` 下的 Blender 工程）、动效、原创配乐与音效：**[RhineLabUI](https://github.com/LBEILC/RhineLabUI) © 2026 LBEILC（路北路陈）**，MIT 许可，见 [LICENSE](LICENSE)。PR #15 优化的署名见 [PR15-ATTRIBUTION.md](PR15-ATTRIBUTION.md)。
- 字体 MiSans（小米），许可见 `public/fonts/`。滚动数字 `@kitlangton/rolling-number` 许可见 `public/licenses/`。
- 《明日方舟》、莱茵生命及相关设定归上海鹰角网络所有。原项目与本相册都是非官方的同人作品，仅供个人使用。
- 相册部分新增/修改的文件：`content/album.json`、`content/album.generated.json`、`src/data.ts`、`src/album.ts`、`src/album.css`、`scripts/album-content.mjs`、`scripts/add-photos.mjs`、`scripts/build-photos.mjs`、`scripts/check-album*.mjs`、`scripts/check-ratio-test.mjs`、`scripts/check-landscape.mjs`、`scripts/deploy-pages.mjs`、`src/photo-ratio.ts`、`src/orientation-transition.ts`，以及 `src/main.ts`、`src/scene.ts`、`src/appearance.ts`、`src/document-decryption.ts`、`scripts/build-pwa.mjs`、`vite.config.ts` 中的少量改动。

---

以下是原项目 README（未改动），介绍原有的界面、动效与操作方式。

---

# RHINE LAB · ANALYSIS OS

**把莱茵生命的终端，做成可以操作的三维界面。**

**[在线体验 → rhine.lubeiluchen.cc](https://rhine.lubeiluchen.cc/)**

iPhone 可用 Safari 打开在线版，通过“分享 → 添加到主屏幕”安装；从主屏幕图标进入可使用独立窗口。首次联网后，设置中显示“离线资源已就绪”即可离线浏览档案和模型。支持桌面不同比例、手机横竖屏和触摸操作。[安装与更新说明](docs/PWA.md)

![莱茵生命终端：由透明档案盒构成的三维阵列](docs/media/archive.jpg)

这是对《明日方舟》特别映像「莱茵生命：访问」终端界面的非官方复刻。从白底开场进入五列循环档案阵列，抽取一份档案，等待玻璃与正文解密，再进入独立查看器观察内部结构。

项目以原 PV 的 **5–40 秒**为主要视觉与动效参考，实际开场从 **6.76 秒的白色画面**开始；内部结构另参考约 **41 秒及 46–51 秒**的正面与多角度画面。检索、收藏、正文阅读、结构拆解与声音设置是可操作的扩展功能。

代码由 GPT-6 Astra 协助完成，模型通过 Blender MCP 制作。界面采用 **TypeScript + Three.js + Vite**，运行时实时渲染三维模型，开场由 DOM / SVG 与场景时间轴驱动。

[快速运行](#快速运行) · [界面与动效](#界面与动效) · [操作说明](#操作说明) · [源码与 Blender 工程下载](https://pan.quark.cn/s/762d9ee9dfc3) · [参考原 PV](https://www.bilibili.com/video/BV1rr4y1b7sz/)

## Wallpaper Engine 壁纸与独立仓库

壁纸版已从本项目拆分为独立公共仓库，后续功能在 **[RhineLabWallpaper](https://github.com/LBEILC/RhineLabWallpaper)** 的 `main` 分支开发。本仓库继续维护网页版本；[原壁纸分支 codex/wallpaper-engine](https://github.com/LBEILC/RhineLabUI/tree/codex/wallpaper-engine) 保留迁移记录。需要最新壁纸源码，请前往独立仓库。

**[在 Steam 创意工坊订阅壁纸 → Rhine Lab · 莱茵生命交互桌面](https://steamcommunity.com/sharedfiles/filedetails/?id=3799142774)**

![Wallpaper Engine 工作台预览](wallpaper/preview.gif)

- **两种工作模式**：三维档案展示与桌面工作台，可显示时间日期、今日事项、日程倒计时、系统媒体信息和专注计时。
- **壁纸交互**：音乐律动、呼吸效果、波纹接力小游戏，以及亮暗配色、玻璃模糊、HUD 曲面与视差。
- **按需保留画面**：在 WE 属性中选择显示哪些组件；可关闭启动时加载 3D，播放 2D 开场后直接进入工作台，再从左下角手动载入模型。
- **自定义图片**：关闭 3D 后可显示自行选择的壁纸，支持调整上下遮罩范围，设为 0 即关闭；时钟和媒体信息复用滚动数字与文字效果。
- **宿主适配**：接入 WE 属性、音频响应、媒体信息、帧率及暂停通知，壁纸资源本地打包，壁纸构建不启用 PWA。

使用壁纸请通过上方创意工坊链接订阅，在 Wallpaper Engine 中应用并调整属性。需要自行构建时：

```sh
git clone https://github.com/LBEILC/RhineLabWallpaper.git
cd RhineLabWallpaper
npm ci
npm run build:wallpaper
```

输出目录为 `release/wallpaper`，在 Wallpaper Engine 编辑器中打开其中的 `index.html`。系统媒体信息取决于播放器支持及 WE 媒体集成设置。更多细节见 [壁纸使用与开发说明](docs/WALLPAPER-ENGINE.md) 和 [创意工坊发布说明](docs/WORKSHOP-PUBLISH.md)。

以下为项目共用的网页与三维档案功能介绍。


## 新版效果

- **亮暗配色**：设置中切换，卡片依次变色，详情与独立查看器同步适配。
- **自适应阵列**：按实际镜头与屏幕范围布置、裁剪档案，改善宽屏边角露出尽头；开场铺满实际视口。
- **超级性能模式**：设置中独立开启，降低三维渲染负担并保留动效，关闭恢复之前的画质。
- **数字时钟**：页脚时、分、秒独立滚动，修复变换布局下部分数字动画中断。

整合范围与验证见 [主分支整合记录](verification/WEB-INTEGRATION.md)。

- **模型与正文同步解密**：对角解密线合拢、保持并收束，盖板自上而下由磨砂变清晰；右侧文档的遮挡条随之退开，露出标题、资料字段与正文。
- **可看清的双环内构**：双环、连接带与白色／橙色部件封装在盖板与基板之间。顶边黄色方块、两处螺丝和盖板后的刻线补全了外壳细节。
- **清晰／磨砂切换**：独立查看器可以随时改变玻璃状态，保留当前视角和拆解位置；支持平滑缩放、平移及复位。
- **滚动文字与编号**：档案标题、分类、权限标签及编号连续滚动，快速输入衔接最新选择。
- **重新校准的开场**：逐字输入、圆环绕行、连续 Logo 笔画、身份验证和欢迎转场，按原片逐帧修订轨迹与节奏。
- **声音与画质设置**：玻璃交互音、系统电子音与三轨循环配乐；音效和音乐可独立开关、调节音量。画质提供四档预设及精细设置。

## 界面与动效

以下截图与动图于 **2026-09-09** 重新采集，均来自当前版本的实际浏览器运行。截图为 **1600 × 900**，GIF 为 **8–12 fps**、原速播放；压缩后的帧率与颜色不代表实时渲染质量。采集版本与复现步骤见 [素材说明](docs/media/README.md)。

### 抽取、解密与阅读

档案竖直升起，镜头靠近并转向详情构图。解密时玻璃与文档一起揭示；完成后可阅读概述、研究记录及访问日志，也可以收藏或导出 UTF-8 文本。

![档案抽取与同步解密：对角线收束，玻璃从上向下变清晰，正文遮挡退开](docs/media/decryption.gif)

| 解密完成 · 清晰内构与档案概述 | 研究记录 · 正文阅读 |
| --- | --- |
| [![解密后的档案：左侧可见双环内构，右侧显示机构资料](docs/media/detail.jpg)](docs/media/detail.jpg) | [![档案研究记录页签](docs/media/research.jpg)](docs/media/research.jpg) |

### 清晰内构与磨砂玻璃

在 360° 查看器中比较两种玻璃状态。切换不会重置镜头或拆解状态，返回详情后仍保留已解密状态。

| 清晰 · 双环与连接带 | 磨砂 · 轻柔折射 |
| --- | --- |
| [![清晰玻璃下的档案内部结构](docs/media/viewer-clear.jpg)](docs/media/viewer-clear.jpg) | [![相同视角下的磨砂玻璃](docs/media/viewer-frosted.jpg)](docs/media/viewer-frosted.jpg) |

<details>
<summary><strong>查看动图：清晰／磨砂连续切换</strong></summary>

![玻璃由清晰过渡到磨砂，再恢复清晰](docs/media/glass-motion.gif)

</details>

### 360° 旋转、拆解与重组

紧固件、透明盖板、折射环组、光学核心、信息基板、背板与框架按六组展开。拆解后仍可旋转、平移和缩放，观察部件之间的关系，再一键重组。

[![新版档案模型：六组结构分层展开](docs/media/assembly.jpg)](docs/media/assembly.jpg)

<details>
<summary><strong>查看动图：模型拆解、旋转与重组</strong></summary>

![操作动图：档案盒从完整状态拆开，旋转观察后连续重组](docs/media/assembly-motion.gif)

</details>

### 循环阵列与滚动标题

五类、每类八份，共 **40 份档案**。上下翻阅、左右切列均可持续循环；切回某列时保留上次选择。选中抬起与阵列波浪同时开始，标题和编号跟随输入滚动；返回阵列时，档案先转正再下降。

<details>
<summary><strong>查看动图：切列、翻阅与连续文字滚动</strong></summary>

![循环切换档案，标题、编号、分类及刻度同步更新](docs/media/browse.gif)

</details>

### 白底开场

从终端逐字输入到圆环、Logo 绘制，再进入身份接入与权限验证。可以重播，也可以跳过开场直接进入阵列。

[![白底开场中的莱茵生命标志与身份接入文字](docs/media/boot.jpg)](docs/media/boot.jpg)

<details>
<summary><strong>查看动图：新版开场片段</strong></summary>

![新版白底开场：逐字输入、圆环和连续标志绘制、身份验证与欢迎转场](docs/media/boot-motion.gif)

</details>

### 检索、声音与画质

检索支持编号、标题、英文名、科室、相关人物与分类筛选。收藏和设置保存在当前浏览器中。音效区分档案的玻璃碰触与系统操作的电子反馈，背景配乐随开场、阵列、详情和查看器调整三轨比例。

| 档案索引 · 关键词与分类筛选 | 系统设置 · 声音与画质 |
| --- | --- |
| [![输入莱茵关键词后的档案检索结果](docs/media/search.jpg)](docs/media/search.jpg) | [![独立音效和音乐音量、减少动态效果与画质预设](docs/media/settings.jpg)](docs/media/settings.jpg) |

GIF 不含声音。可单独[试听原创配乐「观测室」](public/audio/observatory-preview.mp3)，完整声音效果请启动应用体验。浏览器可能需要一次点击或按键才允许播放音频。

## 快速运行

需要 **Node.js 22.12 或更高版本**（可使用 Node.js 24），以及支持 WebGL 2 的现代桌面浏览器。首次安装依赖需要网络；应用不需要 API Key，也不需要启动后端服务。

### 获取项目

```sh
git clone https://github.com/LBEILC/RhineLabUI.git
cd RhineLabUI
```

也可以从 GitHub 的 **Code → Download ZIP** 下载当前源码，或获取[夸克项目包](https://pan.quark.cn/s/762d9ee9dfc3)。夸克包是 **2026-09-08 的打包快照**，包含源码、运行模型与 Blender 源工程；后续更新以本仓库为准。

### 安装并启动

```sh
npm ci
npm run dev
```

打开终端显示的地址，通常为 `http://127.0.0.1:5173/`。如果端口被占用，以终端实际输出为准。

Windows 用户安装 Node.js 并解压项目后，也可以双击 [`启动终端.cmd`](启动终端.cmd)：首次运行会安装依赖，然后启动本地服务并打开浏览器。

### 构建与预览

```sh
npm run build
npm run preview
```

生产文件输出到 `dist/`，可以交给静态 HTTP 服务托管。请通过服务地址访问，不要直接双击 `dist/index.html`。

## 操作说明

### 终端与档案

| 操作 | 效果 |
| --- | --- |
| 开场中按 `Enter` / `Esc`，或点击 `ENTER SYSTEM` | 资源就绪后进入交互阵列 |
| `←` / `→` | 切换档案类别，首尾循环 |
| `↑` / `↓` | 翻阅同类档案，首尾循环 |
| `Enter`、`ACCESS FILE` 或文件编号 | 读取当前档案 |
| 在详情模型上拖动 | 档案获得净空后，旋转观察 |
| `/` 或 `ARCHIVE INDEX` | 打开检索，可搜索编号、标题、英文名、科室、负责人和分类 |
| `SAVE ARCHIVE` / `SAVED` | 收藏当前档案 / 查看收藏 |
| `EXPORT` | 下载当前档案的文本文件 |
| `Esc` | 关闭当前弹窗，或从详情返回阵列 |

### 独立模型查看器

在详情页点击 **「360° 查看文档模型」** 进入。

| 操作 | 效果 |
| --- | --- |
| 鼠标拖动 | 环绕旋转模型 |
| 滚轮、`+` / `−` | 平滑缩放 |
| 方向键 | 平移观察位置 |
| 「复位视角」或 `Home` | 平滑恢复初始观察位置 |
| 「清晰」 / 「磨砂」 | 切换玻璃状态，保留视角和拆解位置 |
| 「拆解档案」 / 「一键重组」 | 展开六组部件 / 连续收回 |
| `Esc` 或「返回档案」 | 关闭查看器，返回原档案 |

### 显示与偏好

布局以 **1920 × 1080** 为基准等比例适应窗口，主要面向桌面与横向屏幕。设置页提供音效与背景音乐的独立开关、独立音量，以及完整、减少或自定义动画、画质、全屏和重新播放开场。动画选择由本站设置控制，收藏和偏好保存在当前浏览器中。

首次载入需要加载字体与 GLB 模型。项目保留了四份官方 MiSans WOFF2，合计约 19.7 MB，按实际使用加载。画质预设为**性能、原始、高、极高**，默认使用原始；精细设置可调整渲染比例、像素密度、抗锯齿、纹理过滤、透明材质分辨率、阴影、环境遮蔽及景深。运行不够流畅时可选性能档；需要简化镜头、文字与揭示动画时，可启用减少动态效果。

## 工程结构

| 目录或文件 | 内容 |
| --- | --- |
| [`src/main.ts`](src/main.ts) | 页面状态、档案阅读、检索、收藏与快捷键 |
| [`src/boot.ts`](src/boot.ts)、[`src/boot-motion.ts`](src/boot-motion.ts) | 开场界面与逐帧时间轴 |
| [`src/scene.ts`](src/scene.ts)、[`src/archive-loop.ts`](src/archive-loop.ts) | Three.js 场景、循环阵列、抽取与归位 |
| [`src/model-viewer.ts`](src/model-viewer.ts) | 独立模型查看器与拆解动画 |
| [`src/decryption.ts`](src/decryption.ts)、[`src/document-decryption.ts`](src/document-decryption.ts) | 模型解密轨迹与正文同步揭示 |
| [`src/audio.ts`](src/audio.ts)、[`public/audio/`](public/audio/) | 交互音效、三轨配乐与音源记录 |
| [`src/render-quality.ts`](src/render-quality.ts)、[`src/quality-renderer.ts`](src/quality-renderer.ts) | 画质预设与渲染管线 |
| [`content/archives.json`](content/archives.json) | 页面与下载共用的五类、40 份档案数据 |
| [`src/data.ts`](src/data.ts) | 档案类型与阵列位置映射 |
| [`public/assets/`](public/assets/) | 运行所需的 GLB 模型 |
| [`public/archives/`](public/archives/) | 导出的档案文本；启动和构建前自动生成 |
| [`art/`](art/) | Blender 源文件、建模与审阅脚本 |
| [`scripts/`](scripts/) | 档案导出与行为检查 |
| [`reference/`](reference/)、[`verification/`](verification/) | 开发对照工具与分阶段验证记录 |
| [`docs/media/`](docs/media/) | README 截图与动图 |
| [`DESIGN.md`](DESIGN.md) | 视觉、相机、材质与运动约束 |

原片时间轴使用 160 个阵列位置；交互模式使用固定的可见窗口与外围卡片补位，让有限的档案内容可以持续循环。

### 修改与复核

修改档案内容从 [`content/archives.json`](content/archives.json) 入手，字段与操作步骤见 [档案修改说明](content/README.md)。`npm run dev` 与 `npm run build` 会先校验数据，再更新 `public/archives/` 中的文本导出；开发过程中修改数据后，可执行 `npm run export:archives` 同步下载文件。`npm run check:content` 检查数据规则与导出一致性。

```sh
node scripts/check-motion.mjs
node scripts/check-loop.mjs
node scripts/check-appearance.mjs
node scripts/check-assembly.mjs
node scripts/check-decryption.mjs
node scripts/check-shell.mjs
node scripts/check-internal-optics.mjs
node scripts/check-quality.mjs
```

这些脚本检查运动、循环位置、外观、装配结构、解密轨迹、外壳、内构与画质参数。视觉效果仍需在浏览器中实际查看，尤其是快速切换、模型归位、文档揭示及查看器进出过渡。

| 本地调试路径 | 用途 |
| --- | --- |
| `/?scene=archive` | 直接进入档案阵列 |
| `/?scene=detail` | 直接进入档案详情 |
| `/?time=28&freeze=1` | 固定在参考时间轴的指定时刻 |
| `/reference/review.html`、`/reference/boot-review.html` | 原片与复刻对照工具 |
| `/reference/decryption-review.html` | 玻璃解密逐帧对照 |
| `/reference/document-decryption-check.html` | 正文同步解密与布局检查 |
| `/reference/boot-audio.html` | 完整开场声音试听 |

原 PV 不随仓库分发。使用视频对照工具时，需要自行准备对应参考视频；正常运行应用不依赖它。

### Blender 源工程

| 文件 | 用途 |
| --- | --- |
| [`art/rhine-archive.blend`](art/rhine-archive.blend) | 档案盒基础模型与审阅灯光 |
| [`art/archive-assembly.blend`](art/archive-assembly.blend) | 可按六组结构拆解的模型 |
| [`art/build_archive.py`](art/build_archive.py) | 生成基础模型与 GLB |
| [`art/build_assembly.py`](art/build_assembly.py) | 生成拆解模型与 GLB |
| [`art/internal_architecture.py`](art/internal_architecture.py) | 当前双环内构与连接带 |
| [`art/shell_reference_details.py`](art/shell_reference_details.py) | 顶边方块、螺丝及盖板后刻线 |
| [`art/setup_studio.py`](art/setup_studio.py) | 配置资产审阅灯光与相机 |

普通运行直接使用现有 GLB 即可，无需安装 Blender。重新建模时，可在 Blender 的脚本环境中通过 `runpy.run_path()` 执行对应脚本，或通过 Blender MCP 调用。脚本根据自身位置确定项目目录，重新生成会更新对应模型输出。

## 参考与资源说明

参考作品为《明日方舟》特别映像「莱茵生命：访问」：[BV1rr4y1b7sz](https://www.bilibili.com/video/BV1rr4y1b7sz/)。本项目与官方制作方无隶属关系，原 PV、相关名称、标志与设定的权利归各自权利人所有。原片未展示的档案摘要、日期、研究记录等属于本项目的扩展演示内容。

模型为重新制作；实时折射、景深、灯光与局部细节和原 PV 仍有差异。身份验证画面是演示状态机，不连接真实身份或业务服务。

- **MiSans**：使用小米官方字体文件，保留[字体许可](public/fonts/MiSans-license.pdf)及字体目录内的版权说明，设置页也提供署名与许可入口。
- **Rolling Number**：用于编号和文字滚动，许可见 [`public/licenses/rolling-number.txt`](public/licenses/rolling-number.txt)。
- **声音**：三轨配乐为本项目程序编配；逐字输入使用原 PV 的三个 38ms 短音，来源与处理记录见 [音频说明](public/audio/README.md)。原片短音及其衍生片段不纳入原创配乐的 MIT 授权声明。
- **其他依赖**：各自遵循其原有许可。源码公开不改变第三方资源的权利。

源码包包含运行代码、模型、Blender 工程、说明与验证脚本，不包含依赖目录、本机缓存、原 PV 或完整录制素材。

## 开源许可

本项目由作者创作且有权授权的全部内容统一采用 [MIT License](LICENSE)，版权署名为 **Copyright (c) 2026 LBEILC**。授权范围包括程序代码、建模脚本、技术文档、Blender 源工程、GLB 模型、原创配乐与音效，以及图像、动图和其他原创资源；非代码资产同样适用此许可。

你可以使用、复制、修改、制作衍生版本和再分发上述内容，包括随 GitHub 仓库、Release 或应用安装包发布，以及用于截图、GIF 和演示视频。商业、非商业、开源或闭源项目均可使用，也可以用于申请开源项目支持、奖励或会员权益，无需另行申请本项目作者的许可。分发上述内容或其重要部分时，须保留版权声明和 MIT 许可证。所有获授权内容均按原样提供，不作担保，具体以许可证全文为准。

以下第三方内容及权利不在本项目的 MIT 授权范围内：

- **《明日方舟》相关内容**：包括《明日方舟》及莱茵生命相关名称、标志、设定、原 PV、原作视觉设计、原片音频采样及其衍生片段，以及这些内容在模型、界面、截图或演示文本中的呈现。相关权利归各自权利人所有，本项目无法代替他们授权。
- **其他第三方资源**：MiSans、Novecento、Rolling Number 及其他第三方字体、依赖或素材继续遵循各自的许可证和版权声明，不因本项目的许可范围扩大而改变；独立许可资源也不会因此成为可自由分发的资源。

上述模型授权明确包含 `public/assets/archive-cassette.glb`、`public/assets/archive-assembly.glb`、对应 Blender 源工程及作者有权授权的衍生内容。模型中涉及《明日方舟》或其他第三方的元素仍适用上述排除条款；作者对自行制作部分的授权不代表原作相关权利也已获授权。

欢迎在项目 README、关于页面或展示材料中注明 **LBEILC / RhineLabUI** 并链接[本项目](https://github.com/LBEILC/RhineLabUI)，这不是 MIT 许可证之外的额外强制条件，也不替代分发时保留版权声明和许可证的要求。

复用时，请根据用途处理涉及的第三方素材与标志。GitHub 当前源码包已包含本许可证；上方夸克链接为早期打包快照，最新许可说明以本仓库为准。
