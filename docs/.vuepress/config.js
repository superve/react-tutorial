module.exports = {
  base: '/',
  themeConfig: {
    nav: [ // 导航栏
      // { text: 'Home', link: '/' },
      // { text: '去百度', link: 'http://www.baidu.com' },
      // { text: 'Guide', link: '/guide/' },
      // { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [ // 侧边栏
      ['/introduction', '第1章 介绍'],
      ['/getting-started', '第2章 起步'],
      ['/jsx', '第3章 JSX 语法'],
      ['/list'],
      ['/forms', '表单输入绑定'],
      ['/components.md', '组件'],
      ['/todomvc-react', '基础案例 TodoMVC'],
      ['/react-router', 'React Router'],
      ['/other', '其它']
    ]
  }
}
