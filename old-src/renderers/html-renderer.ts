
import { AudioNode } from '../document/nodes/audio-node.model'
import { BaseNode } from '../document/nodes/base-node.model'
import { BlockquoteNode } from '../document/nodes/blockquote-node.model'
import { BoldNode } from '../document/nodes/bold-node.model'
import { CodeNode } from '../document/nodes/code-node.model'
import { CodeTermNode } from '../document/nodes/code-term-node.model'
import { Document } from '../document/document.model'
import { EmNode } from '../document/nodes/em-node.model'
import { HeadingNode } from '../document/nodes/heading-node.model'
import { ImageNode } from '../document/nodes/image-node.model'
import { ItalicNode } from '../document/nodes/italic-node.model'
import { LinkNode } from '../document/nodes/link-node.model'
import { ListItemNode } from '../document/nodes/list-item-node.model'
import { ListNode } from '../document/nodes/list-node.model'
import { MediaSource } from '../document/nodes/media-source.model'
import { ParagraphNode } from '../document/nodes/paragraph-node.model'
import { Renderer } from './renderer'
import { StrikeNode } from '../document/nodes/strike-node.model'
import { StrongNode } from '../document/nodes/strong-node.model'
import { TextNode } from '../document/nodes/text-node.model'
import { UnderlineNode } from '../document/nodes/underline-node.model'
import { VideoNode } from '../document/nodes/video-node.model'


export class HtmlRendererOptions {
  prettyPrint?: boolean = false
  inlineUnderline?: boolean = false
  inlineStrikethrough?: boolean = false
}

export class HtmlRenderer implements Renderer {
  constructor(
    private document: Document,
    private opts: HtmlRendererOptions = new HtmlRendererOptions()
  ) { }

  render(): string {
    const depth = this.opts.prettyPrint ? 0 : undefined
    return this.renderChildren([this.document], depth)
  }

  private renderChildren(children: BaseNode[], depth?: number | undefined): string {
    let sep = '', deeper: number | undefined = undefined
    if (typeof depth === 'number') {
      sep = '\n' + '  '.repeat(depth)
      deeper = depth + 1
    }
    if (!children || !children.length) return ''
    return children
      .map(child => {
        if (child instanceof Document) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderDocument(child, content)
        } else if (child instanceof HeadingNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderHeadingNode(child, content)
        } else if (child instanceof BlockquoteNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderBlockquote(child, content)
        } else if (child instanceof ParagraphNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderParagraph(child, content)
        } else if (child instanceof ListNode) {
          const content = this.renderChildren(child.items, deeper)
          return this.renderListNode(child, content)
        } else if (child instanceof ListItemNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderListItemNode(child, content)
        } else if (child instanceof TextNode) {
          return this.renderTextNode(child)
        } else if (child instanceof LinkNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderLinkNode(child, content)
        } else if (child instanceof CodeNode) {
          return this.renderCodeNode(child)
        } else if (child instanceof CodeTermNode) {
          return this.renderCodeTermNode(child)
        } else if (child instanceof StrongNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderStrongNode(child, content)
        } else if (child instanceof EmNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderEmNode(child, content)
        } else if (child instanceof BoldNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderBoldNode(child, content)
        } else if (child instanceof ItalicNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderItalicNode(child, content)
        } else if (child instanceof UnderlineNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderUnderlineNode(child, content)
        } else if (child instanceof StrikeNode) {
          const content = this.renderChildren(child.children, deeper)
          return this.renderStrikeNode(child, content)
        } else if (child instanceof ImageNode) {
          return this.renderImageNode(child)
        } else if (child instanceof AudioNode) {
          return this.renderAudioNode(child)
        } else if (child instanceof VideoNode) {
          return this.renderVideoNode(child)
        } else if (child instanceof MediaSource) {
          return this.renderMediaSource(child)
        }
      })
      .join(sep)
  }

  renderDocument(node: Document, content: string): string {
    return `<!doctype html>\n<html>\n<body>\n${content}\n</body>\n</html>`
  }
  renderHeadingNode(node: HeadingNode, content: string): string {
    return `<h${node.level}>${content}</h${node.level}>`
  }
  renderBlockquote(node: BlockquoteNode, content: string): string {
    return `<blockquote>${content}</blockquote>`
  }
  renderParagraph(node: ParagraphNode, content: string): string {
    return `<p>${content}</p>`
  }
  renderListNode(node: ListNode, content: string): string {
    return node.ordered
      ? `<ol>${content}</ol>`
      : `<ul>${content}</ul>`
  }
  renderListItemNode(node: ListItemNode, content: string): string {
    return `<li>${content}</li>`
  }
  renderTextNode(node: TextNode): string {
    return node.content
  }
  renderLinkNode(node: LinkNode, content: string): string {
    return `<a href="${node.uri}">${content}</a>`
  }
  renderCodeNode(node: CodeNode): string {
    return `<pre><code class="language-${node.language}">${node.code}</code></pre>`
  }
  renderCodeTermNode(node: CodeTermNode): string {
    return `<code class="language-${node.language}">${node.code}</code>`
  }
  renderStrongNode(node: StrongNode, content: string): string {
    return `<string>${content}</strong>`
  }
  renderEmNode(node: EmNode, content: string): string {
    return `<em>${content}</em>`
  }
  renderBoldNode(node: BoldNode, content: string): string {
    return `<b>${content}</b>`
  }
  renderItalicNode(node: ItalicNode, content: string): string {
    return `<i>${content}</i>`
  }
  renderUnderlineNode(node: UnderlineNode, content: string): string {
    const attr = this.opts.inlineUnderline
      ? ' style="text-decoration: underline"'
      : ' class="underline"'
    return `<span${attr}>${content}</span>`
  }
  renderStrikeNode(node: StrikeNode, content: string): string {
    const attr = this.opts.inlineStrikethrough
      ? ' style="text-decoration: line-through"'
      : ' class="strikethrough"'
    return `<span${attr}>${content}</span>`
  }
  renderImageNode(node: ImageNode): string {
    return `<img src="${node.uri}" />`
  }
  renderAudioNode(node: AudioNode): string {
    const {
      controls,
      autoplay,
      loop,
      muted,
      preload
    } = node.options
    let attrs = ''
    if (controls) attrs = ' controls' + attrs
    if (autoplay) attrs = ' autoplay' + attrs
    if (loop) attrs = ' loop' + attrs
    if (muted) attrs = ' muted' + attrs
    if (preload) attrs = ' preload' + attrs
    const sources = node.sources
      .map(x => this.renderMediaSource(x))
      .join(' ')
    return `<audio${attrs}>${sources}</audio`
  }
  renderVideoNode(node: VideoNode): string {
    const {
      controls,
      controlslist,
      poster,
      autoplay,
      loop,
      muted,
      preload
    } = node.options
    let attrs = ''
    if (controls) attrs = ' controls' + attrs
    if (Array.isArray(controlslist)) attrs = controlslist.join(' ') + attrs
    if (poster) attrs = ` poster="${poster}"` + attrs
    if (autoplay) attrs = ' autoplay' + attrs
    if (loop) attrs = ' loop' + attrs
    if (muted) attrs = ' muted' + attrs
    if (preload) attrs = ' preload' + attrs
    const sources = node.sources
      .map(x => this.renderMediaSource(x))
      .join(' ')
    return `<vidoe${attrs}>${sources}</video>`
  }
  renderMediaSource(source: MediaSource): string {
    return `<source src="${source.uri}" type="${source.type}">`
  }
}
