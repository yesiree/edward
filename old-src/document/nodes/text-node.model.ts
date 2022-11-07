import { BaseNode } from './base-node.model'

export class TextNode extends BaseNode {
  constructor(public content: string = '') {
    super()
  }
}
