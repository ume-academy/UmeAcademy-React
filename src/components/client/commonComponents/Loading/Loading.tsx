import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const Loading = () => {
  return (
    <Spin indicator={
      <LoadingOutlined
        style={{ 
          fontSize: 48, 
          color: '#f66962'
        }}
        spin
      />
    }
    />
  )
}

export default Loading