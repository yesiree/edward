import { BaseNode } from './base-node.model'

export abstract class ContainerNode extends BaseNode {
  children: BaseNode[] = []
  constructor() {
    super()
  }
}
