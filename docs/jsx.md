HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 [JSX 的语法](https://reactjs.org/docs/introducing-jsx.html)，它允许 HTML 与 JavaScript 的混写。

## 基本规则

- 必须只能有一个根节点
- 多标签写到一个小括号中，防止 return 自动分号不往后执行的问题
- 遇到 HTML 标签 （以 `<` 开头） 就用 HTML 规则解析
- 遇到代码块（以 `{` 开头），就用 JavaScript 规则解析
- JSX 允许直接在模板中插入一个 JavaScript 变量
  - 如果这个变量是一个数组，则会展开这个数组的所有成员添加到模板中
- 单标签必须结束 `/>`
  - `<input />`
  - `<br />`
  - `<img src="" alt=""/>`
  - ...
- 所有属性名都要驼峰写法
  - autofocus	autoFocus
  - onclick    onClick

自动插入分号的问题：

```jsx
function f () {
  return
    <div>hello</div>
}
```

以上代码是无效的，因为 return 自动分号了，代码执行结束，所以函数调用得不到任何内容。

## 在 JSX 中嵌入 JavaScript 表达式

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

```jsx
const user = {
  name: '张三',
  age: 18,
  gender: 0
}

const element = (
  <div>
    <p>姓名：{user.name}</p>
    <p>年龄：{user.age}</p>
    <p>性别：{user.gender === 0 ? '男' : '女'}</p>
  </div>
)
```

## 在 JavaScript 表达式中嵌入 JSX

```jsx
function getGreeting (user) {
  if (user) {
    return <h1>Hello, {user.name}</h1>
  }
  return <h1>Hello, Stranger.</h1>
}

const user = {
  name: 'Jack'
}

const element = getGreeting(user)

ReactDOM.render(
  element,
  document.getElementById('root')
)
```

## JSX 中的节点属性

- 动态绑定属性值
- `class` 使用 `className`
- `tabindex` 使用 `tabIndex`
- `for` 使用 `htmlFor`

普通的属性：

```jsx
const element = <div tabIndex="0"></div>;
```

在属性中使用表达式：

```jsx
const element = <img src={user.avatarUrl}></img>;
```

## 声明子节点

- 必须有且只有一个根节点

如果标签是空的，可以使用 `/>` 立即关闭它。

```jsx
const element = <img src={user.avatarUrl} />;
```

JSX 子节点可以包含子节点（最好加上小括号，防止自动分号的问题）：

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## JSX 自动阻止注入攻击

原样输出：

```jsx
const element = <div>{'<h1>this is safe</h1>'}</div>
```

输出 html：

```jsx
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

## 在 JSX 中使用注释

> 参考文档：
>
> - https://reactjs.org/docs/faq-build.html#how-can-i-write-comments-in-jsx

在 JavaScript 中的注释还是以前的方式：

```javascript
// 单行注释

/*
 * 多行注释
 */
```

在 jsx 的标签中写注释需要注意：

写法一（不推荐）：

```jsx
{
  // 注释
  // ...
}

注意，下面是错误的写法：
{// }
因为 // 会把后面的 } 也给注释掉
```

写法二（推荐）：

```jsx
{/* 单行注释 */}
```

写法三（多行）：

```jsx
{
  /*
   * 多行注释
   */
}
```

## JSX 原理

Babel 会把 JSX 编译为 `React.createElement()` 函数。

下面两种方式是等价的：

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```jsx
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

```javascript
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

## DOM Elements

> 参考文档：https://reactjs.org/docs/dom-elements.html

## JSX 语法高亮

>  http://babeljs.io/docs/editors

## 参考链接

- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
- [React Without JSX](https://reactjs.org/docs/react-without-jsx.html)
