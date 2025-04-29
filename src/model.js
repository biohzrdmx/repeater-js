(() => {
    class Model {

        id;

        fields;

        metadata;

        constructor(id) {
            this.id = id;
            this.fields = {};
            this.metadata = {};
        }

        addField(name, value) {
            this.fields[name] = value;
        }

        updateField(name, value) {
            this.fields[name] = value;
        }

        setMetadata(name, value) {
            this.metadata[name] = value;
        }

        getMetadata(name, defaultValue = null) {
            return this.metadata[name] || defaultValue;
        }

        serialize() {
            const serialized = {};
            Object.entries(this.metadata).forEach(([name, value]) => {
                serialized[`_${name}`] = value;
            });
            Object.entries(this.fields).forEach(([name, value]) => {
                serialized[name] = value;
            });
            return serialized;
        }
    }

    window.Repeater = window.Repeater || {};
    window.Repeater.Model = Model;
})();
