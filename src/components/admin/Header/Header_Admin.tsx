import { MoonFilled, SunFilled } from "@ant-design/icons"
import { Header } from "antd/es/layout/layout"

type Header_AdminProps = {
  toggleTheme: () => void
  theme: string
}

const Header_Admin: React.FC<Header_AdminProps> = ({toggleTheme, theme}) => {
  return (
    <Header className='px-4 dark:bg-[#2B2838] bg-[#eeeeee] flex justify-end items-center' >
      <div className="">
        <div className="">
          {/* dark mode */}
          <button
            className='dark:bg-[#fff] flex items-center justify-center bg-black rounded-lg border-none mr-[20px] self-center py-[10px] px-[10px]'
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <MoonFilled rotate={10} style={{ color: '#fff', fontSize: 16 }} />
            ) : (
              <SunFilled style={{ color: '#808080', fontSize: 16 }} />
            )}
          </button>
        </div>
      </div>
    </Header>
  )
}

export default Header_Admin