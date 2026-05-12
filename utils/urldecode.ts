export default (text: string, withPlusSign: boolean = true): string => {
  if (withPlusSign) text = text.replace(/\+/g, '%20')
  return decodeURIComponent(text)
}
