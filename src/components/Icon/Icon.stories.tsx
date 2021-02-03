import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Icon, IIconProps } from './Icon'

export default {
  title: '组件/Icon',
  component: Icon
} as Meta

const DefaultTemplate: Story<IIconProps> = (args) => <Icon {...args} />
export const Default = DefaultTemplate.bind({})
Default.args = {
  icon: 'download',
  size: '5x'
}
