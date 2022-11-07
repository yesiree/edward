

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

function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
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
  editorElement.textContent = cfg.value
}
