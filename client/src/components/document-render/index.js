import React from 'react';

import {
    ReactRenderer
} from '@atlaskit/renderer';
import {resourceProvider} from '../../components/data/MentionResource'
import {extensionHandlers} from '../../components/data/Extension'

import {
    ProviderFactory,
} from '@atlaskit/editor-common';
import {getEmojiResource} from "../data/emoji/story-data";
import {storyContextIdentifierProviderFactory} from "../data/ContextIdentifier";
import {autoformattingProvider} from "../data/AutoFormat";

const providerFactory = ProviderFactory.create({
    resourceProvider,
    emojiProvider: getEmojiResource({}),
    contextIdentifierProvider: storyContextIdentifierProviderFactory(),
    autoformattingProvider: Promise.resolve(autoformattingProvider),
});

export default function (props) {
    return (
        <div>
            <ReactRenderer
                document={props.doc || {
                    version: 1,
                    type: 'doc',
                    content: [],
                }}
                extensionHandlers={extensionHandlers}
                dataProviders={providerFactory}
                adfStage="stage0"
                appearance={'full-width'}
            />
        </div>
    );
}
