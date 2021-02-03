import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Alert, IAlertProps } from './Alert'

export default {
  title: '组件/Alert',
  component: Alert,
  decorators: []
} as Meta

const DefaultTemplate: Story<IAlertProps> = (args) => <Alert {...args} />
export const DefaultAlert = DefaultTemplate.bind({})
DefaultAlert.args = {
  message: 'hudada'
}
