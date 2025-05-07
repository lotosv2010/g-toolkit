/**
 * 将字符串转换为驼峰命名
 * @param str 需要转换的字符串
 * @returns 驼峰命名的字符串
 */
export function toCamelCase(str: string): string {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * 将字符串转换为短横线命名
 * @param str 需要转换的字符串
 * @returns 短横线命名的字符串
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
