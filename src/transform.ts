import type { Attr, ChangeList } from './type'

const fontMap: any = {
  100: 'thin',
  200: 'extralight',
  300: 'light',
  400: 'normal',
  500: 'medium',
  600: 'semibold',
  700: 'bold',
  800: 'extrabold',
  900: 'black',
}

const customMap: any = {
  'b': 'border',
  'bb': 'border-b',
  'border-rd': 'rounded',
  'lh': 'leading',
}

const textMap: any = {
  12: 'xs',
  14: 'sm',
  16: 'base',
  18: 'lg',
  20: 'xl',
  24: '2xl',
  30: '3xl',
  36: '4xl',
  48: '5xl',
  60: '6xl',
  72: '7xl',
  96: '8xl',
  128: '9xl',
}
let classData: string[] = []
const COMMON_REG = /(-|!|\s?|hover:|focus:|active:|disabled:|invalid:|checked:|required:|first:|last:|odd:|even:|after:|before:|placeholder:|file:|marker:|selection:|first-line:|first-letter:|backdrop:|md:|sm:|xl:|2xl:|lg:|dark:|ltr:|rtl:|group-hover:|group-focus:|group-active:)(spacex|spacey|w|h|gap|m|mx|my|mt|mr|mb|ml|p|px|py|pt|pr|pb|pl|bt|brd|br|bb|bl|b|lh|leading|text|top|right|bottom|left|space-x|space-y|border-rd|border|max-w|min-w|max-h|min-h|translate-x|translate-y|duration|delay|scale-x|scale-y|scale|rotate|skew-x|skew-y|fill|stroke|invert|saturate|grayscale|contrast|brightness|blur|outline)-?(-?[0-9]+)(rpx|!|px|rem|em|\%|vw|vh||$)/g

