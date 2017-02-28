(function () {
    CKEDITOR.plugins.add('footnotes', {
        requires: 'widget,dialog',
        icons: 'footnotes',
        init: function (editor) {

            CKEDITOR.dialog.add('footnotes', this.path + 'dialogs/footnotes.js');

            var deleteCommand = new CKEDITOR.command( editor, {
                            exec: function( editor ) {
                                var selection = editor.getSelection();
                                var selectedText = selection.getSelectedText();
                                var selectedElement = selection.getStartElement();
                                if (selectedElement) {
                                    selectedElement.remove();
                                }
                                editor.insertText(selectedText);
                            }
                        } );

            editor.addCommand('footnote', new CKEDITOR.dialogCommand('footnotes'));
            editor.addCommand('footnotedelete', deleteCommand);

            editor.ui.addButton('footnotes', {
                label: 'Footnotes',
                command: 'footnote',
                icon: this.path + 'icons/footnotes.png'
            });

            if ( editor.contextMenu ) {
                editor.addMenuGroup( 'footGroup' );

                editor.addMenuItem( 'footItem', {
                    label: 'Edit Footnote',
                    icon: this.path + 'icons/footnotes.png',
                    command: 'footnote',
                    group: 'footGroup'
                });

                editor.addMenuItem( 'footItemDelete', {
                                    label: 'Delete Footnote',
                                    icon: this.path + 'icons/footnotes.png',
                                    command: 'footnotedelete',
                                    group: 'footGroup'
                                });

                editor.contextMenu.addListener( function( element ) {
                    if ( element.getAscendant( 'span', true ) && element.$.className == 'js-footnote' ) {
                        return { footItem: CKEDITOR.TRISTATE_OFF, footItemDelete: CKEDITOR.TRISTATE_OFF };
                    }
                });
            }
        }
    });
})();
