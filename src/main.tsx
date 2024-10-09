import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './scss/index.scss'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './contexts/ThemeContext'
import { ModeProvider } from './contexts/ModeUser'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <ThemeProvider >
          <ConfigProvider theme={{hashed: false}}>
            <App />
          </ConfigProvider>
        </ThemeProvider>
      </ModeProvider>
    </BrowserRouter>
  </StrictMode>
)
