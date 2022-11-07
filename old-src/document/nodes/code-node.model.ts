import { BaseNode } from './base-node.model'

export class CodeNode extends BaseNode {
  constructor(
    public language: string = '',
    public code: string = ''
  ) {
    super()
  }
}
