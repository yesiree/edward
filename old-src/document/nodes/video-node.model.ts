import { BaseNode } from './base-node.model'
import { MediaSource } from './media-source.model'

export class VideoNodeOptions {
  controls: boolean = true
  controlslist: ('nodownload' | 'nofullscreen' | 'noremoteplayback')[] = []
  poster: string | null = null
  autoplay: boolean = false
  loop: boolean = false
  muted: boolean = false
  preload: 'none' | 'metadata' | 'auto' = 'metadata'
}

export class VideoNode extends BaseNode {
  constructor(
    public sources: MediaSource[] = [],
    public caption: string = '',
    public options: VideoNodeOptions = new VideoNodeOptions()
  ) {
    super()
  }
}
