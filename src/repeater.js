import "./adapter/adapter"
import "./adapter/bootstrap"

import "./fields/field"
import "./fields/text"
import "./fields/textarea"
import "./fields/select"

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
                'delete': 'Delete item',
                'moveUp': 'Move item up',
                'moveDown': 'Move item down',
            };
            this.items = [];
            this.fields = {};
            this.elements = {};
            this.registerField('text', window.Repeater.TextField);
            this.registerField('textarea', window.Repeater.TextAreaField);
            this.registerField('select', window.Repeater.SelectField);
            this.createRepeater(definition);
        }

        createRepeater(schema) {
            this.schema = schema;
            const id = window.Repeater.randomString(16);
            const buttonClass = this.adapter.classes('button');
            this.container.innerHTML = `<div id="${id}" class="repeater">
                <div class="repeater-items"></div>
                <div class="repeater-actions">
                    <a class="${buttonClass} repeater-action" data-action="append" href="#">${this.strings.add}</a>
                </div>
            </div>`;
            //
            this.elements.repeater = document.getElementById(id);
            this.elements.items = document.querySelector('.repeater-items');
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
                    }
                }
            });
        }

        createItem(callback) {
            const id = window.Repeater.randomString(16);
            const model = new window.Repeater.Model(id);
            const item = new window.Repeater.Item(id, model);
            callback(item, (element) => {
                const container = element.querySelector('.item-fields');
                this.schema.fields.forEach((field) => {
                    const constructor = this.fields[field.type] || null;
                    if (constructor === null) {
                        throw new Error(`Unknown field type '${field.type}'`);
                    }
                    const instance = new constructor(field, this.adapter);
                    item.addField(container, instance, () => {});
                });
            });
        }

        registerField(name, constructor) {
            this.fields[name] = constructor;
        }

        append() {
            this.createItem((item, callback) => {
                this.elements.items.insertAdjacentHTML('beforeend', item.render(this.strings));
                this.items.unshift(item);
                const element = document.getElementById(item.id);
                callback(element);
            });
        }

        prepend(repeaterItem) {
            this.createItem((item, callback) => {
                repeaterItem.insertAdjacentHTML('beforebegin', item.render(this.strings));
                this.items.push(item);
                const element = document.getElementById(item.id);
                callback(element);
            });
        }

        delete(repeaterItem) {
            //
        }

        load(data) {
            // Parse JSON data
        }

        save() {
            const document = [];
            this.items.forEach((item) => {
                document.push(item.serialize());
            });
            return JSON.stringify(document);
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

})();
