# Overview

- This document is intended to describe the requirements for the React Native practice.
- Design: [Figma](<https://www.figma.com/design/P2RYt2uLYGySkWTllqxAZP/Furniture-Shopping---Minimal-UI-Kit-(Community)?node-id=1-32&p=f&t=H9zGVqYEWZSXVxtj-0>)
- Plan: [Note](https://docs.google.com/document/d/1faGDzItMvgDjfbZuVnnXzBS93w8v9SZvNAj9Coejnzk/edit?tab=t.0)

# Target

- Get familiar with React Native
- Understand and apply React Navigation
- Storybook is required
- Unit test should coverage at least 80%
- You can choose one platform Android or iOS, depending on your machine

# Technical Stacks

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [Mockapi](https://mockapi.io/)

# Development Tools

- [Eslint](https://eslint.org/docs/latest/)
- [Prettier](https://prettier.io/docs/en/)
- [Lint-staged](https://github.com/okonet/lint-staged)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://commitlint.js.org/#/)
- [Storybook](https://storybook.js.org/)

# Timeline

- Estimate time: 6 days (from Jan 7, 2025 to Jan 14, 2025).

# Requirements

- Build a React Native mobile application about Furniture shopping with features:
  - User can see Boarding Screen
  - User can log in
  - User can view the list of product
    - User can scroll horizontally to choose category
  - User can view the product detail
    - User can choose colors and the corresponding image will be shown
    - User can add a product to cart
  - User can view the cart
  - User can update quantity/remove the product from cart
  - User can checkout(mocking) the product and view the success board.

# Getting Started

| Command                                                               | Action                                |
| --------------------------------------------------------------------- | ------------------------------------- |
| `git clone git@gitlab.asoft-python.com:huy.phamnhat/react-native.git` | Clone repository from GitLab          |
| `git checkout basic-practice`                                         | Checkout branch                       |
| `npm i`                                                               | Install dependencies                  |
| `npm run android`                                                     | Build and run app named BasicPractice |
| `npm run storybook-generate`                                          | Generate storybook                    |
| `npm run test`                                                        | Run all test cases                    |
| `npm run coverage`                                                    | Coverage all test cases               |

# Author

- Huy Pham Nhat.
- Email: huy.phamnhat@asnet.com.vn.
