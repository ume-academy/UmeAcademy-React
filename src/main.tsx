import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ModeProvider } from './contexts/ModeUser'
import ThemeProvider from './contexts/ThemeContext'
import { store } from './redux/store'
import './scss/index.scss'


createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
      <Provider store={store}>
        <ModeProvider>
          <ThemeProvider>
            <ConfigProvider
              theme={{ hashed: false, 
                  components: { Input: { colorTextPlaceholder: `#9ca3af` } } 
                }}
              wave={{ disabled: true }}
            >
              <App />
            </ConfigProvider>
          </ThemeProvider>
        </ModeProvider>
      </Provider>
    </BrowserRouter>
)
