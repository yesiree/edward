import { BaseNode } from './base-node.model'

export class ImageNode extends BaseNode {
  constructor(
    public uri: string,
    public caption: string,
    public alignment: 'left' | 'right' | 'center' | 'justified',
    public size: 'small' | 'medium' | 'large'
  ) {
    super()
  }
}
