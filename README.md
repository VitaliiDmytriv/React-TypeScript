### type annotation:

`let unitPrice: number;`

### type inference

```
let flag = false;
```

І змінна flag одразу отримує inference - let flag: boolean

`flag = "table"` - видасть помилку - "Type 'string' is not assignable to type

`let today = new Date();` - також автоматично створить тип Date

Відповідно IntelliSense видає методи які підходять лише для даних типу Date

### unknown type

the unknown type is an excellent choice for data whose type you are unsure about.
However, you can’t interact with unknown variables – the variable must be widened to a different type before any interaction.

```
fetch("https://swapi.dev/api/people/1")
    .then((response) => response.json())
    .then((data: unknown) => {
        if (isCharacter(data)) {
            console.log("name", data.name);
        }
    });

function isCharacter(character: any): character is { name: string } {
    return "name" in character;
}
```

### Recap

-   TypeScript adds many useful types to JavaScripts types, such as `Date`, and is capable of representing arrays.
-   TypeScript can infer a variable’s type from its assigned value. A type annotation can be used where type inference doesn’t give the desired type.
-   No type checking occurs on variables with the any type, so this type should be avoided.
-   The unknown type is a strongly-typed alternative to any, but unknown variables must be widened to be interacted with.
-   void is a return type for a function that doesn’t return a value.
-   The never type can be used to mark unreachable areas of code.
-   Array types can be defined using square brackets after the array item type.

### Using object types

```
let table = {name: "Table", unitPrice: 450};
```

on hover

```
{
    name: string;
    unitPrice: number;
}
```

`unitPrice?: number` optinal properties

```
const table: { name: string; unitPrice?: number } = {
    name: "Table",
};
```

### Creating type aliases

```
type Product = { name: string; unitPrice?: number };

let table: Product = { name: "Table" };
let chair: Product = { name: "Chair", unitPrice: 40 };
```

A type alias can extend another object using the & symbol. Create a second type for a discounted product by adding the following type alias:

```
type DiscountedProduct = Product & { discount: number };
```

function alias

```
type Purchase = (quantity: number) => void;
```

```
const purchase:Purchase =(quantity)=>{
    console.log(quantity)
}
```

### Creating interfaces

```
interface Product {
    name: string;
    unitPrice?: number;
}
```

Вони також можуть наслідувати інші інтерфейси

```
interface DiscountedProduct extends Product {
    discount: number;
}
```

### Creating classes

```
class Product {
    name;
    unitPrice;
    constructor(name:string,unitPrice:number){
        this.name = name;
        this.unitPrice = unitPrice;
    }
}
```

Можна і не визначати зміні у класі, якщо в конструкторі позначити їх як public. Також можна додавати методи до класу.

```
class Product {
    constructor(public name: string, public unitPrice:
    number) {
        this.name = name;
        this.unitPrice = unitPrice;
    }

    getDiscountPrice(discount:number):number{
        return this.unitPrice-discount
    }
}
```

TypeScript will automatically create properties for constructor parameters that are marked as public.

```
const table = new Product("Table",45);

```

### Creating enumerations

```
enum Level {
    Low, // 0
    Medium, // 1
    High // 2
}
```

By default, enumerations are zero-based numbers (this means that the first enumeration value is 0, the next is 1, the next is 2, and so on). In the preceding example, Level.Low is 0, Level. Medium is 1, and Level.High is 2.

```
const level = Level.Low
console.log(level) // 0
```

Але можна і використовувати власні цифри для позначень зміних

### Creating union types

```
type RGB = "red" | "green" | "blue";
let color: RGB = "red";
```

### Reacap

-   Objects and functions can be represented using type aliases or interfaces. They have very similar capabilities, but the type alias syntax is a little more intuitive for representing functions.
-   The ? symbol can specify that an object property or function parameter is optional.
-   Type annotations can be added to class properties and constructor and method parameters to make them type-safe.
-   Like string-based union types, string-based enumerations are great for a specific set of strings. A string union type is the simplest approach if the strings are meaningful. If the strings aren’t meaningful, then a string enumeration can be used to make them readable.
