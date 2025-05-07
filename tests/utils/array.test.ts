import { unique, groupBy } from '../../src/utils/array';

describe('Array Utils', () => {
  describe('unique', () => {
    it('应该移除基本类型数组中的重复项', () => {
      const numbers = [1, 2, 2, 3, 3, 4, 5];
      expect(unique(numbers)).toEqual([1, 2, 3, 4, 5]);

      const strings = ['a', 'b', 'a', 'c', 'b'];
      expect(unique(strings)).toEqual(['a', 'b', 'c']);
    });

    it('应该根据指定键移除对象数组中的重复项', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice' },
      ];
      expect(unique(users, 'id')).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);
    });

    it('应该处理空数组', () => {
      expect(unique([])).toEqual([]);
    });

    it('应该处理没有重复项的数组', () => {
      const numbers = [1, 2, 3, 4, 5];
      expect(unique(numbers)).toEqual([1, 2, 3, 4, 5]);

      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      expect(unique(users, 'id')).toEqual(users);
    });

    it('应该处理包含 null 和 undefined 的数组', () => {
      const arr = [1, null, 2, undefined, 3, null];
      expect(unique(arr)).toEqual([1, null, 2, undefined, 3]);

      const objects = [
        { id: 1, value: null },
        { id: 2, value: undefined },
        { id: 3, value: null },
      ];
      expect(unique(objects, 'value')).toEqual([
        { id: 1, value: null },
        { id: 2, value: undefined },
      ]);
    });

    it('当输入不是数组时应该抛出错误', () => {
      expect(() => unique(null as unknown as number[])).toThrow(TypeError);
      expect(() => unique(undefined as unknown as number[])).toThrow(TypeError);
      expect(() => unique('not an array' as unknown as number[])).toThrow(TypeError);
    });
  });

  describe('groupBy', () => {
    it('应该根据指定键对数组进行分组', () => {
      const users = [
        { id: 1, name: 'Alice', group: 'A' },
        { id: 2, name: 'Bob', group: 'B' },
        { id: 3, name: 'Charlie', group: 'A' },
      ];
      expect(groupBy(users, 'group')).toEqual({
        A: [
          { id: 1, name: 'Alice', group: 'A' },
          { id: 3, name: 'Charlie', group: 'A' },
        ],
        B: [{ id: 2, name: 'Bob', group: 'B' }],
      });
    });

    it('应该处理空数组', () => {
      expect(groupBy([], 'group')).toEqual({});
    });

    it('应该处理只有一个元素的数组', () => {
      const users = [{ id: 1, name: 'Alice', group: 'A' }];
      expect(groupBy(users, 'group')).toEqual({
        A: [{ id: 1, name: 'Alice', group: 'A' }],
      });
    });

    it('应该处理包含 null 和 undefined 的数组', () => {
      const users = [
        { id: 1, name: 'Alice', group: 'A' },
        { id: 2, name: 'Bob', group: 'B' },
      ];
      const mixedUsers = [...users, null, undefined] as Array<
        Record<string, unknown> | null | undefined
      >;
      const filteredUsers = mixedUsers.filter(
        (item): item is Record<string, unknown> => item !== null && item !== undefined
      );
      expect(groupBy(filteredUsers, 'group')).toEqual({
        A: [{ id: 1, name: 'Alice', group: 'A' }],
        B: [{ id: 2, name: 'Bob', group: 'B' }],
      });
    });

    it('当输入不是数组时应该抛出错误', () => {
      expect(() => groupBy(null as unknown as Array<Record<string, unknown>>, 'group')).toThrow(
        TypeError
      );
      expect(() =>
        groupBy(undefined as unknown as Array<Record<string, unknown>>, 'group')
      ).toThrow(TypeError);
      expect(() =>
        groupBy('not an array' as unknown as Array<Record<string, unknown>>, 'group')
      ).toThrow(TypeError);
    });

    it('当键不是字符串时应该抛出错误', () => {
      const users = [{ id: 1, name: 'Alice', group: 'A' }];
      expect(() => groupBy(users, null as unknown as string)).toThrow(TypeError);
      expect(() => groupBy(users, undefined as unknown as string)).toThrow(TypeError);
      expect(() => groupBy(users, 123 as unknown as string)).toThrow(TypeError);
    });
  });
});
