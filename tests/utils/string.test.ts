import { toCamelCase, toKebabCase } from '../../src/utils/string';

describe('String Utils', () => {
  describe('toCamelCase', () => {
    it('应该将短横线命名转换为驼峰命名', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
      expect(toCamelCase('hello-world-test')).toBe('helloWorldTest');
    });

    it('应该将下划线命名转换为驼峰命名', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('hello_world_test')).toBe('helloWorldTest');
    });

    it('应该将空格分隔的字符串转换为驼峰命名', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
      expect(toCamelCase('hello world test')).toBe('helloWorldTest');
    });

    it('应该处理空字符串', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('应该处理已经是驼峰命名的字符串', () => {
      expect(toCamelCase('helloWorld')).toBe('helloWorld');
    });
  });

  describe('toKebabCase', () => {
    it('应该将驼峰命名转换为短横线命名', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
      expect(toKebabCase('helloWorldTest')).toBe('hello-world-test');
    });

    it('应该将下划线命名转换为短横线命名', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world');
      expect(toKebabCase('hello_world_test')).toBe('hello-world-test');
    });

    it('应该将空格分隔的字符串转换为短横线命名', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
      expect(toKebabCase('hello world test')).toBe('hello-world-test');
    });

    it('应该处理空字符串', () => {
      expect(toKebabCase('')).toBe('');
    });

    it('应该处理已经是短横线命名的字符串', () => {
      expect(toKebabCase('hello-world')).toBe('hello-world');
    });
  });
});
