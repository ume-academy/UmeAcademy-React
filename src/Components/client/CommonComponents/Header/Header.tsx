import { MoonFilled, SunFilled } from '@ant-design/icons'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext, ThemeContextType } from '../../../../contexts/ThemeContext'

const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext) as ThemeContextType
    return (
        <>
            <ul className={`dark:bg-[#2b2838] dark:text-white bg-[#fff]  flex justify-around h-[60px] items-center w-full`}> 
                <li >
                    <Link to={``}>Vũ</Link>
                </li>
                <li>
                    <Link to={``}>Đức</Link>
                </li>
                <li>
                    <Link to={``}>Giao</Link>
                </li>
                <li>
                    <Link to={``}>Kéo</Link>
                </li>
                <li>
                    <button className='dark:bg-[#fff] flex items-center bg-black p-2 rounded-lg border-none' onClick={toggleTheme}>{theme === 'light' ? <MoonFilled  style={{color: '#fff', fontSize: 16}}/> : <SunFilled style={{color: '#808080', fontSize: 16}} />}</button>
                </li>
            </ul>
        </>
    )
}

export default Header
