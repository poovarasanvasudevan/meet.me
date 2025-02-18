import React from 'react';
import {Editor, WithEditorActions, EditorContext} from "@atlaskit/editor-core";
import BreadcrumbsMiscActions from "../../../../components/breadcrump-action";
import TitleInput from "../../../../components/title-input";
import {useStateValue} from "../util/context";
import {ButtonGroup} from "@atlaskit/button";
import {DefaultButton, PrimaryButton} from "office-ui-fabric-react";
import {MLink} from "../../../../components/theme/link";

import {resourceProvider} from '../../../../components/data/MentionResource';
import {macroProvider} from '../../../../components/data/Macro';
import {extensionHandlers} from '../../../../components/data/Extension';
import {customInsertMenuItems} from '../../../../components/data/MenuItems';
import {getEmojiResource} from '../../../../components/data/emoji/story-data';
import {storyContextIdentifierProviderFactory} from '../../../../components/data/ContextIdentifier';
import AppContext from "../../../../module/AppContext";
import {autoformattingProvider} from "../../../../components/data/AutoFormat";

export default function (props) {

    const [{appearence, formValues, post, title}, dispatch] = useStateValue();
    const {Parse} = React.useContext(AppContext);
    React.useEffect(() => {

    }, [post]);


    const saveArticle = (props) => {
        if (!props.editorActions) {
            return;
        }

        props.editorActions.getValue().then(value => {
            console.log(value);
            dispatch({
                type: 'saveblog',
                post: value
            });
        });

        dispatch({
            type: 'settings',
            settings: true
        });

    };

    const SaveAndCancelButtons = (props) => (
        <ButtonGroup minimal>
            <MLink to={'/blog'}>
                <DefaultButton>Back</DefaultButton>
            </MLink>

            <PrimaryButton onClick={() => {
                saveArticle(props);
            }}>Save</PrimaryButton>
        </ButtonGroup>
    );

    const EditorWrapper = () => {
        return (
            <div></div>
        );
    };


    const providers = {
        mentionProvider: Promise.resolve(resourceProvider(Parse)),
        macroProvider: Promise.resolve(macroProvider),
        contextIdentifierProvider: storyContextIdentifierProviderFactory(),
        emojiProvider: getEmojiResource({}),
        autoformattingProvider: Promise.resolve(autoformattingProvider),
    };

    return (
        <Editor
            allowAnalyticsGASV3={true}
            allowTextColor={true}
            allowCodeBlocks={{enableKeybindingsForIDE: true}}
            allowTables={{
                advanced: true,
                allowMergeCells: true,
                allowControls: true,
                allowColumnResizing: true,
                allowBackgroundColor: true
            }}
            allowUnsupportedContent={true}
            allowBreakout={true}
            allowPanel={true}
            allowExtension={{
                allowBreakout: true,
            }}
            allowRule={true}
            allowDate={true}
            allowLists={true}
            allowLayouts={{
                allowBreakout: true,
                UNSAFE_addSidebarLayouts: true,
            }}
            allowTextAlignment={true}
            allowIndentation={true}
            defaultValue={post !== null ? post : undefined}

            allowDynamicTextSizing={true}
            allowTemplatePlaceholders={{allowInserting: true}}
            allowStatus={true}
            placeholder="Use markdown shortcuts to format your page as you type, like * for lists, # for headers, and *** for a horizontal rule."
            shouldFocus={false}
            allowHelpDialog
            media={{
                allowMediaSingle: true,
                allowResizing: true,
                allowAnnotation: true,
                allowLinking: true,
            }}
            contentComponents={
                <WithEditorActions
                    render={actions => {
                        return (
                            <>
                                <BreadcrumbsMiscActions/>
                                <TitleInput onChange={(e) => {
                                    dispatch({type: 'title', title: e.target.value});
                                }} placeholder={'Give this post a title...'}/>
                            </>);
                    }}
                />
            }
            secondaryToolbarComponents={<SaveAndCancelButtons/>}
            primaryToolbarComponents={[
                <WithEditorActions
                    key={1}
                    render={actions => (
                        <SaveAndCancelButtons editorActions={actions}/>
                    )}
                />,
            ]}
            {...providers}
            extensionHandlers={extensionHandlers}
            insertMenuItems={customInsertMenuItems}
            appearance={appearence}
        />
    );
}
