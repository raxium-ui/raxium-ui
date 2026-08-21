import { ReadMore } from '../index'

const content = 'This is a long content block for the ReadMore demo. '.repeat(20)

export function CollapsibleReadMoreExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <ReadMore id="read-more-default" collapsedHeight={60}>
        <p className="text-sm text-gray-cc">{content}</p>
      </ReadMore>

      <ReadMore
        id="read-more-customized"
        collapsedHeight={60}
        text={{ more: '展开更多', less: '收起' }}
        ui={{ trigger: 'text-sm text-rz-green', content: 'text-gray-cc' }}
      >
        <p className="text-sm">{content}</p>
      </ReadMore>
    </div>
  )
}
