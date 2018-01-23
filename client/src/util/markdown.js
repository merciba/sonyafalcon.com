import { Converter } from 'showdown'
const markdown = new Converter()

export const markdownToHtml = (md) => markdown.makeHtml(md)

export const splitIntoParagraphs = (str) => str.split(/[\r\n\t]+/gm)
