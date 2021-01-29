import React from 'react'
const styles: React.CSSProperties = {
  textAlign: 'center'
}
export const CenterDecorator = (storyFn: any) => (<div style={styles}>{storyFn()}</div>)