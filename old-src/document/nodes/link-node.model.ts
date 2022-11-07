import { ContainerNode } from './container-node.model'

export class LinkNode extends ContainerNode {
  constructor(
    public uri: string
  ) {
    super()
  }
}
