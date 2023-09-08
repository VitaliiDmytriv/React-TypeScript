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
