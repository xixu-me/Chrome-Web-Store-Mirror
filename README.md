***[English](README.en.md)***

# Chrome 应用商店镜像

安全、快速的 Chrome 应用商店镜像服务，允许用户安全地浏览和下载扩展程序和主题。该存储库使用 Cloudflare Workers 构建，提供了完整的搜索、详情页面和下载功能。

## 🌐 公共实例

🎯 **立即体验**：<https://chromewebstore.xi-xu.me>

## ✨ 主要功能

- 🔍 **全局搜索** - 快速搜索扩展程序和主题
- 📄 **详情页面** - 查看扩展程序和主题的详细信息
- 📦 **CRX 下载** - 安全下载扩展程序和主题的 CRX 文件
- ⚡ **缓存优化** - 智能缓存机制提升访问速度
- 🌍 **全球可用** - 基于 Cloudflare 全球网络

## 🏗️ 技术架构

- **运行环境**: Cloudflare Workers
- **开发语言**: JavaScript (ES6+ 模块)
- **构建工具**: Wrangler
- **测试框架**: Vitest
- **代码规范**: ESLint + Prettier
- **数据源**: [Chrome Web Store Lister](https://github.com/xixu-me/Chrome-Web-Store-Lister)

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm
- Cloudflare 账户（用于部署）

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
# 启动开发服务器
npx wrangler dev
```

开发服务器将在本地启动，你可以通过浏览器访问 `http://localhost:8787` 进行测试。

### 代码规范

```bash
# 代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# 格式化代码
npm run format
```

### 运行测试

```bash
# 运行测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

## 🌐 部署

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xixu-me/Chrome-Web-Store-Mirror)

### 部署到 Cloudflare Workers

1. 登录 Cloudflare 账户并获取 API Token
2. 配置 Wrangler:

    ```bash
    npx wrangler login
    ```

3. 部署应用:

    ```bash
    npx wrangler deploy
    ```

## 📚 API 参考

### 路由说明

| 路径 | 功能 | 描述 |
|------|------|------|
| `/` | 搜索首页 | 显示搜索界面 |
| `/search` | 搜索功能 | 搜索扩展程序和主题 |
| `/search/{query}` | 搜索查询 | 根据关键词搜索 |
| `/detail/{id}` | 详情页面 | 显示扩展程序和主题详情 |
| `/crx/{id}` | 文件下载 | 下载 CRX 文件 |

### 配置参数

- `CACHE_DURATION`: 缓存持续时间（默认 1 小时）
- `MAX_SEARCH_RESULTS`: 最大搜索结果数（默认 100）
- `DATA_JSON_URL`: 数据源 API 地址

## 🔧 开发指南

### 代码风格

存储库使用 ESLint 和 Prettier 保持代码一致性。请在提交代码前运行:

```bash
npm run lint:fix
npm run format
```

### 缓存策略

存储库使用智能缓存策略来提高性能:

- 数据缓存 1 小时
- 静态资源长期缓存
- 错误响应不缓存

## 🧪 测试

存储库使用 Vitest 进行测试，支持 Cloudflare Workers 环境。

```bash
# 运行所有测试
npm test

# 监视模式
npm test -- --watch

# 生成覆盖率报告
npm run test:coverage
```

## 🔗 相关存储库

- [Chrome Web Store Lister](https://github.com/xixu-me/Chrome-Web-Store-Lister) - 提供扩展程序和主题数据的数据源存储库

## 📄 许可证

本存储库基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。
