# KAJIMIRU 项目记录

最后更新：2026-09-10

## 1. 项目目标

这是一个面向日本用户的在线赌场测评 / Affiliate 网站前端练习项目。

- 使用场景：产品经理第一次练习前端，并用于内部展示给日本同事。
- 当前阶段：本地桌面端 UI 原型。
- 页面语言：日语。
- 当前不发布上线，不接入真实注册、支付、Affiliate 跳转或后台服务。
- 页面中的排名、评分、奖金和出金信息目前都是演示数据，不应当作为真实测评结论。

## 2. 视觉方向

整体参考日本赌场测评站常见的信息密度与模块结构，同时加入更明显的日系动漫 / 游戏 UI 风格。

- 主要参考页面：`https://ayakacasinos.com/oncasi-recommended/`
- 目标设备：Desktop 横屏优先。
- 视觉关键词：日系信息门户、Anime、游戏卡片、彩色品牌模块、排行榜、发光徽章。
- 页面主角色：编辑部角色「ミル」。
- 角色图片：`public/miru-editor.png`。

## 3. 当前已经完成的内容

### 页面结构

- 顶部本地演示提示条和主导航。
- 日语 Hero 区、搜索框和热门关键词。
- 安全性、出金速度、加密货币、日本语支持四项快捷信息。
- 赌场排行榜和筛选功能。
- 奖金、促销、游戏分类、百科内容和品牌目录模块。
- 右侧编辑部提示、热门奖金和指南文章栏。
- 本地演示按钮提示；没有真实外部跳转。

### 排行榜品牌

1. TrustDice / トラストダイス（Rank 1）
2. Stake / ステークカジノ
3. Yuugado / 遊雅堂
4. StealthBet / ステルスベット
5. Rainbet / レインベット
6. Vera&John / ベラジョンカジノ

### 支付方式

卡片中已经加入支付方式图标，包括：

- BTC
- USDT
- ETH
- TRX
- XRP
- LTC
- JPY

### Logo 处理原则

- 根据品牌官网和公开品牌资料确认品牌名称、核心色彩与标识结构。
- 不直接让图片模型重画品牌文字，避免拼写错误。
- 通过代码实现发光徽章、星光、浮动和品牌专属图形。
- 页面内标注 `UNOFFICIAL ANIME UI EDIT`，表示这是非官方的动漫 UI 演绎。
- 不暗示与这些品牌存在合作或官方授权关系。

## 4. 官方视觉参考

- TrustDice：`https://trustdice.mx/blog`
- Stake：`https://stake.com/`
- 遊雅堂品牌资料：`https://www.vjgroupaffiliation.com/wp-content/uploads/2025/07/Yuugado-Brand-Brochure_202507.pdf`
- StealthBet：`https://www.stealth.bet/`
- Rainbet：`https://rainbet.com/`
- Vera&John：`https://www.verajohnglobal.com/ja/`

这些链接只用于本地 UI 练习中的视觉研究。后续如果真实发布，需要重新确认商标素材使用规则、当地法规、广告规范和内容准确性。

## 5. 技术信息

- 框架：React 19 + Vinext + Vite。
- 语言：TypeScript。
- 样式：Tailwind CSS、项目级 CSS 和 Shadcn 组件。
- 图标：Lucide React。
- 包管理器：pnpm。
- 推荐 Node.js：22.13 或更高版本。
- 当前用户电脑已安装 Node.js `v24.21.0` 和 npm `11.19.0`。
- 因为全局安装 pnpm 遇到 macOS 权限问题，当前推荐使用 `npx pnpm`。

## 6. 本地运行方法

在 VS Code 中打开 `TRUSTDICE` 文件夹，然后选择 `Terminal > New Terminal`。

第一次运行：

```bash
npx pnpm install
npx pnpm dev
```

之后再次运行：

```bash
npx pnpm dev
```

默认预览地址：

```text
http://localhost:3000/
```

如果 3000 端口已被占用，开发服务可能自动使用 3001。停止服务时，在运行它的终端中按 `Control + C`。

## 7. 关键文件

- `app/page.tsx`：页面结构、赌场数据、筛选、搜索和交互。
- `app/globals.css`：桌面布局、品牌卡片、Logo 动画和全部页面视觉样式。
- `app/layout.tsx`：页面级布局和元数据。
- `public/miru-editor.png`：编辑部动漫角色。
- `README_SHARE.md`：给日本同事的中日双语启动说明。
- `exports/Kajimiru-local-demo-2026-09-10.zip`：已整理的本地分享包。
- `exports/KAJIMIRU-offline-preview.zip`：免安装分享包，解压后双击 `index.html` 即可预览。
- `scripts/export-offline.mjs`：从正在运行的本地预览重新生成免安装 HTML 的导出脚本。

## 8. 当前验证状态

- `pnpm run build` 已成功通过。
- 本地开发页面曾在 `http://localhost:3000/` 成功返回。
- 本项目目前只验证了本地前端体验，没有发布到互联网。

## 9. 后续可以继续做的方向

建议按下面顺序继续：

1. 和日本同事确认整体视觉是否符合日本用户习惯。
2. 调整日语文案的自然程度与专业表达。
3. 确认排行榜每个字段以及真实测评方法。
4. 为每个赌场增加独立详情页。
5. 增加奖金条款、支付方式、KYC 和出金速度的详细比较。
6. 确认真实 Logo 的授权和使用规范。
7. 如果未来要上线，再处理 SEO、数据来源、合规提示、Affiliate Disclosure 和负责任博彩内容。
8. 最后再连接 GitHub 仓库和部署环境。

## 10. 生成免安装分享包

先运行本地开发预览，然后在另一个终端执行：

```bash
npx pnpm export:offline
```

脚本会生成 `exports/KAJIMIRU-offline-preview` 文件夹。收件人不需要 Node.js，解压分享包后直接双击其中的 `index.html` 即可。

## 11. 下次继续时怎么说

可以直接告诉 Codex：

> 请先阅读项目根目录的 `PROJECT_NOTES.md`，然后继续完善 KAJIMIRU 本地前端。

如果这份文档和聊天中的旧信息冲突，应当先检查当前代码和最新预览，再更新本文档。
