import React from 'react';
import {Box} from "@rebass/grid";
import {Editor, WithEditorActions} from '@atlaskit/editor-core';
import Button, {ButtonGroup} from "@atlaskit/button";
import BlogModel from '../../../components/blog-model';
import {TitleInput} from '../../../components/title-input';
import BreadcrumbsMiscActions from '../../../components/breadcrump-action';
import './index.css';
import {DefaultButton, PrimaryButton} from 'office-ui-fabric-react';
import {EditorProvider, useStateValue} from "./util/context";
import CEditor from './component/editor';

export default function (props) {



    const initialState = {
        title: '',
        appearence: 'full-width',
        settings: false,
        formValues: {},
        locked: false
    };

    const reducer = (state, action) => {
        switch (action.type) {

            case 'appearence':
                return {
                    ...state,
                    appearence: state.appearence === 'full-width' ? 'full-page' : 'full-width'
                };

            case 'title' :
                return {
                    ...state,
                    title: action.title
                };
            case 'settings':
                return {
                    ...state,
                    settings: action.settings
                };
            case 'savearticle':
                return {
                    ...state,
                    formValues: action.formValues
                };
            case 'lock' :
                return {
                    ...state,
                    locked: action.locked
                };
            default:
                return state;
        }
    };

    return (
        <EditorProvider initialState={initialState} reducer={reducer}>
            <Box width={12 / 12}>

                <CEditor/>

                <BlogModel/>

            </Box>
        </EditorProvider>

    );
}
