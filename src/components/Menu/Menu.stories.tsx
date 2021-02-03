import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import { Menu, IMenuProps } from './Menu'
import { MenuItem } from './MenuItem'
import { SubMenu } from './SubMenu'

export default {
  title: '组件/Menu',
  component: Menu,
  decorators: []
} as Meta

const DefaultTemplate: Story<IMenuProps> = (args) => (
  <Menu {...args} onSelect={i => alert(i)}>
    <MenuItem>888</MenuItem>
    <MenuItem disabled>999</MenuItem>
    <SubMenu title="000">
      <MenuItem>111</MenuItem>
      <MenuItem>222</MenuItem>
    </SubMenu>
  </Menu>
)
export const DefaultMenu = DefaultTemplate.bind({})
// 可以传入props
DefaultMenu.args = {}
