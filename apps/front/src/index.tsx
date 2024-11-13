import React from 'react'
import { createRoot } from 'react-dom/client'

import AppSetup from './app-setup'

const rootElement = document.querySelector(`#root`)
if (!rootElement) throw new Error(`Failed to find the root element`)

const root = createRoot(rootElement)

root.render(
  <AppSetup />
)
