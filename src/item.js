(() => {
    class Item {

        id;

        repeater;

        model;

        fields;

        updated;

        title;

        conditionals;

        constructor(repeater, id, model, updated) {
            this.repeater = repeater;
            this.id = id;
            this.model = model;
            this.fields = {};
            this.updated = updated;
            this.conditionals = {};
            this.title = null;
        }

        render(strings) {
            const collapsed = this.model.getMetadata('collapsed', false);
            return `<div id="${this.id}" class="repeater-item ${collapsed ? 'is-collapsed' : ''}">
                <div class="item-header">
                    <div class="header-title">
                        <a href="#" data-action="toggle" title="${strings.toggle}">${window.Repeater.icon('caret')}</a>
                        <span data-title="${strings.item}"></span>
                    </div>
                    <div class="header-actions">
                        <a href="#" data-action="copy" title="${strings.copy}">${window.Repeater.icon('copy')}</a>
                        <a href="#" data-action="paste" title="${strings.paste}">${window.Repeater.icon('paste')}</a>
                        <a href="#" data-action="moveUp" title="${strings.moveUp}">${window.Repeater.icon('up')}</a>
                        <a href="#" data-action="moveDown" title="${strings.moveDown}">${window.Repeater.icon('down')}</a>
                        <a href="#" data-action="prepend" title="${strings.add}">${window.Repeater.icon('add')}</a>
                        <a href="#" data-action="delete" title="${strings.delete}">${window.Repeater.icon('delete')}</a>
                    </div>
                </div>
                <div class="item-fields"></div>
            </div>`;
        }

        addField(container, field, initial = '', asCollapsed = false) {
            const id = window.Repeater.randomString(16);
            const markup = field.render(id);
            const label = field.options.label ? field.label(id) : null;
            const wrapper = document.createElement('div');
            wrapper.id = id;
            wrapper.className = `field`;
            if (label !== null) {
                wrapper.insertAdjacentHTML('beforeend', label);
            }
            wrapper.insertAdjacentHTML('beforeend', markup);
            container.append(wrapper);
            this.model.addField(field.options.name, initial);
            if (asCollapsed) {
                 this.title = document.getElementById(this.id).querySelector('.header-title span');
            }
            if ( typeof field.options.conditional !== 'undefined' ) {
                this.conditionals[field.options.conditional.field] = this.conditionals[field.options.conditional.field] || [];
                if (! ['empty', 'notEmpty', 'equal', 'notEqual', 'matches', 'contains'].includes(field.options.conditional.type) ) {
                    throw new Error(`Conditional of type "${field.options.conditional.type}" is not supported`);
                }
                this.conditionals[field.options.conditional.field].push({
                    type: field.options.conditional.type,
                    value: field.options.conditional.value,
                    field: field,
                });
            }
            field.init(wrapper, (value) => {
                if (asCollapsed) {
                    this.updateTitle(value);
                }
                this.model.updateField(field.options.name, value);
                this.updated(field);
                this.applyConditionals(field, value);
            });
            field.refresh();
            if (asCollapsed) {
                this.updateTitle(initial);
            }
            this.fields[field.options.name] = field;
        }

        applyConditionals(field, value) {
            const conditionals = this.conditionals[field.options.name] || [];
            conditionals.forEach((conditional) => {
                let result = false;
                switch (conditional.type) {
                    case 'empty':
                        result = value === '' || value === 0 || value === false;
                    break;
                    case 'notEmpty':
                        result = value !== '' && value !== 0 && value !== false;
                    break;
                    case 'equal':
                        result = value === conditional.value;
                    break;
                    case 'notEqual':
                        result = value !== conditional.value;
                    break;
                    case 'matches':
                        const expr = new RegExp(conditional.value, 'i');
                        result = expr.test(value);
                    break;
                    case 'contains':
                        result = value.indexOf(value) >= 0;
                    break;
                }
                conditional.field.conditional(result);
            });
        }

        created() {
            Object.entries(this.fields).forEach(([name, field]) => {
                const value = this.model.getField(name);
                this.applyConditionals(field, value);
            });
        }

        updateTitle(value) {
            this.title.textContent = value || (this.repeater.schema.item || this.title.dataset.title);
        }

        serialize() {
            return this.model.serialize();
        }

        unserialize(data) {
            this.model.unserialize(data);
            Object.values(this.fields).forEach((field) => {
                field.refresh();
            });
            this.created();
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.Item = Item;
})();
