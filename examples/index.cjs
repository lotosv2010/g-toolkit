// 引入打包好的 CommonJS 格式文件
const { unique, groupBy, toCamelCase, toKebabCase, deepClone, get } = require('../dist/index.js');

// 数组工具函数示例
const numbers = [1, 2, 2, 3, 3, 4, 5];
console.log('去重结果:', unique(numbers)); // [1, 2, 3, 4, 5]

const users = [
  { id: 1, name: 'Alice', group: 'A' },
  { id: 2, name: 'Bob', group: 'B' },
  { id: 3, name: 'Charlie', group: 'A' },
];
console.log('分组结果:', groupBy(users, 'group'));
// 输出: { A: [{ id: 1, name: 'Alice', group: 'A' }, { id: 3, name: 'Charlie', group: 'A' }], B: [{ id: 2, name: 'Bob', group: 'B' }] }

// 字符串工具函数示例
console.log('驼峰命名:', toCamelCase('hello-world')); // helloWorld
console.log('短横线命名:', toKebabCase('helloWorld')); // hello-world

// 对象工具函数示例
const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA',
  },
};

const cloned = deepClone(original);
console.log('深拷贝结果:', cloned);
// 输出: { name: 'John', age: 30, address: { city: 'New York', country: 'USA' } }

const nested = {
  user: {
    profile: {
      name: 'John',
    },
  },
};
console.log('获取嵌套属性:', get(nested, 'user.profile.name')); // John
