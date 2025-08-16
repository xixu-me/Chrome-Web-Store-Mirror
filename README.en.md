***[汉语](README.md)***

# Chrome Web Store Mirror

A secure and fast Chrome Web Store mirror service that allows users to safely browse and download extensions and themes. Built with Cloudflare Workers, this repository provides complete search, detail pages, and download functionality.

## 🌐 Public Instance

🎯 **Try it now**: <https://chromewebstore.xi-xu.me>

## ✨ Key Features

- 🔍 **Global Search** - Quickly search for extensions and themes
- 📄 **Detail Pages** - View detailed information about extensions and themes
- 📦 **CRX Downloads** - Safely download CRX files of extensions and themes
- ⚡ **Cache Optimization** - Smart caching mechanism for improved access speed
- 🌍 **Global Availability** - Built on Cloudflare's global network

## 🏗️ Technical Architecture

- **Runtime**: Cloudflare Workers
- **Language**: JavaScript (ES6+ modules)
- **Build Tool**: Wrangler
- **Testing Framework**: Vitest
- **Code Standards**: ESLint + Prettier
- **Data Source**: [Chrome Web Store Lister](https://github.com/xixu-me/Chrome-Web-Store-Lister)

## 🚀 Quick Start

### Requirements

- Node.js 18+
- npm
- Cloudflare account (for deployment)

### Install Dependencies

```bash
npm install
```

### Local Development

```bash
# Start development server
npx wrangler dev
```

The development server will start locally, and you can access it at `http://localhost:8787` for testing.

### Code Standards

```bash
# Code linting
npm run lint

# Auto-fix code issues
npm run lint:fix

# Format code
npm run format
```

### Run Tests

```bash
# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## 🌐 Deployment

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/xixu-me/Chrome-Web-Store-Mirror)

### Deploy to Cloudflare Workers

1. Log in to your Cloudflare account and get an API Token
2. Configure Wrangler:

    ```bash
    npx wrangler login
    ```

3. Deploy the application:

    ```bash
    npx wrangler deploy
    ```

## 📚 API Reference

### Route Overview

| Path | Function | Description |
|------|----------|-------------|
| `/` | Search Homepage | Display search interface |
| `/search` | Search Function | Search for extensions and themes |
| `/search/{query}` | Search Query | Search by keywords |
| `/detail/{id}` | Detail Page | Display extension and theme details |
| `/crx/{id}` | File Download | Download CRX files |

### Configuration Parameters

- `CACHE_DURATION`: Cache duration (default 1 hour)
- `MAX_SEARCH_RESULTS`: Maximum search results (default 100)
- `DATA_JSON_URL`: Data source API URL

## 🔧 Development Guide

### Code Style

The repository uses ESLint and Prettier to maintain code consistency. Please run before committing code:

```bash
npm run lint:fix
npm run format
```

### Caching Strategy

The repository uses smart caching strategies to improve performance:

- Data cached for 1 hour
- Static resources cached long-term
- Error responses not cached

## 🧪 Testing

The repository uses Vitest for testing with support for Cloudflare Workers environment.

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Generate coverage report
npm run test:coverage
```

## 🔗 Related Repositories

- [Chrome Web Store Lister](https://github.com/xixu-me/Chrome-Web-Store-Lister) - Data source repository providing extension and theme data

## 📄 License

This repository is open source under the MIT License - see the [LICENSE](LICENSE) file for details.
