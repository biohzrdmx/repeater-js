import "./adapter/adapter"
import "./adapter/bootstrap"

import "./fields/field"
import "./fields/text"
import "./fields/email"
import "./fields/url"
import "./fields/textarea"
import "./fields/select"
import "./fields/checkbox"
import "./fields/radio"
import "./fields/repeater"

import "./item"
import "./model"

(() => {
    class Repeater {

        strings;

        container;

        fields;

        schema;

        elements;

        items;

        constructor(container, definition, adapter, strings = null) {
            this.container = container;
            this.adapter = adapter;
            this.strings = strings || {
                'add': 'Add item',
                'append': 'Add item before',
                'copy': 'Copy to clipboard',
                'paste': 'Paste from clipboard',
                'delete': 'Delete item',
                'moveUp': 'Move item up',
                'moveDown': 'Move item down',
                'toggle': 'Toggle item',
            };
            this.items = [];
            this.fields = {};
            this.elements = {};
            this.registerField('text', window.Repeater.TextField);
            this.registerField('email', window.Repeater.EmailField);
            this.registerField('url', window.Repeater.UrlField);
            this.registerField('textarea', window.Repeater.TextAreaField);
            this.registerField('select', window.Repeater.SelectField);
            this.registerField('checkbox', window.Repeater.CheckboxField);
            this.registerField('radio', window.Repeater.RadioField);
            this.registerField('repeater', window.Repeater.RepeaterField);
            this.createRepeater(definition);
        }

        createRepeater(schema) {
            this.schema = schema;
            const id = window.Repeater.randomString(16);
            const buttonClass = this.adapter.classes('button');
            this.container.innerHTML = `<div id="${id}" class="repeater">
                <div class="repeater-items"></div>
                <div class="repeater-actions">
                    <a class="${buttonClass} repeater-action" data-action="append" href="#">${this.schema.button || this.strings.add}</a>
                </div>
            </div>`;
            //
            this.elements.repeater = document.getElementById(id);
            this.elements.items = this.elements.repeater.querySelector('.repeater-items');
            //
            this.elements.repeater.classList.add(this.adapter.classes('repeater'));
            this.elements.repeater.addEventListener('click', (e) => {
                const action = e.target.dataset.action || null;
                const repeaterItem = e.target.closest('.repeater-item');
                if (action) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    switch (action) {
                        case 'append':
                            this.append();
                        break;
                        case 'prepend':
                            this.prepend(repeaterItem);
                        break;
                        case 'delete':
                            this.delete(repeaterItem);
                        break;
                        case 'moveUp':
                            this.moveUp(repeaterItem);
                        break;
                        case 'moveDown':
                            this.moveDown(repeaterItem);
                        break;
                        case 'toggle':
                            this.toggle(repeaterItem);
                        break;
                    }
                }
            });
        }

        createItem(callback) {
            const id = window.Repeater.randomString(16);
            const model = new window.Repeater.Model(id);
            const item = new window.Repeater.Item(id, model, (field) => {
                const event = new CustomEvent('repeater.changed', { item: item, field: field });
                this.container.dispatchEvent(event);
            });
            callback(item, (element) => {
                const container = element.querySelector('.item-fields');
                this.schema.fields.forEach((field) => {
                    const constructor = this.fields[field.type] || null;
                    if (constructor === null) {
                        throw new Error(`Unknown field type '${field.type}'`);
                    }
                    const instance = new constructor(field, this.adapter);
                    console.log(field);
                    item.addField(container, instance, this.schema.collapsed === field.name);
                });
            });
        }

        registerField(name, constructor) {
            this.fields[name] = constructor;
        }

        append() {
            this.createItem((item, callback) => {
                this.elements.items.insertAdjacentHTML('beforeend', item.render(this.strings));
                this.items.push(item);
                const element = document.getElementById(item.id);
                element.item = item;
                callback(element);
            });
        }

        prepend(repeaterItem) {
            this.createItem((item, callback) => {
                repeaterItem.insertAdjacentHTML('beforebegin', item.render(this.strings));
                this.items.unshift(item);
                const element = document.getElementById(item.id);
                element.item = item;
                callback(element);
            });
        }

        delete(repeaterItem) {
            this.items = this.items.filter((item) => item.id !== repeaterItem.id);
            repeaterItem.remove();
        }

        moveUp(repeaterItem) {
          const prevItem = repeaterItem.previousElementSibling;
          if (prevItem) {
             prevItem.before(repeaterItem);
             const index = this.items.findIndex(item => item.id === repeaterItem.id);
             [this.items[index - 1], this.items[index]] = [this.items[index], this.items[index - 1]];
          }
        }

        moveDown(repeaterItem) {
          const nextItem = repeaterItem.nextElementSibling;
          if (nextItem) {
             nextItem.after(repeaterItem);
             const index = this.items.findIndex(item => item.id === repeaterItem.id);
             [this.items[index], this.items[index + 1]] = [this.items[index + 1], this.items[index]];
          }
        }

        toggle(repeaterItem) {
            repeaterItem.classList.toggle('is-collapsed');
        }

        load(data) {
            // Parse JSON data
        }

        save(asJson = true) {
            const document = [];
            this.items.forEach((item) => {
                document.push(item.serialize());
            });
            return asJson ? JSON.stringify(document) : document;
        }
    }

    window.Repeater = window.Repeater || {};

    window.Repeater.create = (container, definition, adapter, strings = null) => {
        return new Repeater(container, definition, adapter, strings);
    }

    window.Repeater.randomString = (length) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        if (window.crypto !== undefined) {
            const randomArray = new Uint8Array(length);
            crypto.getRandomValues(randomArray);
            randomArray.forEach((number) => {
                result += chars[number % chars.length];
            });
        } else {
            for (let i = 0; i < length; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
        }
        return result;
    };

    window.Repeater.icon = (name, attributes = {}) => {
        let code = null;
        let fill = 'none';
        switch (name) {
            case 'up':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>';
            break;
            case 'down':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>';
            break;
            case 'add':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>';
            break;
            case 'delete':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>';
            break;
            case 'email':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>';
            break;
            case 'web':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>';
            break;
            case 'copy':
                code = '<path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z"/>';
            break;
            case 'paste':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-5-4v4h4V3h-4Z"/>';
            break;
            case 'caret':
                code = '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 10 4-6 4 6H8Zm8 4-4 6-4-6h8Z"/>';
            break;
        }
        if (code) {
            attributes.width = attributes.width || 24;
            attributes.height = attributes.height || 24;
            const attrs = Object.keys(attributes).map(key => `${key}="${attributes[key]}"`).join(" ");
            return `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" ${attrs} fill="${fill}" viewBox="0 0 24 24">${code}</svg>`;
        }
        return '';
    };

})();
