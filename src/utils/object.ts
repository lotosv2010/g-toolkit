/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 拷贝后的新对象
 * @throws {TypeError} 当输入是循环引用对象时可能抛出错误
 */
export function deepClone<T>(obj: T): T {
  const seen = new WeakMap();

  function clone(value: unknown): unknown {
    if (value === null || typeof value !== 'object') {
      return value;
    }

    if (value instanceof Date) {
      return new Date(value.getTime());
    }

    if (value instanceof Array) {
      return value.map(item => clone(item));
    }

    if (value instanceof Object) {
      if (seen.has(value)) {
        throw new TypeError('Circular reference detected');
      }
      seen.set(value, true);

      const copy = {} as Record<string, unknown>;
      Object.keys(value).forEach(key => {
        copy[key] = clone((value as Record<string, unknown>)[key]);
      });
      return copy;
    }

    return value;
  }

  return clone(obj) as T;
}

/**
 * 获取对象的嵌套属性值
 * @param obj 要获取属性的对象
 * @param path 属性路径，使用点号分隔
 * @param defaultValue 默认值，当属性不存在时返回
 * @returns 属性值或默认值
 * @throws {TypeError} 当路径不是字符串时抛出错误
 */
export function get(obj: Record<string, unknown>, path: string, defaultValue?: unknown): unknown {
  if (typeof path !== 'string') {
    throw new TypeError('Expected a string path');
  }

  if (obj === null || obj === undefined) {
    return defaultValue;
  }

  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue;
    }
    result = (result as Record<string, unknown>)[key];
  }

  return result === undefined ? defaultValue : result;
}
