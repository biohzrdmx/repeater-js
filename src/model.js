(() => {
    class Model {

        id;

        fields;

        constructor(id) {
            this.id = id;
            this.fields = {};
        }

        addField(name, value) {
            this.fields[name] = value;
        }

        updateField(name, value) {
            this.fields[name] = value;
        }

        serialize() {
            const serialized = {};
            Object.entries(this.fields).forEach(([name, value]) => {
                serialized[name] = value;
            });
            return serialized;
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.Model = Model;
})();
