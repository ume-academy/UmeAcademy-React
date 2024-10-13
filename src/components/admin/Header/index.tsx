import { useContext } from 'react';
import DropdownUser from './DropdownUser';
import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';
import { MoonFilled, SunFilled } from '@ant-design/icons';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType

  return (
    <header className="sticky top-0 z-999 flex  w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-3 2xsm:gap-7">
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
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
