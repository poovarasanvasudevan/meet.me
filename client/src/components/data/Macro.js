import {
    MacroProvider,
    MacroAttributes,
    ExtensionType,
} from '@atlaskit/editor-core';


export const inlineExtensionData = [
    {
        type: 'inlineExtension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: 'status',
            parameters: {
                macroParams: {
                    color: { value: 'Green' },
                    title: { value: 'OK' },
                    subtle: { value: true },
                },
                macroMetadata: {
                    macroId: { value: new Date().valueOf() },
                    schemaVersion: { value: '1' },
                    placeholder: [
                        {
                            data: {
                                width: 274,
                                height: 30,
                                url:
                                    '//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e3N0YXR1czpzdWJ0bGU9dHJ1ZXxjb2xvdXI9R3JlZW58dGl0bGU9T0t9&locale=en_GB&version=2',
                            },
                            type: 'image',
                        },
                    ],
                },
            },
        },
    },
    {
        type: 'inlineExtension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: 'status',
            parameters: {
                macroParams: {
                    color: { value: 'Red' },
                    title: { value: 'Fail' },
                    subtle: { value: true },
                },
                macroMetadata: {
                    macroId: { value: new Date().valueOf() },
                    schemaVersion: { value: '1' },
                    placeholder: [
                        {
                            data: { url: '' },
                            type: 'icon',
                        },
                    ],
                },
            },
        },
    },
    {
        type: 'inlineExtension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: 'status',
            parameters: {
                macroParams: {
                    color: { value: 'Gray' },
                    title: { value: 'Medium' },
                    subtle: { value: true },
                },
                macroMetadata: {
                    macroId: { value: new Date().valueOf() },
                    placeholder: [
                        {
                            data: {
                                url:
                                    '//pug.jira-dev.com/wiki/download/resources/com.poovarasan.plugins.status-macro/images/status-icon.png',
                            },
                            type: 'icon',
                        },
                    ],
                },
            },
        },
    },
];

export const extensionData = [
    {
        type: 'extension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: 'gallery',
            parameters: {
                macroParams: {
                    color: { value: 'Red' },
                },
                macroMetadata: {
                    macroId: { value: new Date().valueOf() },
                    schemaVersion: { value: '1' },
                    placeholder: [
                        {
                            data: {
                                url:
                                    '//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e2dhbGxlcnl9&locale=en_GB&version=2',
                            },
                            type: 'image',
                        },
                    ],
                },
            },
        },
    },
    {
        type: 'extension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: 'gallery',
            parameters: {
                macroParams: {
                    color: { value: 'Yellow' },
                },
                macroMetadata: {
                    macroId: { value: new Date().valueOf() },
                    schemaVersion: { value: '1' },
                    placeholder: [
                        {
                            data: { url: '' },
                            type: 'icon',
                        },
                    ],
                },
            },
        },
    },
];

export const bodiedExtensionData = [
    {
        type: 'bodiedExtension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: 'expand',
            layout: 'default',
            parameters: {
                macroMetadata: {
                    macroId: { value: new Date().valueOf() },
                    schemaVersion: { value: '2' },

                },
            },
        },
        content: [
            {
                type: 'heading',
                content: [
                    {
                        type: 'text',
                        text: 'Heading',
                    },
                ],
                attrs: {
                    level: 5,
                },
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'Foo',
                        marks: [
                            {
                                type: 'underline',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        type: 'bodiedExtension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: 'expand',
            layout: 'default',
            parameters: {
                macroMetadata: {
                    macroId: { value: new Date().valueOf() },
                    schemaVersion: { value: '1' },
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
                type: 'heading',
                content: [
                    {
                        type: 'text',
                        text: 'Heading',
                    },
                ],
                attrs: {
                    level: 5,
                },
            },
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: 'Foo',
                        marks: [
                            {
                                type: 'underline',
                            },
                        ],
                    },
                    {
                        type: 'text',
                        text: ' ',
                    },
                    {
                        type: 'inlineExtension',
                        attrs: {
                            extensionType: 'com.poovarasan.macro.core',
                            extensionKey: 'status',
                            parameters: {
                                macroParams: {
                                    color: { value: 'Green' },
                                    title: { value: 'OK' },
                                    subtle: { value: true },
                                },
                                macroMetadata: {
                                    macroId: { value: new Date().valueOf() },
                                    schemaVersion: { value: '1' },
                                    placeholder: [
                                        {
                                            data: {
                                                url:
                                                    '//pug.jira-dev.com/wiki/plugins/servlet/confluence/placeholder/macro?definition=e3N0YXR1czpzdWJ0bGU9dHJ1ZXxjb2xvdXI9R3JlZW58dGl0bGU9T0t9&locale=en_GB&version=2',
                                            },
                                            type: 'image',
                                        },
                                    ],
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
];


const getMacroADFNode = (
    macroName: string,
    macroParams: any,
): MacroAttributes => {
    return {
        type: 'inlineExtension',
        attrs: {
            extensionType: 'com.poovarasan.macro.core',
            extensionKey: macroName,
            parameters: {
                macroParams,
                macroMetadata: {
                    macroId: { value: 12345 },
                    placeholder: [
                        {
                            data: { url: '' },
                            type: 'icon',
                        },
                    ],
                },
            },
        },
    };
};


export class MockMacroProvider implements MacroProvider {
    config = {};
    mockExtensionData: any;

    constructor(mockExtensionData: any) {
        this.mockExtensionData = mockExtensionData;
    }

    openMacroBrowser(_macroNode?: PmNode): Promise<MacroAttributes> {
        return Promise.resolve(this.mockExtensionData);
    }

    autoConvert(link: String): MacroAttributes | null {
        if (link.match('https://jdog.jira-dev.com/browse')) {
            return getMacroADFNode('jira', {
                paramA: { value: link },
            });
        }

        switch (link) {
            case 'http://www.dumbmacro.com?paramA=CFE':
            case 'https://www.dumbmacro.com?paramA=CFE':
            case 'www.dumbmacro.com?paramA=CFE':
                return getMacroADFNode('dumbMacro', {
                    paramA: { value: 'CFE' },
                });
            case 'http://www.smartmacro.com?paramB=CFE':
            case 'https://www.smartmacro.com?paramB=CFE':
            case 'www.smartmacro.com?paramB=CFE':
                return getMacroADFNode('smartMacro', {
                    paramB: { value: 'CFE' },
                });
            default:
                return null;
        }
    }
}

export const macroProvider = new MockMacroProvider(bodiedExtensionData[0]);

