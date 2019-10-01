import React from 'react';
import {Box} from "@rebass/grid";
import BlogModel from '../../../components/blog-model';
import './index.css';
import {EditorProvider, useStateValue} from "./util/context";
import CEditor from './component/editor';

export default function (props) {


    const initialState = {
        title: '',
        appearence: 'full-width',
        settings: false,
        formValues: null,
        locked: false,
        post: null
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
            case 'saveblog':
                return {
                    ...state,
                    post: action.post
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
