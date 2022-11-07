import { BaseNode } from './base-node.model'
import { MediaSource } from './media-source.model'

export class AudioNodeOptions {
  controls: boolean = true
  autoplay: boolean = false
  loop: boolean = false
  muted: boolean = false
  preload: 'none' | 'metadata' | 'auto' = 'metadata'
}

export class AudioNode extends BaseNode {
  constructor(
    public sources: MediaSource[] = [],
    public caption: string = '',
    public options: AudioNodeOptions = new AudioNodeOptions()
  ) {
    super()
  }
}
