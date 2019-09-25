import React from 'react';
import {Box} from "@rebass/grid";
import {Editor, WithEditorActions} from '@atlaskit/editor-core';
import Button, {ButtonGroup} from "@atlaskit/button";
import KBModel from '../../../components/kb-model';
import {TitleInput} from '../../../components/title-input';
import BreadcrumbsMiscActions from '../../../components/breadcrump-action';
import './index.css';

export default function (props) {


    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(null);
    const [formData, setFormData] = React.useState(null);

    const saveArticle = () => {
        if (formData == null) {
            setOpen(true);
        } else {
            console.log(formData);
        }
    };
    const SaveAndCancelButtons = (props) => (
        <ButtonGroup minimal>
            <Button icon="cog" onClick={() => setOpen(true)}>Settings</Button>
            <Button icon={'saved'} onClick={saveArticle}>Save</Button>
        </ButtonGroup>
    );

    const FormSubmit = (data) => {
        setFormData(data);
        setOpen(false);
    };

    return (

        <Box width={12 / 12}>

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
                                    setTitle(e.target.value);
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
                appearance="full-width"
            />

            <KBModel close={() => {
                setOpen(false);
            }} open={open} formSubmit={FormSubmit} title={title}/>

        </Box>

    );
}
