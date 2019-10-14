import React from 'react';
import {Box} from "@rebass/grid";
import BlogModel from '../../../components/blog-model';
import './index.css';
import {EditorProvider} from "./util/context";
import CEditor from './component/editor';
import Embed from './component/embed';

import TemplateRendering from '../../../components/template-rendering';
import {useBaseStateValue} from "../../../components/context";

export default function (props) {

    const [{template}, dispatch] = useBaseStateValue();

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
            case 'editload':
                console.log(action);
                return {
                    ...state,
                    post: action.post,
                    title: action.title,
                    appearence: 'full-page',
                    formValues: action.formValues
                };
            default:
                return state;
        }
    };

    return (
        <TemplateRendering template={template}>
            <EditorProvider initialState={initialState} reducer={reducer}>
                <Embed state={props}>
                    <Box width={12 / 12} className={'h100'}>
                        <CEditor/>
                        <BlogModel/>
                    </Box>
                </Embed>
            </EditorProvider>
        </TemplateRendering>

    );
}
