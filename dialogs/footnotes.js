CKEDITOR.dialog.add('footnotes', function (editor) {
    return {
        title: 'Footnote Properties',
        minWidth: 400,
        minHeight: 200,
        resizable: true,
        contents: [
            {
                id: 'tab-footnote',
                elements: [
                    {
                        type: 'text',
                        id: 'text',
                        label: 'Text',
                        validate: CKEDITOR.dialog.validate.notEmpty("The text cannot be empty."),

                        setup: function(element) {
                          this.setValue(element.getText());
                        },

                        commit: function(element) {
                          element.setText(this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'footnote',
                        label: 'Footnote Text',
                        validate: CKEDITOR.dialog.validate.notEmpty("The footnote text cannot be empty."),

                        setup: function(element) {
                          this.setValue(element.getAttribute('data-text'));
                        },

                        commit: function(element) {
                          element.setAttribute('data-text', this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'link',
                        label: 'Link',

                        setup: function(element) {
                          this.setValue(element.getAttribute('data-link'));
                        },

                        commit: function(element) {
                          element.setAttribute('data-link', this.getValue());
                        }
                    }
                ],
            }
        ],
        onShow: function () {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            // Assume insert.
            var insertMode = true;
            // Get the class list.
            var classList = element.$.classList;

            // Loop the classes.
            for (var i = 0; i < classList.length; i++) {
                // Are we in a fucking js-footnote?
                if (classList[i] == "js-footnote") {
                    // Oh HELL NO!
                    insertMode = false;
                }
            }

            // What do we do now.
            if (insertMode) {
                // Make a new element.
                var newelement = editor.document.createElement('span');
                newelement.$.className = 'js-footnote';
                // replace.
                this.element = newelement;
                this.insertMode = true;
                this.setValueOf('tab-footnote', 'text', editor.getSelection().getSelectedText().toString());
            } else {
                // Old Dogs.
                this.insertMode = false;
                this.element = element;
                this.setupContent(this.element);
            }
        },
        onOk: function () {
            var dialog = this;
            var footnote = this.element;
            this.commitContent(footnote);

            if (this.insertMode) {
              editor.insertElement(footnote);
            }
        }
    }
});
