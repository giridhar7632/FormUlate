import crypto from 'crypto'

export function generateSlug(s: string, name: string): string {
  const hash = crypto
    .createHash('md5')
    .update(s + Date.now())
    .digest('hex')
  return hash.substring(0, 5) + '-' + name.toLowerCase().split(' ').join('-')
}
