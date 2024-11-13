import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { ContextProvider } from './context.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>
)
