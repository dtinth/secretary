import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { CssVarsProvider } from '@mui/joy'
import { GlobalStyles } from '@mui/system'
import './index.css'
import theme, { Theme } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider
      theme={theme}
      defaultMode="dark"
      defaultColorScheme="dark"
      //
      // Setting `defaultMode` and `defaultColorScheme` to `dark` has
      // no effect if the UI previously rendered in light mode.
      //
      // This is because `mui-system` will automatically persist the mode
      // and color scheme to local storage.
      //
      // So to force the UI to render in a dark mode, just changing the
      // default mode is not enough -- I have to use a different storage key
      // so that `mui-system` will not pick up the persisted mode.
      //
      colorSchemeStorageKey="wtf-color-scheme"
      modeStorageKey="wtf-mode"
    >
      <GlobalStyles
        styles={(theme: Theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      <App />
    </CssVarsProvider>
  </React.StrictMode>,
)
