import React from 'react'
import { render } from '@testing-library/react'
import Icon from './Icon'

describe('test Icon component', () => {
  test('应该渲染一个 dragon 的 icon', () => {
    const wrapper = render(<Icon icon='dragon' size='1x' className='test-icon' data-testid='test-icon' />)
    const icon = wrapper.getByTestId('test-icon')
    expect(icon).toBeInTheDocument()
    expect(icon.tagName).toEqual('svg')
    expect(icon).toHaveClass('svg-inline--fa fa-dragon fa-w-20 fa-1x ada-icon test-icon')
  })
})
