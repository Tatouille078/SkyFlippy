import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { ContextProvider } from './context.tsx'
import { BrowserRouter } from 'react-router-dom'
import { TranslationProvider } from './contexts/TranslationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TranslationProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </TranslationProvider>
  </BrowserRouter>
)
