# g-toolkit-plus

一个基于 Rollup 构建的 JavaScript 工具函数库，支持 CommonJS、ESM 和 UMD 格式。

## 特性

- 🚀 基于 Rollup 构建
- 📦 支持 CommonJS、ESM 和 UMD 格式
- 🔍 支持 Tree Shaking
- 📝 完整的 TypeScript 类型支持
- 🛠 代码压缩和优化
- 🔧 支持外部依赖
- 📚 完整的文档和示例
- ✅ 完整的单元测试覆盖

## 安装

```bash
npm install g-toolkit-plus
# 或
yarn add g-toolkit-plus
# 或
pnpm add g-toolkit-plus
```

## 使用

请参考 `examples` 目录下的示例代码：

- `examples/index.cjs` - CommonJS 使用示例
- `examples/index.mjs` - ESM 使用示例
- `examples/index.html` - UMD 使用示例

运行示例：

```bash
# CommonJS 示例
node examples/index.cjs

# ESM 示例
node examples/index.mjs

# UMD 示例
# 在浏览器中打开 examples/index.html
```

## API

### 数组工具函数

- `unique<T>(arr: T[], key?: keyof T): T[]` - 数组去重
  - 支持基本类型数组去重
  - 支持根据指定键对对象数组去重

- `groupBy<T extends Record<string, any>>(arr: T[], key: string): Record<string, T[]>` - 数组分组
  - 根据指定键对数组进行分组
  - 返回以键为索引的对象

### 字符串工具函数

- `toCamelCase(str: string): string` - 转换为驼峰命名
  - 支持短横线、下划线、空格分隔的字符串转换

- `toKebabCase(str: string): string` - 转换为短横线命名
  - 支持驼峰命名、下划线、空格分隔的字符串转换

### 对象工具函数

- `deepClone<T>(obj: T): T` - 深拷贝对象
  - 支持嵌套对象和数组的深拷贝
  - 处理循环引用

- `get(obj: Record<string, any>, path: string, defaultValue?: any): any` - 获取对象的嵌套属性值
  - 支持点号分隔的路径
  - 支持默认值

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式（监听文件变化）
pnpm run dev

# 构建
pnpm run build

# 清理构建文件
pnpm run clean

# 运行测试
pnpm test

# 运行测试（监听模式）
pnpm test:watch

# 运行测试（覆盖率报告）
pnpm test:coverage

# 代码检查
pnpm lint

# 代码检查（自动修复）
pnpm lint:fix

# 代码格式化
pnpm format

