import React from 'react';
import {Editor, WithEditorActions} from "@atlaskit/editor-core";
import BreadcrumbsMiscActions from "../../../../components/breadcrump-action";
import {TitleInput} from "../../../../components/title-input";
import {useStateValue} from "../util/context";
import {ButtonGroup} from "@atlaskit/button";
import {DefaultButton, PrimaryButton} from "office-ui-fabric-react";
import {MLink} from "../../../../components/theme/link";

export default function (props) {

    const [{appearence, title, formValues}, dispatch] = useStateValue();

    const saveArticle = (props) => {
        if (!props.editorActions) {
            return;
        }

        if (formValues == null) {

            props.editorActions.getValue().then(value => {
                console.log(value)
                dispatch({
                    type: 'saveblog',
                    post: value
                });
            });

            dispatch({
                type: 'settings',
                settings: true
            });
        } else {
            props.editorActions.getValue().then(value => {
                dispatch({
                    type: 'saveblog',
                    post: value
                });
            });
        }
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

    return (
        <Editor
            allowTextColor={true}
            allowTables={{
                advanced: true,
                allowMergeCells: true,
                allowControls: true,
                allowColumnResizing: true,
                allowBackgroundColor: true
            }}
            allowCodeBlocks={true}
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
                    render={actions => (
                        <>
                            <BreadcrumbsMiscActions title={title}/>
                            <TitleInput onChange={(e) => {
                                dispatch({type: 'title', title: e.target.value});
                            }} placeholder={'Give this post a title...'}/>
                        </>
                    )}
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
            appearance={appearence}
        />);
}
