import { RatingGroup } from '../index'

const items = [1, 2, 3, 4, 5]

export function RatingGroupStatesExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full max-w-[520px] flex flex-col gap-3">
        <div className="text-sm text-gray-cc">
          Disabled
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <RatingGroup defaultValue={3} disabled count={5}>
            {items.map(index => (
              <RatingGroup.Item key={index} index={index} />
            ))}
          </RatingGroup>
        </div>

        <div className="text-sm text-gray-cc">
          ReadOnly
        </div>
        <div className="rounded-md border border-gray-33 p-3">
          <RatingGroup defaultValue={4} readOnly count={5}>
            {items.map(index => (
              <RatingGroup.Item key={index} index={index} />
            ))}
          </RatingGroup>
        </div>
      </div>
    </div>
  )
}
