import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'

import { Button, ButtonProps } from './Button'

export default {
  title: '组件/Button',
  component: Button,
  decorators: []
} as Meta

const DefaultTemplate: Story<ButtonProps> = (args) => <Button {...args} onClick={action('clicked')} />
export const DefaultButton = DefaultTemplate.bind({})
DefaultButton.args = {
  children: 'hudada'
}
