import { Accordion, Badge, Button, Checkbox, Collapsible, DatePicker, Dialog, Editable, FloatingPanel, Hotkey, HoverCard, Icon, Input, Popover, Progress, RadioGroup, RUIConfig, Skeleton, Spin, Switch, Tabs, Tooltip, useToast } from '@raxium/react'

function PlaygroundToast() {
  const { toast } = useToast()
  return (
    <Button variant="outlined" onClick={() => toast.success({ title: 'Toast', description: 'from playground' })}>
      Toast
    </Button>
  )
}

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
        <div className="flex items-center gap-2 text-base">
          <Icon icon="lucide:check" className="text-rz-green" />
          <Icon icon="lucide:plus" />
          <Icon icon="lucide:loader-circle" className="animate-spin" />
        </div>
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
        <FloatingPanel minSize={{ width: 360, height: 240 }}>
          <FloatingPanel.Trigger asChild>
            <Button>FloatingPanel</Button>
          </FloatingPanel.Trigger>
          <FloatingPanel.Content>
            <FloatingPanel.Header control={<FloatingPanel.CloseTrigger />}>
              Playground Panel
            </FloatingPanel.Header>
            <div className="p-3 text-sm">Compound API: Trigger / Content / Header.</div>
          </FloatingPanel.Content>
        </FloatingPanel>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <Button variant="outlined">Tooltip</Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Tooltip
          </Tooltip.Content>
        </Tooltip>
        <Popover>
          <Popover.Trigger asChild>
            <Button variant="outlined">Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            Popover
          </Popover.Content>
        </Popover>
        <HoverCard positioning={{ placement: 'top' }}>
          <HoverCard.Trigger asChild>
            <Button variant="outlined">HoverCard</Button>
          </HoverCard.Trigger>
          <HoverCard.Content>
            <HoverCard.Arrow />
            Compound API: Trigger / Content / Arrow.
          </HoverCard.Content>
        </HoverCard>
        <Input className="w-60" placeholder="Input" clearable />
        <Skeleton className="h-4 w-56" />
        <Progress className="w-56" value={45}>
          <Progress.Linear />
        </Progress>
        <RadioGroup defaultValue="a">
          <RadioGroup.Layout layout="inline">
            <RadioGroup.Item value="a" text="A" />
            <RadioGroup.Item value="b" text="B" />
          </RadioGroup.Layout>
        </RadioGroup>
        <PlaygroundToast />
        <Tabs defaultValue="a">
          <Tabs.List>
            <Tabs.Trigger value="a">A</Tabs.Trigger>
            <Tabs.Trigger value="b">B</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="a">Tab A</Tabs.Content>
          <Tabs.Content value="b">Tab B</Tabs.Content>
        </Tabs>
        <div className="relative h-20 rounded border border-gray-33 p-3">
          <div className="text-sm">Spin host</div>
          <Spin show={false} />
        </div>
        <Switch defaultChecked>
          <Switch.Label>Switch</Switch.Label>
        </Switch>
        <Hotkey defaultHotkey="" className="w-80" />
        <Editable defaultValue="Editable" placeholder="Edit me">
          <Editable.Input clearable />
          <Editable.Preview />
        </Editable>
        <Dialog>
          <Dialog.Trigger asChild>
            <Button>Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Content className="w-120">
            <Dialog.Header>Playground Dialog</Dialog.Header>
            <Dialog.Body>Compound API: Dialog.Trigger / Content / Header / Body / Footer.</Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog>
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
