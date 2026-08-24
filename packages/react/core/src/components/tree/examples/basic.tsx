import { createTreeCollection } from '@ark-ui/react/tree-view'
import { useState } from 'react'
import { Tree } from '../index'

type Node = {
  id: string
  name: string
  children?: Node[]
}

const rootNode: Node = {
  id: 'root',
  name: 'root',
  children: [
    {
      id: 'docs',
      name: 'Docs',
      children: [
        { id: 'getting-started', name: 'Getting Started' },
        { id: 'api', name: 'API' },
      ],
    },
    {
      id: 'examples',
      name: 'Examples',
      children: [
        { id: 'basic', name: 'Basic' },
        { id: 'advanced', name: 'Advanced' },
      ],
    },
    { id: 'changelog', name: 'Changelog' },
  ],
}

const collection = createTreeCollection<Node>({
  rootNode,
  nodeToValue: node => node.id,
  nodeToString: node => node.name,
  nodeToChildren: node => node.children ?? [],
})

export function TreeBasicExample() {
  const [expandedValue, setExpandedValue] = useState<string[]>(['docs'])
  const [selectedValue, setSelectedValue] = useState<string[]>(['getting-started'])

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        expanded:
        {' '}
        <span className="text-gray-ff">{expandedValue.join(', ') || '(empty)'}</span>
        {' '}
        / selected:
        {' '}
        <span className="text-gray-ff">{selectedValue.join(', ') || '(empty)'}</span>
      </div>
      <div className="w-full max-w-[560px] rounded-md border border-gray-33 p-3">
        <Tree
          collection={collection}
          expandedValue={expandedValue}
          selectedValue={selectedValue}
          onExpandedChange={details => setExpandedValue(details.expandedValue)}
          onSelectionChange={details => setSelectedValue(details.selectedValue)}
        >
          {rootNode.children?.map((node, index) => (
            <Tree.Node key={node.id} node={node} indexPath={[index]} />
          ))}
        </Tree>
      </div>
    </div>
  )
}
