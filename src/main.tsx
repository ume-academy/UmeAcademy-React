import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './scss/index.scss'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './contexts/ThemeContext'
import { ModeProvider } from './contexts/ModeUser'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ModeProvider>
          <ThemeProvider >
            <ConfigProvider theme={{hashed: false}} wave={{disabled: true}} >
              <App />
            </ConfigProvider>
          </ThemeProvider>
        </ModeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
