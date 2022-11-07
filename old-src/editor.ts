export enum CommandType {
  Unknown = 'unknown',

  Undo = 'undo',
  Redo = 'redo',

  Cut = 'cut',
  Copy = 'copy',
  Paste = 'paste',
  PasteAsPlainText = 'pasteAsPlainText',
  SelectAll = 'selectAll',

  Delete = 'delete',
  Backspace = 'backspace',

  Insert = 'insert',

  Save = 'save',
  Open = 'open',
  New = 'new',
  Close = 'close',
  Quit = 'quit',

  ToggleFullscreen = 'toggleFullscreen',
  ToggleSidebar = 'toggleSidebar',

  FormatBold = 'formatBold',
  FormatItalic = 'formatItalic',
  FormatUnderline = 'formatUnderline',
  FormatStrikethrough = 'formatStrikethrough',
  FormatSuperscript = 'formatSuperscript',
  FormatSubscript = 'formatSubscript',
  FormatCode = 'formatCode',
  FormatOrderedList = 'formatOrderedList',
  FormatUnorderedList = 'formatUnorderedList',
  FormatHeader1 = 'formatHeader1',
  FormatHeader2 = 'formatHeader2',
  FormatHeader3 = 'formatHeader3',
  FormatHeader4 = 'formatHeader4',
  FormatHeader5 = 'formatHeader5',
  FormatHeader6 = 'formatHeader6',
  FormatParagraph = 'formatParagraph',
  FormatBlockquote = 'formatBlockquote',
  FormatCodeblock = 'formatCodeblock',

  FormatUnlink = 'formatUnlink',
  FormatLink = 'formatLink',
  FormatHorizontalRule = 'formatHorizontalRule',
  FormatRemoveFormat = 'formatRemoveFormat',
}

export class Command {
  constructor(
    public type: CommandType,
    public param: any
  ) { }
}

type KeyBindingConfig = {
  [key in CommandType]: string
}

export class KeyBindings {
  map: { [key: string]: CommandType } = {}

  constructor(
    public config: KeyBindingConfig
  ) {
    for (let commandType in config) {
      if (!(commandType in CommandType)) continue
      const parts = config[commandType as CommandType].split('+')
      const modifiers: { [key: string]: boolean } = {}
      let char = ''
      for (const part of parts) {
        switch (part) {
          case 'ctrl':
            modifiers['ctrl'] = true
            break
          case 'shift':
            modifiers['shift'] = true
            break
          case 'alt':
            modifiers['alt'] = true
            break
          case 'meta':
            modifiers['meta'] = true
            break
          default:
            char = part
        }
      }
      if (!char) continue
      let key = ''
      if (modifiers['alt']) key += 'alt+'
      if (modifiers['ctrl']) key += 'ctrl+'
      if (modifiers['meta']) key += 'meta+'
      if (modifiers['shift']) key += 'shift+'
      key += char
      this.map[key] = commandType as CommandType
    }
  }

  commandFromKeyboardEvent(e: KeyboardEvent): Command | undefined {
    let key = ''
    if (e.altKey) key += 'alt+'
    if (e.ctrlKey) key += 'ctrl+'
    if (e.metaKey) key += 'meta+'
    if (e.shiftKey) key += 'shift+'
    key += e.key
    if (key.length === 1) return new Command(CommandType.Insert, key)
    if (key in this.map) return new Command(this.map[key], undefined)
    return new Command(CommandType.Unknown, undefined)
  }
}

export class Editor {


  update(command: Command) {

  }
}



export class Cursor {
  constructor(
    public block: Block,
    public leaf: Text,
    public offset: number
  ) { }
}

export class Doc {
  children: Block[] = []
  cursor: Cursor

  constructor(nodes: Block[]) {
    this.children = nodes || []
    if (this.children.length < 1) {
      this.children.push(new Paragraph())
    }
    if (this.children[0].children.length < 1) {
      this.children[0].children.push(new Text(''))
    }
    this.cursor = new Cursor(
      this.children[0] as Block,
      this.children[0].children[0] as Text,
      0
    )
  }
}

export abstract class Node { }

export abstract class Block extends Node {
  children: InlineOrText[]
  constructor(children: InlineOrText[] = []) {
    super()
    this.children = children
  }
}

type InlineOrText = Inline | Text

export abstract class Inline extends Node {
  children: InlineOrText[] = []
}

export abstract class List extends Block {
  children: Item[] = []
}

export abstract class Item extends Node {
  children: InlineOrText[] = []
}

export class Text extends Node {
  constructor(
    public content: string
  ) {
    super()
  }
}

export class Paragraph extends Block {
  constructor(children?: InlineOrText[]) {
    super(children)
  }
}

// [Inline]
// Bold
// Italic
// Underline
// Strikethrough
// Superscript
// Subscript
// Code
// Link

// [List]
// OrderedList
// UnorderedList

// ListItem
// ListItem

// [Block]
// Header1
// Header2
// Header3
// Header4
// Header5
// Header6
// Paragraph
// Blockquote
// Codeblock
// HorizontalRule
