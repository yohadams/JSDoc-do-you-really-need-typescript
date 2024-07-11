# JSDoc - do you really need TypeScript?

## Introduction

TypeScript to nadzbiór JavaScriptu stworzony przez firmę Microsoft. Jego głównym celem jest dodanie statycznego typowania do JavaScriptu. Dzięki temu TypeScript pozwala na wykrywanie błędów w trakcie pisania kodu, zanim zostanie on uruchomiony.
TypeScript jest kompilowany do JavaScriptu, co oznacza, że kod napisany w TypeScript można uruchomić w dowolnej przeglądarce internetowej, ale najpierw musi zostać przetworzony do JavaScriptu. TypeScript jest językiem open-source, co oznacza, że każdy może przyczynić się do jego rozwoju. Oprócz dodania statycznego typowania, TypeScript dodaje również nowe funkcje, które nie są dostępne w JavaScriptcie.

### Czy TypeScript jest potrzebny?

Według mnie - osoby głównie pracującej przy aplikacjach - jest on dużym ułatwieniem i usprawnieniem pracy. Oczywiście wymaga on pewnych nakładów w postaci dodatkowej nauki i pilnowania, żeby typować pełne obiekty.
Przy poprawnym korzystaniu jest on dużą pomocą przy pracy na wielu plikach i zespołach. Zaawansowane elementy tego języka pozwalają na zmniejszenie ilości powtórzeń (tworzenie typu nadrzędnego, po czym tworzenie typów podrzędnych używając Pick) oraz na zwiększenie czytelności kodu (tworzenie typów generycznych). Jednakże wiele osób w community uważa, że TypeScript jest zbędny i niepotrzebnie komplikuje kod.
Dodatkowy krok kompilacji (a co za tym idzie bardziej skomplikowany proces CI/CD), utrudniona praca przy tworzeniu bibliotek (wymagane jest dodatkowe narzędzie do generowania definicji typów) oraz konieczność nauki nowego języka to
główne argumenty przeciwko TypeScriptowi. Niektórzy uważają to za tak wielki problem, że z dnia na dzień są w stanie wrócić do czystego JavaScriptu (przykład z roku temu [Svelte](https://github.com/sveltejs/svelte/pull/8569)).

### JSDoc

JSDoc to język znaczników stworzony do annotacji JavaScriptu. Za jego pomocą, używając specjalnej składni, możemy dodawać komentarze do naszego kodu, które będą wykorzystywane przez różne narzędzia do generowania dokumentacji.
Współczesne IDE, jak np. (VSCode), potrafią bez żadnych dodatkowych pluginów czy wtyczek korzystać z tej składni, by podpowiadać nam typy zmiennych, funkcji czy metod. Dzięki temu możemy uzyskać podobne efekty jak w TypeScriptcie.
Jednakże JSDoc nie jest tak rozbudowany jak TypeScript, nie pozwala na tworzenie typów generycznych, nie pozwala na tworzenie typów nadrzędnych i podrzędnych. Jest to jednakże dobry kompromis dla osób, które nie chcą korzystać z TypeScriptu.

Personalnie nie korzystałem z JSDoc przed pisaniem tego artykułu, ale z otwartym umysłem podchodzę do tego narzędzia.

### Przykłady

Żeby trochę utrudnić, będę pisał przykłady używając Reacta, który czasem wymaga bardziej skomplikowanych typów.

#### Zwykłe zmienne

Żeby otypować zwykłą zmienną, używamy składni `@type {typ}`. Przykład:

```javascript
/**
 * @type {number}
 */
const a = 1;
```

ale często, patrząc na różne przykłady, można zapisać to w skróconej wersji:

```javascript
const a = /** @type {number} */ (1);
```

Oczywiście, korzystając z TypeScriptu, możemy to zapisać w prostszy sposób:

```typescript
const a: number = 1;
```

#### Deklaracja typu

Stwórzmy sobie typ User, który będzie posiadał kilka pól, w tym jedno zagnieżdżone:

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

W TypeScriptcie:

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

Widzimy, że składnie w tym przypadku są dość podobne, ale w TypeScriptcie jest to bardziej czytelne.
Oczywiście, korzystając z JSDoc oraz z TypeScriptu, możemy eksportować/importować typy.
W TypeScriptcie poprzez dodanie `export` przed `type`, a następnie `import` w innym pliku.
W JSDoc jest podobnie, ale nie dodajemy `export`, a `import` wygląda trochę inaczej:

```javascript
/**
 * @import { User } from './User'
 */
```

#### Typowanie hooków

Tak jak wspominałem, testowałem JSDoc w Reactcie, więc chciałem sprawdzić, jak to jest z najprostszym z hooków - `useState`.

W TypeScriptcie wystarczy zadeklarować typ zmiennej (Użyjemy sobie naszego typu User z przykładu wyżej):

```typescript
const [users, setUser] = useState<User[]>([]);
```

W JSDoc:

```javascript
/**
 * @type {User[]}
 */
const [users, setUsers] = useState([]); <---- ten zapis nie jest poprawny

const [users, setUsers] = useState(/** @type {User[]} */([])); <---- ten zapis jest poprawny
```

Dlaczego pierwszy zapis nie jest poprawny? Ponieważ JSDoc ustawił typ `setUsers` też na `User[]`, a nie na `Dispatch<SetStateAction<User[]>>`. Dlatego musimy użyć drugiego zapisu.

#### Typowanie komponentu funkcyjnego

W Reactcie możemy używać komponentów funkcyjnych. W TypeScriptcie możemy zadeklarować typy propsów w taki sposób:

```typescript
interface UserProps {
  name: string;
  age: number;
};

const User = ({ name, age }: UserProps) => {...};
```

W JSDoc:

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

### Podsumowanie

JSDoc może być alternatywą dla typowania, ale wymaga on większej ilości boilerplatu. Oczywiście, typowanie w postaci JSDoc to tylko połowa tego, co on daje - każdy `@typedef` czy `@property` możemy opisać dodatkowymi informacjami, a
następnie wygenerować z tego dokumentację kodu. Dzięki czemu możemy za jednym zamachem zrobić dokumentację i sprawdzić, czy nasz kod jest poprawnie otypowany. Jednakże TypeScript jest bardziej rozbudowany i pozwala na bardziej zaawansowane
typowanie. Szukając opinii i informacji na temat różnic między tymi dwoma narzędziami, znalazłem wiele opinii, że TypeScript jest dużo lepszy do korzystania w aplikacjach, ale JSDoc jest lepszy do tworzenia bibliotek.

W dużej ścisłości, samo adnotowanie JSDoc'kiem daje nam tylko informacje o typach, ale w podstawowej konfiguracji VSCode nie podpowiada nam błędów w kodzie. Jakiś czas temu TypeScript dodał do swojej konfiguracji możliwość dodania
sprawdzania plików js oraz korzystania z adnotacji JSDoc. Dzięki temu możemy korzystać z obu narzędzi jednocześnie [link](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).
