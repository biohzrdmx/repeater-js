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

- `text` - A single-line text field
- `number` - A text field for a number
- `password` - A text field for a password
- `phone` - A text field for a phone number
- `email` - A text field for an email address
- `url` - A text field for a URL
- `date` - A text field for a date
- `time` - A text field for a time
- `datetime` - A text field for a date with time
- `textarea` - A multi-line text field
- `range` - A range selector 
- `toggle` - A single checkbox for a true/false selection 
- `select` - A select box for single selection 
- `checkbox` - A group of checkboxes for multiple selection
- `radio` - A group of radio buttons for single selection
- `repeater` - A nested repeater (yep, nesting repeaters is possible)

Each type supports the same basic properties:

- `name` - The name if the field
- `label` - The text of the field label
- `required` - Whether the field is required or not, for validation purposes

Additionally, text fields have the following properties

- `placeholder` - The text shown when there's no value (only text fields)
- `minlength` - Minimum length in characters
- `maxlength` - Maximum length in characters
- `disabled` - Disabled flag (true/false)
- `readonly` - Read-only flag (true/false)
- `pattern` - Regex pattern for validation
- `required` - Required flag (true/false)
- `autocomplete` - Autocomplete options
- `value` - Default value

Numeric fields and date/time fields also have:

- `min` - Minimum possible value
- `max` - Maximum possible value
- `step` - Step size

Selection fields have these properties:

- `options` - An `Array` of options, these can be value pairs `{"key": "value"}` or just the values `"value"`
- `default` - The default selection (only select and radio, checkboxes do not support this property)

Finally, `repeater` fields support the following properties:

- `schema` - The schema of the repeater

#### Conditionals

Fields can be conditional, that is, they are enabled only if certain conditions are met.

Defining them is pretty simple, just include a `conditional` object inside the field's properties:

```json
{
  "button": "Add field",
  "collapsed": "type",
  "fields": [{
    "type": "select",
    "name": "type",
    "label": "Field type",
    "options": [
      { "text": "Single-line text" },
      { "textarea": "Multi-line text" },
      { "select": "Selection box" }
    ],
    "required": true
  }, {
    "type": "repeater",
    "name": "options",
    "label": "Options",
    "fields": [...],
    "conditional": {
      "field": "type",
      "type": "equal",
      "value": "select"
    }
  }]
}
```

The `conditional` object has the following properties:

- `field` - The name of the field which will determine the status of the conditional field
- `type` - The type of condition 
- `value` - The value used to evaluate the condition

And the `type` field can be any of these conditions:

- `empty` - The field is empty
- `notEmpty` - The field is NOT empty
- `equal` - The field's value is equal to `value`
- `notEqual` - The field's value is NOT equal to `value`
- `matches` - The field's value matches the regular expression in `value`
- `contains` - The field's value contains `value`

For example, to match a regular expression you can do the following:

```json
  ...
    "conditional": {
      "field": "type",
      "type": "matches",
      "value": "select|checkbox|radio"
    }
  ...
```

And it will match `/select|checkbox|radio/i` to allow any of `select`, `checkbox`, `radio` as the value.

#### Transforms

Text fields (`text`, `textarea`) support a `transform` property, this property is used to specify an additional transform for the value of the field:

```json
  ...
    "fields": [{
      "type": 'text',
      "name": 'label',
      "label": 'Label',
      "required": true,
      "transform": {
        "type": 'slug',
        "target": 'value'
      }
    }]
  ...
```

The included transforms are:

- `lowercase` - Converts the value to lower case 
- `uppercase` - Converts the value to UPPER CASE
- `titlecase` - Converts the value to Title Case
- `slug` - Converts the value to a slug

Additionally, you may specify a `target` property with the name of the field that will be modified, if no `target` is set it will change the content of the current field.

#### Layout

The `layout` property allows you to fine-tune the disposition of the fields by creating multi-column layouts.

Currently, you can specify two properties for the `layout` object:

- `column` - Specifies the column size, this depends on the adapter, for example the included Bootstrap adapter expects a number between 1 and 12 to build the `col-lg-<number>` class.
- `newRow` - New row flag, set this to `true` to begin a new row

```json
  ...
    "layout": {
      "column": 6,
      "newRow": true
    }
  ...
```

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
    'item': 'Elemento',
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

- [ ] File inputs
- [ ] Improve error handling 
- [x] Copy/paste functionality
- [ ] Data validation
- [x] Placeholders
- [x] More standard fields
- [x] Conditional fields
- [ ] More events and callbacks for advanced users
- [ ] Maybe more adapters (Tailwind for example)

## Licensing

This software is released under the MIT license.

## Credits

**Lead coder:** biohzrdmx [<github.com/biohzrdmx>](http://github.com/biohzrdmx)