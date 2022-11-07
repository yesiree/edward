import { AudioNode } from '../document/nodes/audio-node.model'
import { BlockquoteNode } from '../document/nodes/blockquote-node.model'
import { BoldNode } from '../document/nodes/bold-node.model'
import { CodeNode } from '../document/nodes/code-node.model'
import { CodeTermNode } from '../document/nodes/code-term-node.model'
import { Document } from '../document/document.model'
import { HeadingNode } from '../document/nodes/heading-node.model'
import { ImageNode } from '../document/nodes/image-node.model'
import { ItalicNode } from '../document/nodes/italic-node.model'
import { LinkNode } from '../document/nodes/link-node.model'
import { ListItemNode } from '../document/nodes/list-item-node.model'
import { ListNode } from '../document/nodes/list-node.model'
import { MediaSource } from '../document/nodes/media-source.model'
import { ParagraphNode } from '../document/nodes/paragraph-node.model'
import { StrikeNode } from '../document/nodes/strike-node.model'
import { TextNode } from '../document/nodes/text-node.model'
import { UnderlineNode } from '../document/nodes/underline-node.model'
import { VideoNode } from '../document/nodes/video-node.model'


export interface Renderer {
  render(document: Document): string

  renderHeadingNode(node: HeadingNode, content: string): string
  renderBlockquote(node: BlockquoteNode, content: string): string
  renderParagraph(node: ParagraphNode, content: string): string

  renderListNode(node: ListNode, content: string): string
  renderListItemNode(node: ListItemNode, content: string): string

  renderTextNode(node: TextNode): string
  renderLinkNode(node: LinkNode, content: string): string

  renderCodeNode(node: CodeNode, content: string): string
  renderCodeTermNode(node: CodeTermNode, content: string): string

  renderBoldNode(node: BoldNode, content: string): string
  renderItalicNode(node: ItalicNode, content: string): string
  renderUnderlineNode(node: UnderlineNode, content: string): string
  renderStrikeNode(node: StrikeNode, content: string): string

  renderImageNode(node: ImageNode): string
  renderAudioNode(node: AudioNode): string
  renderVideoNode(node: VideoNode): string
  renderMediaSource(node: MediaSource): string
}
