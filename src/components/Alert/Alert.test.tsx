import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Alert, IAlertProps } from './Alert'

const testDefault: IAlertProps = {
  message: '我是test-message',
  onClose: jest.fn()
}

const testWaring: IAlertProps = {
  message: 'test-warning',
  type: 'warning',
  closeable: false,
  title: 'hudada-title',
  showIcon: true,
  className: 'warning-class',
  onClose: jest.fn()
}

describe('test Alert component', () => {
  it('应该渲染一个默认配置的 Alert 组件', async () => {
    const wrapper = render(<Alert {...testDefault} />)
    const element = wrapper.getByTestId('test-alert')
    const closeEl = wrapper.getByText('关闭')
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('ada-alert ada-alert-default ada-alert-width-message')
    fireEvent.click(closeEl)
    expect(testDefault.onClose).toHaveBeenCalled()
    await waitFor(() => {
      // 元素在初始化是存在的
      // 注意使用 queryBy 而不是 getBy， 返回 null 而不是抛出查询本身
      // 当元素在页面不渲染时，就用这种方式 写测试用例
      expect(wrapper.queryByText('关闭')).not.toBeInTheDocument()
    })
  })
  it('应该渲染一个带有icon和 wraning 的 不可关闭的 Alert 组件', async () => {
    const wrapper = render(<Alert {...testWaring} />)
    const element = wrapper.getByTestId('test-alert')
    const titleEl = wrapper.queryByText('hudada-title')
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('ada-alert ada-alert-warning ada-alert-width-message')
    expect(wrapper.queryByText('关闭')).not.toBeInTheDocument()
    expect(titleEl).toBeTruthy()
    expect(titleEl).toBeInTheDocument()
    expect(titleEl).toHaveClass('ada-alert-title')
  })
})
