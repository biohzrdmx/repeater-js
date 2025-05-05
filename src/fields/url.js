(() => {
    class UrlField extends Repeater.TextField {

        render(id) {
            const markup = this.adapter.markup('url', this, id);
            if (markup) {
                return markup;
            } else {
                const classes = this.adapter.classes('url');
                const attributes = this.getAttributes();
                return `<input type="url" name="${id}" id="${id}_0" ${attributes} class="${classes}">`;
            }
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.UrlField = UrlField;
})();