export default (text: string, withPlusSign: boolean = true): string => {
  text = encodeURIComponent(text)
  if (withPlusSign) return text.replace(/%20/g, '+')
  return text
}
