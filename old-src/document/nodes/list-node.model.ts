import { BaseNode } from './base-node.model'
import { ListItemNode } from './list-item-node.model'

export class ListNode extends BaseNode {
  constructor(
    public ordered: boolean = false,
    public items: ListItemNode[] = []
  ) {
    super()
  }
}
