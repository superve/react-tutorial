React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。

## 使用组件

### 函数式组件（无状态）

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

组件构成：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### 抽取组件

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```



### 类方式组件（有状态）

### class 补充

> 本质就是对 EcmaScript 5 中构造函数的一个语法糖
>
> 就是让你写构造函数（类）更方便了

- 基本语法
- `constructor` 构造函数
- 实例成员
  - 实例属性
  - 实例方法
- 类成员
  - 静态方法
  - 静态属性

### class 组件语法

> 在 React 中推荐使用 EcmaScript 6 Class 的方式类定义组件

```jsx
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// Example usage: <ShoppingList name="Mark" />
```

本质：

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

### 组件规则注意事项

- 组件类的第一个首字母必须大写
  + React 在解析的时候，是以标签的首字母来区分的
  + 如果首字母是小写则当作 HTML 来解析
  + 如果首字母是大小则当作组件来解析
  + 结论：组件首字母必须大写
- 组件类必须有 `render` 方法
- 组件类必须有且只有一个根节点
- 组件属性可以在组件的 `props` 获取
  - 函数需要声明参数：`props`
  - 类直接通过 `this.props`

---

## 组件传值 Props

- Props 是只读的，不能修改

EcmaScript 5 构造函数：

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

EcmaScript 6 Class：

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### `this.props.children`

> 参考文档：https://reactjs.org/docs/react-api.html#reactchildren

`this.props` 对象的属性与组件的属性一一对应，但是有一个例外，就是 `this.props.children` 属性。

它表示组件的所有子节点。

`this.props.children` 的值有三种可能：如果当前组件没有子节点，它就是 `undefined`;如果有一个子节点，数据类型是 `object` ；如果有多个子节点，数据类型就是 `array` 。所以，处理 `this.props.children` 的时候要小心。

React 提供一个工具方法 [`React.Children`](https://facebook.github.io/react/docs/top-level-api.html#react.children) 来处理 `this.props.children` 。我们可以用 `React.Children.map` 来遍历子节点，而不用担心 `this.props.children` 的数据类型是 `undefined` 还是 `object`。

---

## 组件状态 State

> 参考文档：https://reactjs.org/docs/state-and-lifecycle.html

---

## 组件生命周期

> 参考文档：
> - [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
> - [完整生命周期](https://reactjs.org/docs/react-component.html#the-component-lifecycle)

Mounting:

- constructor
- componentWillMount()
- render()
- componentDidMount()

Updating:

- shouldComponentUpdate()
- componentWillUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

```jsx
/**
 * 《React 组件生命周期》
 * Vue.js 生命周期钩子函数 cmud（create、mount、update、destroy）
 * 
 * Mounting
 *   constructor() 组件类的构造函数
 *      对 state 做初始化工作
 *      在这个阶段还不能调用 setState 修改数据状态
 *      因为这个阶段是用来初始化 state 数据的
 *   componentWillMount() 组件将要挂载
 *     这里可以改状态
 *     但是还是依然无法获取 ref 引用的 DOM 元素
 *     这里可以用来发请求
 *   render() 开始渲染
 *   componentDidMount() 已完成挂载渲染
 *     既能获取 ref 引用的 DOM
 *     也可以用来修改 state 状态
 *     这里也可以用来发请求
 * Updating
 *   componentWillUpdate() 组件将要更新
 *       更新前的视图状态
 *   render() 调用渲染方法执行更新
 *   componentDidUpdate() 组件已完成更新
 *       更新后的视图状态
 * Unmounting
 *   componentWillUnmount() 组件已卸载
 */

class App extends React.Component {
  constructor () {
    console.log('============= constructor 1 ============')
    super()
    this.state = {
      message: 'hello'
    }
    // console.log(this.refs.app)
  }

  componentWillMount () {
    console.log('================= componentWillMount 2 ==============')
    // console.log(this.refs.app)
    this.setState({
      message: 'world'
    })
  }

  render () {
    console.log('================= render 3 ==============')
    return (
      <div ref="app">
        <p>app compoennt</p>
        <p>{this.state.message}</p>
        <button onClick={this.changeMessage.bind(this)}>点击改变 message</button>
      </div>
    )
  }

  componentDidMount () {
    console.log('================= componentDidMount 4 ==============')
    console.log(this.refs.app)
    this.setState({
      message: 'hahaha'
    })
  }

  componentWillUpdate () {
    console.log('================= componentWillUpdate 5 ==================')
    console.log(this.refs.app.innerHTML)
  }

  componentDidUpdate () {
    console.log('================= componentDidUpdate 6 ==================')
    console.log(this.refs.app.innerHTML)
  }

  changeMessage () {
    this.setState({
      message: '黑马程序员'
    })
  }
}

// 将 App 组件渲染到 div#app 节点中
ReactDOM.render(
  <App></App>,
  document.getElementById('app')
)

```

---

## PropTypes 类型校验

> 参考文档：https://reactjs.org/docs/typechecking-with-proptypes.html

组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。

示例：

```jsx
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

### Default Prop Values 

> 参考文档：https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values

示例：

```jsx
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// Specifies the default values for props:
Greeting.defaultProps = {
  name: 'Stranger'
};

// Renders "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

或者：

```jsx
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

---

## React Without ES6

> 参考文档：https://reactjs.org/docs/react-without-es6.html

---

## 获取真实 DOM 节点

> 参考链接：
> - [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 [DOM diff](http://calendar.perfplanet.com/2013/diff/) ，它可以极大提高网页的性能表现。

但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 `ref` 属性。

### 之前的方式（最简单，但是有问题）

引用：

```jsx
<input type="text" ref="inputText" />
```

访问：

```jsx
this.refs.inputText
```

### 官方推荐的方式

在构造函数中初始化：

```javascript
constructor () {
  this.inputText = React.createRef()
}
```

在模板中绑定引用：

```jsx
<input type="text" ref={this.inputText} />
```

访问：

```jsx
this.inputText.current
```

### 官方推荐的第二种方式

引用：

```jsx
<input type="text" ref={el => this.inputText = el} />
```

访问：

```jsx
this.inputText
```
