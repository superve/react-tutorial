## Class 和 Style

> 参考文档：
>
> - [FAQ - Styling and CSS](https://reactjs.org/docs/faq-styling.html)
> - [DOM Elements - style](https://reactjs.org/docs/dom-elements.html#style)

class:

```jsx
<div className="before" title="stuff" />
```

style:

```jsx
<div style={{color: 'red', fontWeight: 'bold'}} />
```

### classNames

> classNames 是一个第三方工具库，可以很方便的帮我们根据条件拼接样式类名
>
> https://github.com/JedWatson/classnames

```javascript
className="xxxx"
className={item.done === true ? 'completed abc' : ''}


className={getClassNames({
  completed: item.done,
  foo: item.done
})}

function getClassNames (obj) {
  var classNames = []
  for (var key in obj) {
    if (obj.key === true) {
      // ['completed', 'foo']
      classNames.push(key)
    }
  }
  // completed foo
  return classNames.join(' ')
}

```
