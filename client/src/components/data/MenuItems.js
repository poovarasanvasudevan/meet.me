import * as React from 'react';
import { bodiedExtensionData } from './Macro';
import DevIcon from '@atlaskit/icon/glyph/editor/code';


interface EditorActions {
    replaceDocument: (input: any) => void;
    replaceSelection: (input: any) => void;
    appendText: (input: string) => void;
}


function buildFileSelector(){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
}

export const customInsertMenuItems = [
    {
        content: 'Import',
        value: { name: 'import' },
        tooltipDescription: 'import',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="dev" />,
        onClick: async (editorActions: EditorActions) => {
            var fileSelector = buildFileSelector();
            // const input = prompt('Import from?');
            // if (input !== null) {
            //     editorActions.replaceDocument(input);
            // }
            fileSelector.click()
        },
    },
    {
        content: 'Inline macro (EH)',
        value: { name: 'inline-eh' },
        tooltipDescription: 'Inline macro (Using extension handlers)',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="Inline macro (EH)" />,
        onClick: function(editorActions: EditorActions) {
            editorActions.replaceSelection({
                type: 'inlineExtension',
                attrs: {
                    extensionType: 'com.poovarasan.macro.core',
                    extensionKey: 'inline-eh',
                    text: 'Inline extension demo',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
            });
        },
    },
    {
        content: 'Block macro (EH)',
        value: { name: 'block-eh' },
        tooltipDescription: 'Block macro (Using extension handlers)',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="Block macro (EH)" />,
        className: 'block-macro',
        onClick: function(editorActions: EditorActions) {
            editorActions.replaceSelection({
                type: 'extension',
                attrs: {
                    extensionType: 'com.poovarasan.macro.core',
                    extensionKey: 'block-eh',
                    text: 'Block extension demo',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
            });
        },
    },
    {
        content: 'Bodied macro (EH)',
        value: { name: 'bodied-eh' },
        tooltipDescription: 'Bodied macro (Using extension handlers)',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="Bodied macro (EH)" />,
        className: 'bodied-macro',
        onClick: function(editorActions: EditorActions) {
            editorActions.replaceSelection({
                type: 'bodiedExtension',
                attrs: {
                    extensionType: 'com.poovarasan.macro.core',
                    extensionKey: 'bodied-eh',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
                content: [
                    {
                        type: 'paragraph',
                        content: [],
                    },
                ],
            });
        },
    },
    {
        content: 'Bodied macro (NON-EH)',
        value: { name: 'bodied-non-eh' },
        tooltipDescription: 'Bodied macro',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="Bodied macro (NON-EH)" />,
        onClick: function(editorActions: EditorActions) {
            editorActions.replaceSelection({
                type: 'bodiedExtension',
                attrs: {
                    extensionType: 'com.poovarasan.macro.core',
                    extensionKey: 'bodied-non-eh',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            macroId: { value: new Date().valueOf() },
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
                content: [
                    {
                        type: 'paragraph',
                        content: [],
                    },
                ],
            });
        },
    },
    {
        content: 'Lorem ipsum',
        value: { name: 'lorem-ipsum' },
        tooltipDescription: 'Insert lorem ipsum text',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="dev" />,
        onClick: function(editorActions: EditorActions) {
            editorActions.appendText(
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi nisl, venenatis eget auctor vitae, venenatis quis lorem. Suspendisse maximus tortor vel dui tincidunt cursus. Vestibulum magna nibh, auctor non auctor id, finibus vitae orci. Nulla viverra ipsum et nunc fringilla ultricies. Pellentesque vitae felis molestie justo finibus accumsan. Suspendisse potenti. Nulla facilisi. Integer dignissim quis velit quis elementum. Sed sit amet varius ante. Duis vestibulum porta augue eu laoreet. Morbi id risus et augue sollicitudin aliquam. In et ligula dolor. Nam ac aliquet diam.',
            );
        },
    },
    {
        content: 'Info macro',
        value: { name: 'info' },
        tooltipDescription: 'Insert info macro',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="dev" />,
        onClick: function(editorActions: EditorActions) {
            editorActions.replaceSelection({
                type: 'inlineExtension',
                attrs: {
                    extensionType: 'com.poovarasan.macro.core',
                    extensionKey: 'info',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            macroId: { value: new Date().valueOf() },
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
            });
        },
    },
    {
        content: 'Table macro',
        value: { name: 'table' },
        tooltipDescription: 'Insert a Table macro',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="dev" />,
        onClick: function(editorActions: EditorActions) {

            editorActions.replaceSelection({
                type: 'extension',
                attrs: {
                    extensionType: 'com.poovarasan.macro.core',
                    extensionKey: 'jql-table',
                    text: 'Table extension demo',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
            });
        },
    },
    {
        content: 'Open macro browser',
        value: { name: 'macro-browser' },
        tooltipDescription: 'Open macro browser',
        tooltipPosition: 'right',
        elemBefore: <DevIcon label="dev" />,
        onClick: function(editorActions: EditorActions) {
            // eslint-disable-next-line no-console
            console.log(
                'Fake promise that simulates the macro browser opening. Will resolve in 1 sec with a selected macro to be inserted.',
            );

            const openMacroBrowser = new Promise(resolve => {
                window.setTimeout(() => {
                    resolve(bodiedExtensionData[0]);
                }, 1000);
            });

            openMacroBrowser.then(macro => editorActions.replaceSelection(macro));
        },
    },
];
