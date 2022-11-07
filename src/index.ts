export interface Style {
  [key: string]: string | number
}

type Stylables = 'workspace'
  | 'blcok'
  | 'heading' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'paragraph'
  | 'blockquote'
  | 'list' | 'orderedlist' | 'unorderedlist' | 'listitem'
  | 'code' | 'codeblock' | 'inlinecode'
  | 'inline'
  | 'link' | 'image' | 'video' | 'audio'
  | 'bold' | 'italic' | 'underline' | 'strikethrough'


export interface Theme {
  name: string
  styles: {
    [key in Stylables]?: Style
  }
}

const camelToDash = (key: string) => {
  let s = [...key]
  for (let i = 0, l = s.length; i < l; i++) {
    const c = s[i]
    const l = c.toLowerCase()
    const u = c.toUpperCase()
    if (c === c && c !== l) {
      s[i] = '-' + l
    }
  }
  return s.join('')
}

const getThemeIdentifier = (theme: Theme): string => `${theme.name}-theme`

const attachTheme = (theme: Theme): void => {
  const themeId = getThemeIdentifier(theme)
  if (document.getElementById(themeId)) return
  const style = document.createElement('style')
  style.id = themeId
  let css = ''
  for (const key in theme.styles) {
    const style = theme.styles[key as Stylables]
    css += `${theme.name}-theme .${key} {`
    for (const prop in style) {
      css += `${camelToDash(prop)}: ${style[prop]};`
    }
    css += '}'
  }
  style.innerHTML = css
  document.head.appendChild(style)
}

const defaultTheme: Theme = {
  name: 'default',
  styles: {
    workspace: {
      outline: 'none',
      background: '#123',
      color: '#aaa',
      padding: '1em',
    }
  }
}

export interface EditorOptions {
  selector: string
  value?: string
  theme?: Theme
}

interface EditorConfig {
  selector: string
  value: string
  theme: Theme
}

export const create = (opts: EditorOptions | string): void => {
  const cfg = {
    value: '',
    theme: defaultTheme,
    ...(typeof opts === 'string' ? { selector: opts } : opts)
  } as EditorConfig
  const editorElement = document.querySelector(cfg.selector)
  if (!editorElement) throw new Error(`No element found for selector: ${cfg.selector}`)
  attachTheme(cfg.theme)

  editorElement.classList.add(
    cfg.theme.name,
    'workspace'
  )

  editorElement.setAttribute('contenteditable', 'true')
  editorElement.innerHTML = cfg.value

  editorElement.addEventListener('beforeinput', e => {
    e.preventDefault()
    console.dir(e)
  })

    ; (editorElement as HTMLElement).focus()

  const selection = document.getSelection()
  if (selection) {
    selection.selectAllChildren(editorElement)
    selection.collapseToEnd()
  }
}

const insertInline = (newInlineType) => {

}

const wrapSelectionWithInline = (newInlineType) => {

}

const getSelectedBlocks = () => {

}

const switchBlocks = (blocks, newBlockType) => {

}



const mergeBlocksAndReplaceSelection = (newText?) => {

}

const splitBlocksAtSelection = () => {

}

const deleteSelection = (direction) => {

}

/*

  set block — find first block ancesotry and set it to new block element
  set block with selection — set first block ancestor or create new and break existing into two
  set block with multi-line selection — ???

  set inline — create new inline element, set cursor inside
  set inline with selection — wrap selection in new inline element
  set inline with multi-line selection — ???

  insert text — insert text into active node
  insert text with selection — delete selection, insert text, how to deal with spanning inline elements ???
  insert text with multi-line selection — delete selection, insert text, how to deal with spanning inline and block elements elements ???

  insert new line — split block's content, move remaining text into block (same type), close any open inline blocks
  insert new line with selection — remove selection, split block's content, move remaining text into block (same type), close any open inline blocks
  insert new line with multi-line selection — remove selection, split block's content, move remaining text into block (same type), close any open inline blocks

  delete text
  delete text with selection
  delete text with multi-line selection

  delete at beginning of inline
  delete at beginning of block
  delete at end of inline
  delete at end of block



*/

const getPedigree = (node: HTMLElement | ParentNode | null) => {
  const pedigree = [node]
  for (; node; node = node.parentNode) {
    pedigree.unshift(node)
  }
  return pedigree
}

const commonAncestor = (node1: HTMLElement, node2: HTMLElement) => {
  var pedigree1 = getPedigree(node1)
  var pedigree2 = getPedigree(node2)
  if (pedigree1[0] != pedigree2[0]) throw "No common ancestor!"
  for (let i = 0; i < pedigree1.length; i++) {
    if (pedigree1[i] != pedigree2[i]) return pedigree1[i - 1]
  }
}



const actionMap = {
  insertText: false,
  insertLineBreak: false,
  insertParagraph: false,
  insertOrderedList: false,
  insertUnorderedList: false,
  insertHorizontalRule: false,
  insertFromPaste: false,
  insertLink: false,

  deleteWordBackward: false,
  deleteWordForward: false,
  deleteSoftLineBackward: false,
  deleteSoftLineForward: false,
  deleteEntireSoftLine: false,
  deleteHardLineBackward: false,
  deleteHardLineForward: false,
  deleteByCut: false,
  deleteContent: false,
  deleteContentBackward: false,
  deleteContentForward: false,

  historyUndo: false,
  historyRedo: false,

  formatBold: false,
  formatItalic: false,
  formatUnderline: false,
  formatStrikethrough: false,
  formatSuperscript: false,
  formatSubscript: false,

  formatJustifyFull: false,
  formatJustifyCenter: false,
  formatJustifyRight: false,
  formatJustifyLeft: false,

  formatIndent: false,
  formatOutdent: false,
  formatRemove: false,

  formatBackColor: false,
  formatFontColor: false,
  formatFontName: false,


}
