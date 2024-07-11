# JSDoc - do you really need TypeScript?

## Introduction

TypeScript is a superset of JavaScript developed by Microsoft. Its primary goal is to add static typing to JavaScript. This enables TypeScript to detect errors during code writing before it is executed. TypeScript is compiled to JavaScript, which means that code written in TypeScript can be run in any web browser, but it must first be processed into JavaScript. TypeScript is an open-source language, which means that anyone can contribute to its development. Besides adding static typing, TypeScript also introduces new features that are not available in JavaScript.

### Is TypeScript Necessary?

From my perspective - as someone primarily working on applications - it significantly eases and streamlines the workflow. Of course, it requires some investment in terms of additional learning and ensuring full object typing. When used correctly, it is a substantial aid in working across multiple files and teams. Advanced elements of this language allow for reducing repetition (creating a parent type and then creating subtypes using Pick) and increasing code readability (creating generic types). However, many in the community believe that TypeScript is unnecessary and complicates the code. The additional compilation step (and therefore a more complex CI/CD process), the difficulty in creating libraries (an additional tool is required to generate type definitions), and the necessity of learning a new language are the main arguments against TypeScript. Some consider it such a significant issue that they are willing to switch back to plain JavaScript (example from a year ago [Svelte](https://github.com/sveltejs/svelte/pull/8569)).

### JSDoc

JSDoc is a markup language designed for annotating JavaScript. By using a special syntax, we can add comments to our code, which are used by various tools to generate documentation. Modern IDEs, such as (VSCode), can utilize this syntax without any additional plugins or extensions to suggest variable, function, and method types. This allows us to achieve similar effects as in TypeScript. However, JSDoc is not as extensive as TypeScript; it does not allow the creation of generic types or parent and child types. Nevertheless, it is a good compromise for those who do not want to use TypeScript.

Personally, I had not used JSDoc before writing this article, but I approached this tool with an open mind.

### Examples

To add some complexity, I will be writing examples using React, which sometimes requires more complicated types.

#### Simple Variables

To type a simple variable, we use the `@type {type}` syntax. Example:

```javascript
/**
 * @type {number}
 */
const a = 1;
```

but often, looking at various examples, you can write it in a shortened version:

```javascript
const a = /** @type {number} */ (1);
```

Of course, using TypeScript, we can write it in a simpler way:

```typescript
const a: number = 1;
```

#### Type Declaration

Let's create a User type that will have several fields, including a nested one:

```javascript
/**
 * @typedef {Object} User
 * @property {string} name - name of user
 * @property {number} age - age of user
 * @property {Object} address - address of user
 * @property {string} address.city - city of user
 * @property {string} address.street - street of user
 */

const test = /** @type {User} */ ({
  name: "John",
  age: 30,
  address: {
    city: "New York",
    street: "Broadway",
  },
});
```

In TypeScript:

```typescript
type User = {
  name: string;
  age: number;
  address: {
    city: string;
    street: string;
  };
};

const test: User = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    street: "Broadway",
  },
};
```

We see that the syntax in this case is quite similar, but in TypeScript it is more readable.
Of course, using JSDoc and TypeScript, we can export/import types.
In TypeScript by adding `export` before `type` and then `import` in another file.
In JSDoc it is similar, but we do not add `export`, and `import` looks a bit different:

```javascript
/**
 * @import { User } from './User'
 */
```

#### Typing Hooks

As I mentioned, I tested JSDoc in React, so I wanted to check how it works with the simplest hook - `useState`.

In TypeScript, you just need to declare the variable type (we will use our User type from the example above):

```typescript
const [users, setUser] = useState<User[]>([]);
```

In JSDoc:

```javascript
/**
 * @type {User[]}
 */
const [users, setUsers] = useState([]); <---- this notation is incorrect

const [users, setUsers] = useState(/** @type {User[]} */([])); <---- this notation is correct
```

Why is the first notation incorrect? Because JSDoc set the type of `setUsers` to `User[]` as well, instead of `Dispatch<SetStateAction<User[]>>`. Therefore, we must use the second notation.

#### Typing a Functional Component

In React, we can use functional components. In TypeScript, we can declare the types of props as follows:

```typescript
interface UserProps {
  name: string;
  age: number;
};

const User = ({ name, age }: UserProps) => {...};
```

In JSDoc:

```javascript
/**
 * Component for user
 *
 * @typedef {Object} UserProps
 * @property {string} name
 * @property {number} age
 * @returns {JSX.Element}
 */
const User = ({ name, age }) => {...};
```

### Summary

JSDoc can be an alternative for typing, but it requires more boilerplate code. Of course, typing in the form of JSDoc is only half of what it offers - each `@typedef` or `@property` can be described with additional information, and then documentation can be generated from it. This way, we can simultaneously create documentation and check if our code is correctly typed. However, TypeScript is more extensive and allows for more advanced typing. While researching opinions and information on the differences between these two tools, I found many opinions that TypeScript is much better for use in applications, but JSDoc is better for creating libraries.

In essence, merely annotating with JSDoc gives us only information about types, but in the basic VSCode configuration, it does not suggest code errors. Some time ago, TypeScript added the ability to check js files and use JSDoc annotations in its configuration. This allows us to use both tools simultaneously [link](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).
