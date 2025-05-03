# repeater-js

Create field repeaters easily, with no dependencies and in less than 20 KiB!

## Basic usage

First add `repeater.min.js` and `repeater.min.css` to your HTML file.

Then create a container for the repeater, for example:

```html
<div id="repeater-goes-here"></div>
```

Now call the `create` method on the `Repeater` class:

```js
const container = document.getElementById('repeater-goes-here');
const schema = {}; // Of course you will need a valid schema
const adapter = new Repeater.BootstrapAdapter();
Repeater.create(container, schema, adapter);
```

You must pass an adapter (in this case a `Repeater.BootstrapAdapter` instance) to properly apply the classes and markup of your CSS framework.

Please do note that you must pass an `schema` for the repeater, which is detailed in the next section.

### Repeater schema

The repeater schema defines the properties of the repeater, which fields it contains and the options for each of them, for example:

```json
{
  "button": "Add item",
  "collapsed": "title",
  "fields": [{
    "type": "text",
    "name": "title",
    "label": "Title",
    "placeholder": "Enter a title",
    "required": true
  }, {
    "type": "textarea",
    "name": "excerpt",
    "label": "Excerpt",
    "placeholder": "An overview of the item",
    "required": false
  }]
}
```

This schema defines two fields:

- A `text` field named `title`
- A `textarea` field named `excerpt`

Also, it defines two repeater properties:

- `button` overrides the text of the 'Add item' button
- `collapsed` defines which field will be shown as the title on collapsed items

#### Field types

There are several field types and each one can have different settings; the ones included are:

- `checkbox` - A group of checkboxes for multiple selection
- `email` - A text field for email addresses
- `radio` - A group of radio buttons for single selection
- `repeater` - A nested repeater (yep, nesting repeaters is possible)
- `select` - A select box for single selection 
- `text` - A single-line text field
- `textarea` - A multi-line text field
- `url` - A text field for URLs

Each type supports the same basic properties:

- `name` - The name if the field
- `label` - The text of the field label
- `required` - Whether the field is required or not, for validation purposes

Additionally, text fields have the following properties

- `placeholder` - The text shown when there's no value (only text fields)

Selection fields have these properties:

- `options` - An `Array` of options, these can be value pairs `{"key": "value"}` or just the values `"value"`
- `default` - The default selection (only select and radio, checkboxes do not support this property)

Finally, `repeater` fields support the following properties:

- `schema` - The schema of the repeater

For a full schema please refer to the `index.html` file which has an example with nested repeaters.

### Saving and loading

For your convenience, the `Repeater` class has two utility methods: `save` and `load`:

```js
const container = document.getElementById('repeater-goes-here');
const schema = {}; // Of course you will need a valid schema
const adapter = new Repeater.BootstrapAdapter();
const myRepeater = Repeater.create(container, schema, new Repeater.BootstrapAdapter);

// Prepare a JSON array for saving the repeater contents
const json = myRepeater.save(); 

// Load the repeater contents from a JSON array
const json = []; // This is just an example, here you should pass an array with some items
myRepeater.load(json);
```

The `load` method will accept either a JSON array or a string that will be parsed on-the-fly.

### Events

When should you call the `save` method?

The easiest way is having a hidden textarea which gets updated with the JSON-encoded contents of the repeater each time it changes; to do so listen to the `repeater.changed` event on your container:

```js
container.addEventListener('repeater.change', () => {
    const textarea = document.getElementById('my-textarea');
    textarea.value = myRepeater.save();
});
```

Also, if you feel fancy you may intercept your form `submit` event, create a custom save procedure using `fetch`, etc. Just call the `save` method and store its result in your database or localStorage or wherever you want to.

To restore the contents, create the repeater and populate it with the `load` method by passing the freshly fetched data.

It's that simple.

### Adapters

For now only a Bootstrap 5 adapter is included, if you want to create a Tailwind or Bulma or whatever-css-framework one, you are welcome to do so and send a pull-request. Please take the Bootstrap one as reference on how it should look, there are no hard visual guidelines but the UI ideally should be simple, eye-pleasing and easy to use.

Basically you just have to create a class that extends `Repeater.AbstractAdapter` and implements its two abstract methods for resolving class names and custom markup depending on the field type (please take a look at the Bootstrap one for more details)

### Custom field types

Want to create a WYSIWYG field? or a Markdown editor? Or a CodeMirror one? It's very easy!

Look, there is a `Repeater.AbstractField` class that all the other fields inherit from and which has the basic infra to implement ANY field type.

Please take a look at the source code of the included fields for more details, but really, even the nested repeater is just some 20-ish lines long!

### Custom icons

The included icons are from [Flowbite](https://flowbite.com/icons/), these icons are MIT licensed, just as this library is.

But if you can't or don't want to use them you may override the `Repeater.icons` function to use the icon library you like (for example FontAwesome, Dashicons, Uicons, etc.). Please refer to the source code for more info.

### Localization

Yeah, you may even provide translations for the repeater strings, just pass a 4th parameter when creating your repeater:

```js
const container = document.getElementById('repeater-goes-here');
const schema = {}; // Of course you will need a valid schema
const adapter = new Repeater.BootstrapAdapter();
const strings = {
    'add': 'Añadir elemento',
    'append': 'Añadir elemento antes del actual',
    'copy': 'Copiar al portapapeles',
    'paste': 'Pegar desde el portapapeles',
    'delete': 'Eliminar elemento',
    'moveUp': 'Subir elemento',
    'moveDown': 'Bajar elemento',
    'toggle': 'Mostrar/ocultar elemento',
    'placeholder': 'Áún no hay elementos, haz click en el botón de abajo para añadir uno nuevo'
};
Repeater.create(container, schema, adapter, strings);
```
Again, please refer to the source code for an up-to-date list of the required strings.

## Building

Speaking of source code, to build the library you will need **esbuild** and **sass**, the `package.json` file has a couple of scripts to compile the scripts and styles, it assumes that both packages are installed globally.

This was created using the free version of [WebStorm](https://www.jetbrains.com/webstorm/) and it kind-of autoconfigures the build scripts, so that must be the easiest way of working with the source of this library. You don't need any other package to work on the source code, this is as vanilla JS as it gets! 

## ToDo

There are some missing features currently, if you'd like to help you're welcome to fork the repo, add a feature and send a pull-request.

These are the most prominent ones:

- [ ] Improve error handling 
- [ ] Copy/paste functionality
- [ ] Data validation
- [x] Placeholders
- [ ] More events and callbacks for advanced users
- [ ] Maybe more adapters (Tailwind for example)

## Licensing

This software is released under the MIT license.

## Credits

**Lead coder:** biohzrdmx [<github.com/biohzrdmx>](http://github.com/biohzrdmx)