import { deepClone, get } from '../../src/utils/object';

describe('Object Utils', () => {
  describe('deepClone', () => {
    it('应该正确克隆基本类型', () => {
      expect(deepClone(42)).toBe(42);
      expect(deepClone('hello')).toBe('hello');
      expect(deepClone(true)).toBe(true);
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
    });

    it('应该正确克隆数组', () => {
      const arr = [1, [2, 3], { a: 4 }];
      const cloned = deepClone(arr);
      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[1]).not.toBe(arr[1]);
      expect(cloned[2]).not.toBe(arr[2]);
    });

    it('应该正确克隆对象', () => {
      const obj = {
        a: 1,
        b: [2, 3],
        c: { d: 4 },
      };
      const cloned = deepClone(obj);
      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
      expect(cloned.c).not.toBe(obj.c);
    });

    it('应该正确克隆日期对象', () => {
      const date = new Date();
      const cloned = deepClone(date);
      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
      expect(cloned instanceof Date).toBe(true);
    });

    it('应该处理循环引用', () => {
      const obj: Record<string, unknown> = { a: 1 };
      obj.self = obj;
      expect(() => deepClone(obj)).toThrow(TypeError);
    });
  });

  describe('get', () => {
    it('应该获取嵌套属性值', () => {
      const obj = {
        a: {
          b: {
            c: 42,
          },
        },
      };
      expect(get(obj, 'a.b.c')).toBe(42);
    });

    it('应该返回默认值当属性不存在时', () => {
      const obj = { a: 1 };
      expect(get(obj, 'b', 'default')).toBe('default');
      expect(get(obj, 'a.b', 'default')).toBe('default');
    });

    it('应该处理空对象', () => {
      expect(get({}, 'a.b.c', 'default')).toBe('default');
    });

    it('应该处理 null 和 undefined 对象', () => {
      expect(get(null as unknown as Record<string, unknown>, 'a.b.c', 'default')).toBe('default');
      expect(get(undefined as unknown as Record<string, unknown>, 'a.b.c', 'default')).toBe(
        'default'
      );
    });

    it('当路径不是字符串时应该抛出错误', () => {
      const obj = { a: 1 };
      expect(() => get(obj, null as unknown as string)).toThrow(TypeError);
      expect(() => get(obj, undefined as unknown as string)).toThrow(TypeError);
      expect(() => get(obj, 123 as unknown as string)).toThrow(TypeError);
    });
  });
});
