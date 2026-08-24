import { Tabs } from '../index'

export function TabsDisabledAndNoIndicatorExample() {
  return (
    <Tabs defaultValue="tab-1">
      <Tabs.List className="w-80">
        <Tabs.Trigger value="tab-1">
          Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger value="tab-2" disabled>
          Tab 2 (disabled)
        </Tabs.Trigger>
        <Tabs.Trigger value="tab-3">
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab-1">
        Content 1
      </Tabs.Content>
      <Tabs.Content value="tab-2">
        You shouldn't see this
      </Tabs.Content>
      <Tabs.Content value="tab-3">
        Content 3
      </Tabs.Content>
    </Tabs>
  )
}
