/** @odoo-module **/
import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";

odoo.__DEBUG__ && console.log("Console log inside the patch function", FormController.prototype, "form_controller");

patch(FormController.prototype, {

    setup() {
        this.props.preventEdit = !this.env.inDialog;
        super.setup();  // Use 'super.setup()' instead of 'this._super()'
    },


    async edit() {
        await this.model.root.switchMode("edit");
    },

    async saveButtonClicked(params = {}) {
        let saved = await super.saveButtonClicked();  // Use 'super.saveButtonClicked()'
        if (saved) {
            if (!this.env.inDialog) {
                await this.model.root.switchMode("readonly");
            } else {
                await this.model.actionService.doAction({ type: 'ir.actions.act_window_close' });
            }
        }
        return saved;
    },

    async discard() {
        await super.discard();  // Use 'super.discard()'
        if (!this.env.inDialog) {
            await this.model.root.switchMode("readonly");
        } else {
            this.model.actionService.doAction({ type: 'ir.actions.act_window_close' });
        }
    },

    async beforeLeave() {
        if (this.model.root.dirty) {
            // Fetch the record data and its original state
            const currentData = this.model.root.data;
            const initialData = this.model.root._values;
            const fieldMapping = this.model.root.fields;

            console.log(initialData)
            console.log(currentData)
            // Collect the dirty fields and their previous and current values
            const changes = [];
            for (const fieldName in currentData) {
                if (currentData[fieldName] !== initialData[fieldName]) {
                    changes.push({
                        fieldName: fieldMapping[fieldName].string,
                        previousValue: initialData[fieldName] !== undefined ? initialData[fieldName] : "N/A",
                        newValue: currentData[fieldName] !== undefined ? currentData[fieldName] : "N/A"
                    });
                }
            }
            // Prepare a message listing the changes
            let changesMessage = "You have made the following changes:\n\n";
            changes.forEach(change => {
                changesMessage += `${change.fieldName}: ${change.previousValue} -> ${change.newValue}\n`;
            });
            changesMessage += '\nPress OK to automatically save these changes.'

            // Show the list of changes in the confirmation dialog
            const userConfirmed = confirm(changesMessage);

            if (userConfirmed) {
                // If the user confirms, save the record
                return this.model.root.save({ noReload: true, stayInEdition: true });
            } else {
                // If the user cancels, discard the changes
                this.model.root.discard();
                return true;
            }
        }
    }
});