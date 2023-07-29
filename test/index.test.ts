import { describe, expect, it } from 'vitest'
import { transform } from '../src/transform'

describe('should', () => {
  it('exported', () => {
    expect(transform('class="bg-[rgba(0,0,0)] text-[#fff]"')).toMatchInlineSnapshot('"class=\\"bg-[rgba(0,0,0)] text-[#fff]\\""')
  })
  it('exported', () => {
    expect(transform('class="translate-x-[-1px]"')).toMatchInlineSnapshot('"class=\\"translate-x-[-1px]\\""')
  })
  it('exported', () => {
    expect(transform(`class=" 
    xxmax-w
    max-w-1
     xx-col flex-col-x"`)).toMatchInlineSnapshot(`
       "class=\\" 
           xxmax-w
           max-w-1
            xx-col flex-col-x\\""
     `)
  })
  it('exported', () => {
    expect(transform('class="bg-hsl(150 , 30% , 60% , 0.8)"')).toMatchInlineSnapshot('"class=\\"bg-[hsl(150,30%,60%,0.8)]\\""')
  })
  it('exported', () => {
    expect(transform('class="bg-rgba(150 30% 60% / 0.8)"')).toMatchInlineSnapshot('"class=\\"bg-[rgba(150,30%,60%,0.8)]\\""')
  })

  it('exported', () => {
    expect(transform('class=" w-[calc(100%-20px)] "')).toMatchInlineSnapshot('"class=\\" w-[calc(100%-20px)] \\""')
  })
  it('exported', () => {
    expect(
      transform('class="text-[rgba(1,1,1,1),hover:pink,2xl,lg:hover:3xl]"')).toMatchInlineSnapshot('"class=\\"text-[rgba(1,1,1,1)] hover:text-pink text-2xl lg:hover:text-3xl\\""')
  })
})
