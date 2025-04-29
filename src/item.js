(() => {
    class Item {

        id;

        model;

        updated;

        title;

        constructor(id, model, updated, values) {
            this.id = id;
            this.model = model;
            this.updated = updated;
        }

        render(strings) {
            const collapsed = this.model.getMetadata('collapsed', false);
            return `<div id="${this.id}" class="repeater-item ${collapsed ? 'is-collapsed' : ''}">
                <div class="item-header">
                    <div class="header-title">
                        <a href="#" data-action="toggle" title="${strings.toggle}">${window.Repeater.icon('caret')}</a>
                        <span></span>
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
            const label = field.label(id);
            const wrapper = document.createElement('div');
            wrapper.id = id;
            wrapper.className = `field`;
            wrapper.insertAdjacentHTML('beforeend', label);
            wrapper.insertAdjacentHTML('beforeend', markup);
            container.append(wrapper);
            this.model.addField(field.options.name, initial);
            if (asCollapsed) {
                this.title = document.getElementById(this.id).querySelector('.header-title span');
            }
            field.init(wrapper, (value) => {
                if (asCollapsed) {
                    this.title.textContent = value;
                }
                this.model.updateField(field.options.name, value);
                this.updated(field);
            }, initial);
        }

        serialize() {
            return this.model.serialize();
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.Item = Item;
})();
