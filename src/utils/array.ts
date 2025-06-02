/**
 * 数组去重
 * @param arr 要去重的数组
 * @param key 对象数组的键名，如果提供则根据该键去重
 * @returns 去重后的数组
 * @throws {TypeError} 当输入不是数组时抛出错误
 */
export const unique = <T>(arr: T[], key?: keyof T): T[] =>{
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }

  if (key) {
    const seen = new Set<T[keyof T]>();
    return arr.filter(item => {
      if (item === null || item === undefined) {
        return false;
      }
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }

  return [...new Set(arr)];
}

/**
 * 数组分组
 * @param arr 要分组的数组
 * @param key 分组的键名
 * @returns 分组后的对象
 * @throws {TypeError} 当输入不是数组时抛出错误
 */
export function groupBy<T extends Record<string, unknown>>(
  arr: T[],
  key: string
): Record<string, T[]> {
  if (!Array.isArray(arr)) {
    throw new TypeError('Expected an array');
  }

  if (!key || typeof key !== 'string') {
    throw new TypeError('Expected a string key');
  }

  return arr.reduce(
    (result, item) => {
      if (item === null || item === undefined) {
        return result;
      }
      const groupKey = String(item[key] ?? '');
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
}
