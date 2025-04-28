(() => {
    class Item {

        id;

        model;

        constructor(id, model) {
            this.id = id;
            this.model = model;
        }

        render(strings) {
            return `<div id="${this.id}" class="repeater-item">
                <div class="item-header">
                    <div class="header-title"></div>
                    <div class="header-actions">
                        <a href="#" class="has-icon icon-up" data-action="moveUp" title="${strings.moveUp}"></a>
                        <a href="#" class="has-icon icon-down" data-action="moveDown" title="${strings.moveDown}"></a>
                        <a href="#" class="has-icon icon-add" data-action="prepend" title="${strings.add}"></a>
                        <a href="#" class="has-icon icon-delete" data-action="delete" title="${strings.delete}"></a>
                    </div>
                </div>
                <div class="item-fields"></div>
            </div>`;
        }

        addField(container, field) {
            const id = window.Repeater.randomString(16);
            const markup = field.render(id);
            const label = field.label(id);
            const wrapper = document.createElement('div');
            wrapper.id = id;
            wrapper.className = `field`;
            wrapper.insertAdjacentHTML('beforeend', label);
            wrapper.insertAdjacentHTML('beforeend', markup);
            container.append(wrapper);
            this.model.addField(field.options.name, '');
            field.init(wrapper, (value) => {
                this.model.updateField(field.options.name, value);
            });
        }

        serialize() {
            return this.model.serialize();
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.Item = Item;
})();