# 发布前构建（自动执行）
pnpm run prepublishOnly
```

## 项目结构

```text
g-toolkit-plus/
├── src/                   # 源代码目录
│   ├── utils/             # 工具函数目录
│   │   ├── array.ts       # 数组工具函数
│   │   ├── string.ts      # 字符串工具函数
│   │   └── object.ts      # 对象工具函数
│   └── index.ts           # 入口文件
├── tests/                 # 测试目录
│   └── utils/             # 工具函数测试
│       ├── array.test.ts  # 数组工具函数测试
│       ├── string.test.ts # 字符串工具函数测试
│       └── object.test.ts # 对象工具函数测试
├── examples/              # 示例代码
│   ├── index.cjs          # CommonJS 示例
│   ├── index.mjs          # ESM 示例
│   └── index.html         # UMD 示例
├── dist/                  # 构建输出目录
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── rollup.config.js       # Rollup 配置
├── jest.config.js         # Jest 配置
├── .eslintrc.json         # ESLint 配置
├── .prettierrc            # Prettier 配置
└── README.md              # 项目文档
```

## 配置文件说明

### package.json

```text
package.json/                   # 项目配置文件
├── name                        # 包名称
├── version                     # 版本号
├── type: "module"              # 启用 ES 模块支持，使项目默认使用 ESM 格式
├── main                        # CommonJS 入口文件 (dist/index.js)，供 Node.js 和旧版打包工具使用
├── module                      # ES Module 入口文件 (dist/index.esm.js)，供现代打包工具使用
├── browser                     # UMD 格式入口文件 (dist/index.umd.js)，供浏览器直接使用
├── types                       # TypeScript 类型声明文件 (dist/index.d.ts)
├── files                       # npm 发布包含的文件和目录
├── exports                     # 包导出配置，支持不同环境的模块格式
│   ├── types                   # TypeScript 类型声明文件路径
│   ├── import                  # ES Module 格式入口
│   ├── require                 # CommonJS 格式入口
│   └── browser                 # UMD 格式入口
├── scripts                     # 项目脚本命令
│   ├── dev                     # 开发模式，监听文件变化
│   ├── build                   # 构建项目
│   ├── clean                   # 清理构建文件
│   ├── test                    # 运行测试
│   ├── test:watch              # 监听模式运行测试
│   ├── test:coverage           # 生成测试覆盖率报告
│   ├── lint                    # 运行代码检查
│   ├── lint:fix                # 自动修复代码问题
│   ├── format                  # 格式化代码
│   └── prepublishOnly          # 发布前自动构建
└── dependencies                # 项目依赖
```

### tsconfig.json

```text
tsconfig.json/                  # TypeScript 配置文件
├── compilerOptions             # 编译选项
│   ├── target                  # 编译目标版本 (ES2020)，支持现代 JavaScript 特性
│   ├── module                  # 模块系统 (ESNext)，支持最新的模块语法
│   ├── lib                     # 包含的类型定义库 (ES2020, DOM)
│   ├── declaration             # 生成 .d.ts 类型声明文件
│   ├── outDir                  # 编译输出目录 (dist)
│   ├── strict                  # 启用严格的类型检查
│   ├── moduleResolution        # 模块解析策略 (node)
│   ├── esModuleInterop         # 启用 ES 模块互操作性
│   ├── skipLibCheck            # 跳过声明文件的类型检查
│   └── forceConsistentCasing   # 强制文件名大小写一致
├── include                     # 包含的文件 (src)
└── exclude                     # 排除的文件 (node_modules, dist, tests)
```

### rollup.config.js

```text
rollup.config.js/             # Rollup 打包配置文件
├── input                     # 入口文件配置 (src/index.ts)
├── output                    # 输出配置，支持多种模块格式
│   ├── cjs                   # CommonJS 格式输出 (dist/index.js)
│   │   ├── format            # 输出格式 (cjs)
│   │   └── exports           # 导出方式 (auto)
│   ├── es                    # ES Module 格式输出 (dist/index.esm.js)
│   │   ├── format            # 输出格式 (es)
│   │   └── exports           # 导出方式 (named)
│   └── umd                   # UMD 格式输出 (dist/index.umd.js)
│       ├── format            # 输出格式 (umd)
│       ├── name              # 全局变量名 (GRollupTemplate)
│       └── exports           # 导出方式 (auto)
├── plugins                   # 使用的插件配置
│   ├── typescript            # 处理 TypeScript 文件
│   │   ├── tsconfig          # TypeScript 配置文件路径
│   │   └── sourceMap         # 生成源码映射
│   ├── terser                # 代码压缩和优化
│   │   ├── compress          # 压缩选项
│   │   └── mangle            # 混淆选项
│   └── dts                   # 生成类型声明文件
└── external                  # 外部依赖配置
```

### jest.config.js

```text
jest.config.js/              # Jest 测试配置文件
├── preset                   # 使用 ts-jest 预设配置
├── testEnvironment          # 测试环境 (node)
├── extensionsToTreatAsEsm   # 将 .ts 文件视为 ESM 模块
├── moduleNameMapper         # 模块路径映射配置
│   └── ^(\\.{1,2}/.*)\\.js$ # 将 .js 扩展名映射到源文件
├── transform                # 文件转换配置
│   └── ^.+\\.tsx?$          # TypeScript 文件转换配置
│       ├── ts-jest          # 使用 ts-jest 转换
│       └── useESM           # 启用 ESM 支持
├── testMatch                # 测试文件匹配模式
│   └── **/*.test.ts         # 匹配所有 .test.ts 文件
└── collectCoverageFrom      # 收集覆盖率的文件
    └── src/**/*.ts          # 收集 src 目录下所有 .ts 文件
```

### .eslintrc.json

```text
.eslintrc.json/             # ESLint 代码检查配置
├── env                     # 运行环境配置
│   ├── browser             # 浏览器环境
│   ├── es2021              # ES2021 特性
│   ├── node                # Node.js 环境
│   └── jest                # Jest 测试环境
├── extends                 # 继承的规则集
│   ├── eslint:recommended  # ESLint 推荐规则
│   └── @typescript-eslint  # TypeScript ESLint 规则
├── parser                  # TypeScript 解析器配置
├── parserOptions           # 解析器选项
│   ├── ecmaVersion         # ECMAScript 版本 (latest)
│   └── sourceType          # 模块类型 (module)
├── plugins                 # ESLint 插件
│   └── @typescript-eslint  # TypeScript ESLint 插件
└── rules                   # 自定义规则
    ├── no-console          # 警告 console 语句
    └── no-explicit-any     # 警告 any 类型
```

### .prettierrc

```text
.prettierrc/               # Prettier 代码格式化配置
├── semi                   # 语句末尾使用分号
├── singleQuote            # 使用单引号
├── trailingComma          # ES5 风格的尾随逗号
├── printWidth             # 每行最大字符数 (100)
├── tabWidth               # 缩进空格数 (2)
├── endOfLine              # 统一使用 LF 换行符
├── bracketSpacing         # 对象字面量中的空格
└── overrides              # 特定文件类型的覆盖配置
    └── *.js               # JavaScript 文件配置
        └── parser         # 使用 babel 解析器
```

## 测试

项目使用 Jest 作为测试框架，所有测试文件都位于 `tests` 目录下。测试文件使用 `.test.ts` 作为后缀。

### 运行测试

```bash
# 运行所有测试
pnpm test

# 运行测试（监听模式）
pnpm test:watch

# 运行测试（覆盖率报告）
pnpm test:coverage
```

### 测试覆盖率

测试覆盖率报告会生成在 `coverage` 目录下，包括：

- 文本格式的覆盖率报告
- HTML 格式的详细报告
- LCOV 格式的覆盖率数据

## 许可证

MIT
