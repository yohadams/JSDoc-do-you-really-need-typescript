# JSDoc - do you really need TypeScript?

## Introduction

TypeScript to nadzbiór JavaScriptu stworzony przez firmę Microsoft. Jego głównym celem jest dodanie statycznego typowania do JavaScriptu. Dzięki temu TypeScript pozwala na wykrywanie błędów w trakcie pisania kodu, zanim zostanie on uruchomiony.
TypeScript jest kompilowany do JavaScriptu, co oznacza, że kod napisany w TypeScript można uruchomić w dowolnej przeglądarce internetowej ale najpierw musi zostać przetworzony do JavaScriptu. TypeScript jest językiem open-source, co oznacza, że każdy może przyczynić się do jego rozwoju. Oprócz dodania statycznego typowania, TypeScript dodaje również nowe funkcje, które nie są dostępne w JavaScriptcie.

### Czy TypeScript jest potrzebny?

Według mnie - osoby głównie pracującej przy aplikacjach - jet on dużym ułatwieniem i usprawanieniem pracy. Oczywiscie wymaga on pewnych nakładów w postaci dodatkowej nauki i pilnowania żeby typować pełne obiekty.
Przy poprawnym kożystaniu jet on dużą pomocą przy pracy na wielu plikach i zespołach. Zaawanoswane elementy tego jezyka pozwalają na zminiejeszczenie ilości powtórzen (tworzenie typu nadrzędnego
po czym tworzenie typów podrzędnych używająć Pick) oraz na zwiększenie czytelności kodu (tworzenie typów generycznych). Jednakrze wiele osbów w community uważa że TypeScript jest zbędny i niepotrzebnie komplikuje kod.
Dodatkowy krok kompilacji (a co za tym idzie bnardziej skomplikowany proces CI/CD), utrudniona praca przy tworzeniu bibliotek (wymagane jest dodatkowe narzędzie do generowania definicji typów) oraz konieczność nauki nowego języka to
główne argumenty przeciwko TypeScriptowi. Niektórzy uważają to za tak wielki problem że z dznia na dzien są wstanie wrócić do czystego JavaScriptu (przyklad z roku temu (Svelt)[https://github.com/sveltejs/svelte/pull/8569]).

### JSdoc

JSdoc to język znaczników stworzony do annotacji JavaScriptu. Za jego pomocą używając specjalnej składni możemy dodawać komentarze do naszego kodu, które będą wykorzystywane przez różne narzędzia do generowania dokumentacji.
Wspólczesne IDE jak np. (VSCode) potrafią bez żadnych dodatkówych pluginów czy wtyczek kozystac z tegj składni by podpowiadać nam typy zmiennych, funkcji czy metod. Dzieki temu możemy uzyskać podobne efekty jak w TypeScriptcie.
Jednakże JSdoc nie jest tak rozbudowany jak TypeScript, nie pozwala na tworzenie typów generycznych, nie pozwala na tworzenie typów nadrzędnych i podrzędnych. Jest to jednakże dobry kompromis dla osób które nie chcą korzystać z TypeScriptu.

Personalnie nie kozystałem z JSDoc przed pisaniem tego artykułu więc ale z otwartym umysłem podchodzę do tego narzędzia.

### Przykłady

Żeby troche utrudnić będę pisał przykłady użwyając React, ktróry czasem wymaga bardziej skomplikowanych typów.

#### Zwykły zmienne

Zeby otypować zwykłą zmienną używamy składni `@type {typ}`. Przykład:

```javascript
/**
 * @type {number}
 */
const a = 1;
```

ale często patrząć na rożne przyklady można zapisać to w skróconej wersji:

```javascript
const a = /** @type {number} */ (1);
```

oczywiscie kożystając z TypeScriptu możemy to zapisać w prostszy sposób:

```typescript
const a: number = 1;
```

#### Deklaracja typu

Stwórzmy sobie tym User który będzie posiadał kilka pól w tym jedno zagnieżdżone:

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

Widzimy że składnie w tym przypdaku są dość podobne ale w TypeScriptcie jest to bardziej czytelne.
Oczywiscie kożystajac z JSDoc oraz z TypeScriptu możemy exportować/impotować typy.
W Typescripcie poprzez dodanie `export` przed `type` a nastepnie `import` w innym pliku.
W JSDoc jest podobnie ale nie dodajamy `export` a `import` wygląda troche inaczej:

```javascript
/**
 * @import { User } from './User'
 */
```

#### Typownaie hooków

Tak jak wspominałem testowałem JSDoc w Reactcie więc chiałem sprawdzić jak to jest z najprostrzym z hooków - `useState`.

W typescripcie wystarczy zadeklarować typ zmiennej (Użyjemy sobie naszego typu User z przykładu wyżej):

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

Dlaczego pierwszy zapis nie jest poprawny? Ponieważ JSDoc ustawił typ `setUsers` też na `User[]` a nie na `Dispatch<SetStateAction<User[]>>`. Dlatego musimy użyć drugiego zapisu.

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

JSDoc może byc alternatywą dla typowania ale wymaga on większej ilości boilerplatu. Oczywiscie typowanie w postaci JSDoc to tylko połowa tego co on daje - każdy `@typedef` czy `@property` możemy opisać dodatkowymi informacjami a
nastpenie wygenerować z tego dokumentacje kodu. Dzięki czemu możemy za jednym zamachem zrobić dokumentacje i sprawdzić czy nasz kod jest poprawnie otypowany. Jednakże TypeScript jest bardziej rozbudowany i pozwala na bardziej zaawansowane
typowanie. Szukając opini i informacji na temat różnic miedzy tymi dwoma narzędziami znalazłem wiele opini że TypeScript jest dużo lepszy do korzystania w aplikacjach ale JSDoc jest lepszy do tworzenia bibliotek.

W gwoli scisliwoasci samo adnotowanie JSDoc'kiem daje nam tylko informacje o typach, ale w podstawowje konfiguracji VSCode nie podpowiada nam błędów w kodzie. Jakiś czas temu typescript dodał do swojej konfiguracji możliwość dodania
sprawdzania plików js oraz kożystania z adnotacji JSDoc. Dzięki temu możemy kożystać z obu narzędzi jednocześnie [link](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).
