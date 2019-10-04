import React from 'react';
import {Editor, WithEditorActions, EditorContext} from "@atlaskit/editor-core";
import BreadcrumbsMiscActions from "../../../../components/breadcrump-action";
import TitleInput from "../../../../components/title-input";
import {useStateValue} from "../util/context";
import {ButtonGroup} from "@atlaskit/button";
import {DefaultButton, PrimaryButton} from "office-ui-fabric-react";
import {MLink} from "../../../../components/theme/link";

export default function (props) {

    const [{appearence, formValues, post,title}, dispatch] = useStateValue();

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

    const EditorWrapper = ({action}) => {
        return (
            <Editor
                allowBlockTypes={{ exclude: ["codeBlocks"] }}
                allowTextColor={true}
                allowTables={{
                    advanced: true,
                    allowMergeCells: true,
                    allowControls: true,
                    allowColumnResizing: true,
                    allowBackgroundColor: true
                }}
                //allowCodeBlocks={true}
                allowBreakout={true}
                allowPanel={true}
                allowExtension={{
                    allowBreakout: true,
                }}
                allowRule={true}
                allowDate={true}
                //allowLists={true}
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
               // allowHelpDialog
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
                                    <BreadcrumbsMiscActions title={title}/>
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

                appearance={appearence}
            />
        );
    };

    return (
        <EditorContext>
            <WithEditorActions
                render={actions => <EditorWrapper action={actions}/>}
            />
        </EditorContext>
    );
}
