# Changelog

## 3.0.0

- Migration from ES5 to ES6;
- Remove `.create` method from HashService. HashService is a function now that you can call with `HashService('bcrypt')`;

## 2.0.1

- Improve branch coverage for `BCryptHash` class;

## 2.0.0

- Replace `getConfig()` and `setConfig()` with `get()` and `set()`;
- Fix overriding pre-defined config in `hash` and `hashSync` methods;
- Optimize `create` in HashService method;

## 1.1.0

- Implement overriding config on hash/compare methods for bcrypt;

## 1.0.1

- Update docs;
- Change name of export for bcrypt class;

## 1.0.0

- Add full support of bcrypt hash\compare;

## 0.1.0

- Initial release;
