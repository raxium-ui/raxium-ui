import { Accordion, Badge, Button, Checkbox, Collapsible, DatePicker, RUIConfig } from '@raxium/react'

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
        <div className="flex items-center gap-2">
          <Button>Button</Button>
          <Button variant="outlined" color="default">Outlined</Button>
          <Button loading>Loading</Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <span className="text-sm text-gray-ff relative">
            Dot
            <Badge variant="dot" as="sup" />
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox defaultChecked label="Checkbox" />
          <Checkbox defaultChecked="indeterminate" label="Mixed" />
        </div>
        <DatePicker lazyMount unmountOnExit>
          <DatePicker.Control className="w-fit">
            <DatePicker.Trigger>
              <Button>DatePicker</Button>
            </DatePicker.Trigger>
          </DatePicker.Control>
          <DatePicker.Content>
            <DatePicker.DayView />
            <DatePicker.MonthView />
            <DatePicker.YearView />
          </DatePicker.Content>
        </DatePicker>
        <Collapsible className="w-full">
          <Collapsible.Trigger>
            <span className="text-sm text-gray-ff">Collapsible</span>
          </Collapsible.Trigger>
          <Collapsible.Content className="mt-2">
            <p className="text-sm text-gray-cc">Compound API: Collapsible.Trigger / Content.</p>
          </Collapsible.Content>
        </Collapsible>
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
