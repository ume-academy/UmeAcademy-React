import { Footer } from "antd/es/layout/layout"

const Footer_Admin = () => {
  return (
    <Footer className="dark:bg-[#2B2838] bg-[#eeeeee] dark:text-[#b9b7c0] h-4 flex justify-center items-center">
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  )
}

export default Footer_Admin