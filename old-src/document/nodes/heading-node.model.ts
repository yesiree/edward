import { ContainerNode } from './container-node.model'

export class HeadingNode extends ContainerNode {
  constructor(
    public level: 1 | 2 | 3 | 4 | 5 | 6
  ) {
    super()
  }
}
