import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { Alert, IAlertProps } from './Alert'

const testDefault: IAlertProps = {
  message: '我是test-message'
}

describe('test Alert component', () => {
  test('应该渲染一个默认配置的的 Alert 组件', async () => {
    const wrapper = render(<Alert {...testDefault} />)
    const element = wrapper.getByTestId('test-alert')
    const closeEl = wrapper.getByText('关闭')
    expect(element).toBeTruthy()
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert alert-default alert-width-message')
    fireEvent.click(closeEl)
    await waitFor(() => {
      expect(element).toBeFalsy()
    })
  })
})
