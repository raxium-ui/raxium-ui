import { RUIConfig, ThemeContext, ThemeProvider } from '@raxium/react'

export function App() {
  return (
    <RUIConfig
      theme={{
        size: 'base',
        unstyled: false,
        bordered: true,
        skin: 'razer',
        surface: 'dark',
      }}
    >
      <div className="content p-4 space-y-4">
        <h1 className="text-lg">@raxium/react playground</h1>
        <p className="text-sm text-gray-cc">
          Framework is ready. Add component examples under
          {' '}
          <code>src/examples</code>
          {' '}
          as they land.
        </p>
        <ThemeProvider value={{ size: 'lg' }}>
          <ThemeContext>
            {theme => (
              <pre className="text-sm">
                {JSON.stringify(
                  {
                    skin: theme.skin,
                    surface: theme.surface,
                    size: theme.size,
                    bordered: theme.bordered,
                  },
                  null,
                  2,
                )}
              </pre>
            )}
          </ThemeContext>
        </ThemeProvider>
      </div>
    </RUIConfig>
  )
}
