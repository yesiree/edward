import { BaseNode } from './base-node.model'

export class CodeTermNode extends BaseNode {
  constructor(
    public language: string = '',
    public code: string = ''
  ) {
    super()
  }
}
