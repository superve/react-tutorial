## 事件处理

> 参考文档：https://reactjs.org/docs/handling-events.html

### 示例1

HTML 事件绑定：

```jsx
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

React 中 JSX 事件绑定语法：

```jsx
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

### 示例2

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

### 示例3（this 绑定问题）

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

箭头函数：

```jsx
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

更简单的方式：

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

### 示例4（传递参数）

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

### 事件绑定中的 this 指向问题（坑）

> 多分享，多交流

第一种绑定方式（不做任何处理）：

- `this` 是 `undefined`
- 默认接收一个参数 `event` 事件源对象
- 不支持额外的参数传递

```jsx
<button onClick={this.handleClick}>点击改变 message</button>
```

第二种方式（bind）：

- `this` 指向组件实例
- 默认接收一个参数 `event`

```jsx
<button onClick={this.handleClick.bind(this)}>点击改变 message</button>
```

第二种方式还可以为方法传递额外参数：

- 手动传递的参数会放到函数最前面，`event` 会作为函数的最后一个参数

```jsx
<button onClick={this.handleClick.bind(this, 123, 456)}>点击改变 message</button>
```

第三种方式（箭头函数）：

- 自动 bind  this
- 手动传递参数
- 参数顺序自己指定，`event` 也需要自己手动传递

```jsx
<button onClick={(e) => {this.handleClick(e, 123, 456)}}>点击改变 message</button>
```
