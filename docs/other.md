## webpack 构建 React 应用示例

准备：

```bash
mkdir react-webpack-demo
cd react-webpack-demo
touch index.html
mkdir src
cd src
touch index.js
touch App.js
```

`index.html` 文件内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>webpack-react-demo</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>

```

`src/App.js` 文件内容如下：

```jsx
import React from 'react'
import Foo from './foo'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>hello world</h1>
        <p>app component</p>
        <Foo></Foo>
      </div>
    )
  }
}

export default App

```

`src/index.js` 文件内容如下：

```jsx
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

```

在 `react-webpack-demo` 目录中分别创建 `package.json`、`webpack.config.js` 两个文件并写入以下内容。

package.json:

```json
{
  "name": "react-webpack-demo",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "build-watch": "webpack --watch",
    "dev": "webpack-dev-server --open --progress"
  },
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.0.0-beta.44",
    "@babel/preset-env": "^7.0.0-beta.44",
    "@babel/preset-react": "^7.0.0-beta.46",
    "babel-loader": "^8.0.0-beta",
    "babel-preset-react": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^0.28.11",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.0.1",
    "less-loader": "^4.1.0",
    "style-loader": "^0.20.3",
    "url-loader": "^1.0.1",
    "webpack": "^4.5.0",
    "webpack-cli": "^2.0.14",
    "webpack-dev-server": "^3.1.1"
  },
  "dependencies": {
    "bootstrap": "3.3.7",
    "react": "^16.3.2",
    "react-dom": "^16.3.2"
  }
}

```

`webpack.config.js` 文件内容如下：

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  // 开发过程中建议使用 development，打包速度快
  // 上线的时候使用 production 模式，打包速度慢，因为要做压缩等优化处理
  mode: 'development', // production(默认的)|development
  devtool: 'inline-source-map', // 加入源代码地图，调试信息可以看到我们的源代码信息
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // devServer 用来专门为 webpack-dev-server 配置的
  // contentBase 用来设置我们开发服务器的 www 目录
  devServer: {
    contentBase: './dist',
    hot: true // 开启热更新
  },
  plugins: [
    // HtmlWebpackPlugin 插件会将你指定的 template 给打包到结果目录中
    // 它还能帮你实现 html 压缩处理
    new CleanWebpackPlugin(['./dist']), // 打包之前先把 dist 目录清除一遍
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        // 当匹配到以这些后缀名结尾的资源的时候，使用 url-loader 来处理
        // url-loader 会把小于 8192 字节大小的文件直接 base64 转码内置，大于它的则以独立文件来提供
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        // ES6 转 ES5 [babel-loader](https://webpack.js.org/loaders/babel-loader/)
        // yarn add --dev "babel-loader@^8.0.0-beta" @babel/core @babel/preset-env
        // 当加载以 .js 结尾的资源的时候，使用 babel-loader 对 ES6 => ES5 处理
        // exclude 表示排除第三方包转码
        // 不仅做了转码处理，还有代码优化
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // @babel/preset-env ECMAScript6 转 ECMAScript 5 的转码规则
            // @babel/preset-react JSX 转 JavaScript 的转码规则
            // 如果发现是 jsx 语法，则先将 JSX 转成 JavaScript，然后把 ECMAScript 6 转成 ECMAScript 5
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        // 当加载到以 .less 结尾的资源的时候使用：
        //   less-loader 编译成 css
        //   css-loader 转换成 JavaScript 模块
        //   style-loader 创建 style 节点插入 head 节点中
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          // less-loader 依赖了 less
          loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  }
}

```

打包构建：

```bash
# 编译构建
yarn run build

# 开发构建
yarn run build
```

---

## React DevTools

> https://github.com/facebook/react-devtools
