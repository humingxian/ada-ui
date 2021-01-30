import React from 'react'
const styles: React.CSSProperties = {
  padding: '20px 40px'
}


const centerStyles: React.CSSProperties = {
  textAlign: 'center'
}

// 装饰 story 的 组件
export const CenterDecorator = (story: any) => (
  <div style={centerStyles}>
    {story()}
  </div>
)
// 导出装饰器
export const storyWrapper = (story: any) => (
  <div style={styles}>
    <h3>组件演示</h3>
    {story()}
  </div>
)