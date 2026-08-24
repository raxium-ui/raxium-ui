import { Switch } from '../index'

export function SwitchWithLabelExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Switch>
        <Switch.Label>Switch with label</Switch.Label>
      </Switch>
      <Switch theme={{ size: 'lg' }}>
        <Switch.Label className="font-medium">Large switch label</Switch.Label>
      </Switch>
    </div>
  )
}
