# pharma-react

### Time spend

\\ approx 9h

### Features implemented

- Paginated table of provided api data {page size selection included} (ant design) / *** i found a potential bug on the pagination of antd, you can just choose the last page, is empty{delusionally you see the data of the page you was}, the previous one has the last element.
- Bar chart as described on the description of the task {there is a possibility of misunderstanding on words count, apologies if is not the correct data display, i worked on this within the weekend, therefore not possibility for questioning you } (Highcharts)

### Project architecture

- Monorepo
- Redux state management

### Potential improvements

- I haven't had time to improve some things with loved tools and also to do unit tests
  - GraphQL
  - Jest unit tests
  - Cypress e2e tests
  - Login page and authentication with Auth0

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
