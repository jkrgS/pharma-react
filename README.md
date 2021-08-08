# pharma-react

![](ui/src/assets/kabamaru.gif)

### Features implemented

- Paginated table of provided api data {page size selection included} (ant design) / *** i found a potential bug on the pagination of antd, you can just choose the last page, is empty{delusionally you see the data of the page you was}, the previous one has the last element.
- Bar chart (Highcharts)
- On another branch(feature/login), started the implementation of Auth, with JWT, and the basic handling will be from server-side(is in an separate repo, that for now is private, because will be used in the college that i lecture, if someone needs access please let me know to set you a as a collab), at the end server-side app will be added in this monorepo

### Project architecture

- Monorepo
- Redux state management

### Potential improvements

  - GraphQL
  - Jest unit tests
  - Cypress e2e tests

## Instructions

### Install deps

```javascript
// from root
sudo yarn install
```

### Run the app

```javascript
// from root
yarn ui-start
```
