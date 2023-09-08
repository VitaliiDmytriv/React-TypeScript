### Controlled components

```
const [contact, setContact] = useState<Contact>({
    name: '',
    email: '',
    reason: '',
    notes: '',
});

...
<input
    type="text"
    id="name"
    value={contact.name}
    onChange={(e) => setContact({ ...contact, name: e.target.value })}
/>
...

```

So, every time a character is entered into a field, the whole form is re-rendered. This makes sense because a state change occurs when a field changes, and a state change causes a re-render.
This isn’t a huge problem in this small form but can be a significant performance problem in larger forms.

The key takeaway from this section is that controlling field values with the state can lead to performance problems. Having to bind the state to each field also feels a bit repetitive.

### uncontrolled components

```
function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contact = {
        name: formData.get('name'),
        email: formData.get('email'),
        reason: formData.get('reason'),
        notes: formData.get('notes'),
    } as Contact;
}

...
<input type="text" id="name" name="name" />
...
<input type="email" id="email" name="email" />
...
```

The name attribute is important because it will allow us to easily extract field values in the form submit handler.

FormData is an interface that allows access to values in a form and takes in a form element in its constructor parameter. It contains a get method that returns the value of the field whose name is passed as an argument.

uncontrolled fields don’t have values stored in the state. Instead, field values are obtained using FormData, which relies on field editors having a name attribute.

Notice the reduced code in the implementation compared to the controlled fields implementation.

В такому випадку ререндер ніколи не трапиться, тому що немає жодного стану який зміниться і викличе ререндеринг.

### React Router Form

when we need to mutate data we need to set method to "post"
The default method is 'get'

Actions are called whenever the app sends a non-get submission ("post", "put", "patch", "delete") to your route.

```
<Form method="post" action="/songs" />;
```

В action прилітає:

1. `params` - Route params are parsed from dynamic segments and passed to your action.
2. `request` This is a Fetch Request instance being sent to your route. The most common use case is to parse the FormData from the reques

Without JavaScript, just plain HTML and an HTTP web server, that default event that was prevented is actually pretty great. Browsers will serialize all the data in the form into FormData and send it as the body of a new request to your server. Like the code above, React Router `<Form>` prevents the browser from sending that request and instead sends the request to your route action! This enables highly dynamic web apps with the simple model of HTML and HTTP.

Remember that the values in the formData are automatically serialized from the form submission, so your inputs need a name.

```
//Anoter file
{
    path: '/contact',
    element: <ContactPage />,
    action: contactPageAction,
},
//Anoter file

export async function contactPageAction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const contact = {
        name: formData.get('name'),
        email: formData.get('email'),
        reason: formData.get('reason'),
        notes: formData.get('notes'),
    } as Contact;
    console.log(contact);
}

```

1. Cпершу потрібно змінити аргумент, react router передає `{params,request,context?}` як аргумент у action функцію, відповідно використовуємо interface `ActionFunctionArgs`.
2. Видалити `e.preventDefault();` томущо react router робить це за нас.
   `const formData = await request.formData();`
3. змінити спосіб отримання даних з форми використовуючи аргумент `request`.
4. І в кінці зробити `redirect` на сторінку подяки.

```
export async function contactPageAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const contact = {
        name: formData.get('name'),
        email: formData.get('email'),
        reason: formData.get('reason'),
        notes: formData.get('notes'),
    } as Contact;
    console.log(contact);
    return redirect(`/thank-you/${formData.get('name')}`);
}
```

-   React Router’s Form component is a wrapper around the HTML form element
-   The form is submitted to the current route by default, but can be submitted to a different path using the path attribute
-   We can write logic inside the submission process using an action function defined on the route that is submitted to
