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
