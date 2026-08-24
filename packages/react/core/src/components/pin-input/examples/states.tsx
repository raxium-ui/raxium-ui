import { PinInput } from '../index'

export function PinInputStatesExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">Default</span>
        <PinInput count={4} placeholder="○" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">Disabled</span>
        <PinInput count={4} disabled placeholder="○" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">Invalid</span>
        <PinInput count={4} invalid placeholder="○" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">Read Only</span>
        <PinInput count={4} defaultValue={['1', '2', '3', '4']} readOnly />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">Masked (password)</span>
        <PinInput count={4} mask placeholder="○" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">OTP (autocomplete)</span>
        <PinInput count={6} otp placeholder="○" />
      </div>
    </div>
  )
}