export const rules: any = [
  [/([\s!]?)([wh])full(\s|'|$)/g, (_: string, v0: string, v1: string, v2: string) => `${v0}${v1}-full${v2}`],
  [/([\s!])flex1(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}flex-1${v2}`],
  [/([\s!])flex-col(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}flex-col${v2}`],
  [/([\s!])flex-row(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}flex-row${v2}`],
  [/([\s!])flex-between(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}justify-between${v2}`],
  [/([\s!])flex-evenly(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}justify-evenly${v2}`],
  [/([\s!])flex-around(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}justify-around${v2}`],
  [/([\s!])ma(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}m-auto${v2}`],
  [/([\s!])mxa(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}mx-auto${v2}`],
  [/([\s!])mya(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}my-auto${v2}`],
  [/([\s!-])maxh([^\s']+)/, (_: string, v1: string, v2: string) => `${v1}max-h${v2}`],
  [/([\s!-])minh([^\s']+)/, (_: string, v1: string, v2: string) => `${v1}min-h${v2}`],
  [/([\s!-])maxw([^\s']+)/, (_: string, v1: string, v2: string) => `${v1}max-w${v2}`],
  [/([\s!-])minw([^\s']+)/, (_: string, v1: string, v2: string) => `${v1}min-w${v2}`],
  [/([\s!-])translatex([^\s']+)/, (_: string, v1 = '', v2: string) => `${v1}translate-x${v2}`],
  [/([\s!-])translatey([^\s']+)/, (_: string, v1: string, v2: string) => `${v1}translate-y${v2}`],
  [/([\s!-])gapx([^\s']+)/, (_: string, v1: string, v2: string) => v2.startsWith('-')
    ? `${v1}gap-x${v2}`
    : `${v1}gap-x-${v2}`],
  [/([\s!-])gapy([^\s']+)/, (_: string, v1: string, v2: string) => v2.startsWith('-')
    ? `${v1}gap-x${v2}`
    : `${v1}gap-y-${v2}`],
  [COMMON_REG, (_: string, prefix: string, v: string, v1 = '', v2 = '', v3 = '') => {
    let negative = ''
    if (v1.startsWith('-')) {
      negative = '-'
      v1 = v1.slice(1)
    }
    if (v in customMap)
      v = customMap[v]
    if (v2 === '!') {
      v3 = v2
      v2 = ''
    }
    else { v3 = '' }
    if ((v === 'border-b' || v === 'border') && v1 === '1')
      return `${prefix}${v3}${negative}${v}`

    if (v === 'text') {
      if (v2 === 'rpx')
        return `${prefix}${v3}${negative}${v}-[length:${v1}${v2}]`

      if (v2)
        return `${prefix}${v3}${negative}${v}-[${v1}${v2}]`

      if (v1 in textMap)
        return `${prefix}${v3}${negative}${v}-${textMap[v1]}`
      return `${prefix}${v3}${negative}${v}-${v1}`
    }

    return v2.trim() === ''
      ? `${prefix}${v3}${negative}${v}-${v1}${v2}`
      : `${prefix}${v3}${negative}${v}-[${v1}${v2}]`
  }],
  [/([\s!])aspect-?([0-9\/]+)(\s|'|$)/, (_: string, v1 = '', v2: string) => aspectMap[v2] ? `${v1}aspect-${aspectMap[v2]}` : `${v1}aspect-[${v2}]`],
  [/([\s!])border-box(\s|'|$)/, (_: string, v1 = '', v2: string) => `${v1}box-border${v2}`],
  [/([\s!])content-box(\s|'|$)/, (_: string, v1 = '', v2: string) => `${v1}box-content${v2}`],
  [/-?\[?\s*(rgba?\([^\)]*\))\]?(\s|'|$)/g, (_: string, v: string, v1: string) => `-[${v.replace(/\s*\/\s*/g, ',').replace(/\s+/g, ',').replace(/,+/g, ',')}]${v1}`],
  [/-?\[?\s*(hsl\([^\)]*\))\]?(\s|'|$)/g, (_: string, v: string, v1: string) => `-[${v.replace(/\s*\/\s*/g, ',').replace(/\s+/g, ',').replace(/,+/g, ',')}]${v1}`],
  [/-?\[?\s*(calc\([^\)]*\))]?(\s|'|$)/g, (_: string, v: string, v1 = '') => `-[${v.replace(/\s*/g, '')}]${v1}`],
  [/-(\#[^\s'\']+)(\s|'|$)/g, (_: string, v1: string, v2: string) => `-[${v1}]${v2}`],
  [/([\s!])(decoration|divide|ring|accent|stroke|fill|bb|bt|bl|br|bg|text|border)-?\[?(\#?[^\s''\]]+)\]?(\s|'|$)/g, (_: string, v: string, v1: string, v2: string, v3: string) => {
    if (v1 in customMap) {
      v1 = customMap[v1]
      if (!classData.some(c => /border-/.test(c)))
        v3 = ` border-transparent${v3}`
    }

    if (v1 === 'border' && (isHex(v2) || isRgb(v2))) {
      const hasBorder = !!classData.find(item => /(border$)|(border-[0-9]|(border-[bltr]($)|(-[0-9])))/.test(item))
      const hasBorderStyle = !!classData.find(item => ['border-solid', 'border-dashed', 'border-dotted', 'border-double'].includes(item))
      return `${v}${v1}-[${v2}]${hasBorder ? '' : ' border'}${hasBorderStyle ? '' : ' border-solid'}${v3}`
    }
    if (isHex(v2) || isRgb(v2) || isCalc(v2))
      return `${v}${v1}-[${v2}]${v3}`
    return _
  }],
  [/-?([0-9]+(?:px)|(?:vw)|(?:vh)|(?:rem)|(?:em)|(?:%))(\s|'|$)/g, (_: string, v1: string, v2 = '') => `-[${v1}]${v2}`],
  [/([\s!])x-hidden(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}overflow-x-hidden${v2}`],
  [/([\s!])y-hidden(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}overflow-y-hidden${v2}`],
  [/([\s!])justify-center(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}justify-center${v2}`],
  [/([\s!])align-center(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}items-center${v2}`],
  [/([\s!])items-center(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}items-center${v2}`],
  [/([\s!])justify-between(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}justify-between${v2}`],
  [/([\s!])justify-evenly(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}justify-evenly${v2}`],
  [/([\s!])justify-around(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}justify-around${v2}`],
  [/([\s!])eclipse(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}whitespace-nowrap overflow-hidden text-ellipsis${v2}`],
  [/([\s!])font-?(100|200|300|400|500|600|700|800|900)(\s|'|$)/, (_: string, prefix: string, v1: string, v2: string) => `${prefix}font-${fontMap[v1]}${v2}`],
  [/([\s!])pointer-none(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}pointer-events-none${v2}`],
  [/([\s!])pointer(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}cursor-pointer${v2}`],
  [/([\s!])flex-center(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}justify-center items-center${v2}`],
  [/([\s!])col(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}${classData.includes('flex') ? '' : 'flex '}flex-col${v2}`],
  [/([\s!])position-center(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}left-0 right-0 top-0 bottom-0${v2}`],
  [/([\s!])dashed(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}border-dashed${v2}`],
  [/([\s!])dotted(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}border-dotted${v2}`],
  [/([\s!])double(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}border-double${v2}`],
  [/([\s!])contain(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}bg-contain${v2}`],
  [/([\s!])cover(\s|'|$)/, (_: string, v1: string, v2: string) => `${v1}bg-cover${v2}`],
  [/([\s!])line([0-9]+)(\s|'|$)/, (_: string, v1: string, v2: string, v3: string) => `${v1}line-clamp-${v2}${v3}`],
]

export function transform(content: string) {
  return rules.reduce((result: string, cur: [string | RegExp, string]) => {
    const [reg, callback] = cur
    return result.replace(/class(Name)?="([^"]*)"/g, (_: string, name = '', value: string) => {
      let v = ` ${value}`
      // 替换掉rgba内容排除掉
      let count = 0
      let temp = `__unot_split__${count}`
      const map: any = {}
      v = v.replace(/rgba?\([^)]+\)/g, (v) => {
        temp = `__unot_split__${count++}`
        map[temp] = v
        return temp
      })

      const matcher = v.match(/([\s'])(\w+)-\[(([\(\),\w0-9%\s\*\/\+\-\:]+,[\(\),\w0-9%\s\*\/\+\-\:]+)+)\](\s|'|$)/)
      if (matcher && matcher[3].includes(',')) {
        try {
          v = `${matcher[1]}${matcher[3].split(',').map((item) => {
            if (item.includes('rgb') && !/rgba?\([^)]+\)/.test(item))
              throw new Error('match error')
            if (item.includes('calc') && !/calc\([^)]+\)/.test(item))
              throw new Error('match error')

            if (item.includes(':')) {
              const items = item.split(':')
              return `${items.slice(0, -1).join(':')}:${matcher[2]}-${items.slice(-1)[0]}`
            }
            return `${matcher[2]}-${item}`
          }).join(' ')}`
        }
        catch (error) {
          return _
        }
      }
      Object.keys(map).forEach((key) => {
        v = v.replace(key, map[key])
      })
      classData = value.split(' ').map(item => item.replace(/['\[\]]/g, ''))
      const newClass = v.replace(reg, callback).slice(1)
      return `class${name}="${newClass}"`
    },
    )
  }, content)
}

export function transformClass(attr: string) {
  return rules.reduce((result: string, cur: [string | RegExp, string]) => {
    const [reg, callback] = cur
    let v = ` ${result}`
    // 替换掉rgba内容排除掉
    let count = 0
    let temp = `__unocss_magic_split__${count}`
    const map: any = {}
    v = v.replace(/rgba?\([^)]+\)/g, (v) => {
      temp = `__unocss_magic_split__${count++}`
      map[temp] = v
      return temp
    })

    const matcher = v.match(/([\s'])(\w+)-\[(([\(\),\w0-9%\s\*\/\+\-\:]+,[\(\),\w0-9%\s\*\/\+\-\:]+)+)\](\s|'|$)/)
    if (matcher && matcher[3].includes(',')) {
      try {
        v = `${matcher[1]}${matcher[3].split(',').map((item) => {
          if (item.includes('rgb') && !/rgba?\([^)]+\)/.test(item))
            throw new Error('match error')
          if (item.includes('calc') && !/calc\([^)]+\)/.test(item))
            throw new Error('match error')

          if (item.includes(':')) {
            const items = item.split(':')
            return `${items.slice(0, -1).join(':')}:${matcher[2]}-${items.slice(-1)[0]}`
          }
          return `${matcher[2]}-${item}`
        }).join(' ')}`
      }
      catch (error) {
        return result
      }
    }
    Object.keys(map).forEach((key) => {
      v = v.replace(key, map[key])
    })
    classData = result.split(' ')
    const newClass = v.replace(reg, callback).slice(1)

    return newClass
  }, attr)
}

export function transformClassAttr(attrs: Attr[]) {
  const changeList: ChangeList[] = []
  attrs.forEach((attr) => {
    const { content, start, end } = attr
    const newAttr = transformClass(content)
    if (content !== newAttr) {
      changeList.push({
        content: newAttr,
        start,
        end,
      })
    }
  })
  return changeList
}
