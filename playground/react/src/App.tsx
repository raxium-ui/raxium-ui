import { Accordion, RUIConfig } from '@raxium/react'

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
      <div className="content p-4 space-y-4 max-w-xl">
        <h1 className="text-lg">@raxium/react playground</h1>
        <Accordion className="w-full flex flex-col gap-2" collapsible defaultValue={['a']}>
          <Accordion.Item value="a">
            <Accordion.Trigger>
              <span className="text-sm text-gray-ff">Accordion (React)</span>
            </Accordion.Trigger>
            <Accordion.Content className="mt-2">
              <p className="text-sm text-gray-cc">
                Compound API: Accordion.Item / Trigger / Content, plus theme crafts.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="b">
            <Accordion.Trigger>
              <span className="text-sm text-gray-ff">Second panel</span>
            </Accordion.Trigger>
            <Accordion.Content className="mt-2">
              <p className="text-sm text-gray-cc">Storybook: pnpm --filter @raxium/react-storybook dev (:4400)</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </RUIConfig>
  )
}
