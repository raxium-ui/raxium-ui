import { PinInput } from '../index'

export function PinInputSeparatorExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">With dash separator</span>
        <PinInput count={4} separator="-" placeholder="○" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">6-digit OTP with separator</span>
        <PinInput count={6} separator="·" otp placeholder="○" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-cc">6-digit OTP with separator</span>
        <PinInput count={6} otp separator={['', '', '·', '', '']} />
      </div>
    </div>
  )
}
