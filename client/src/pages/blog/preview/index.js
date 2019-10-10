import React from 'react';
import AppContext from "../../../module/AppContext";
import {If, Else, Then} from 'react-if';
import Page, {Grid, GridColumn} from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';
import {BreadcrumbsItem, BreadcrumbsStateless} from "@atlaskit/breadcrumbs";
import Avatar, {AvatarItem} from '@atlaskit/avatar';
import {Helmet} from "react-helmet";
import DocumentRender from '../../../components/document-render';
import queryString from 'query-string';
import {CommentLayout} from '@atlaskit/comment';
import {Editor} from '@atlaskit/editor-core';
import styled from 'styled-components';
import {Divider} from "../../../components/util";
import PageSpinner from '../../../components/page-spinner';
import DropdownMenu, {
    DropdownItemGroupRadio,
    DropdownItemRadio,
} from '@atlaskit/dropdown-menu';
import {IconButton} from 'office-ui-fabric-react';

import Button, {ButtonGroup} from '@atlaskit/button';
import TemplateRendering from '../../../components/template-rendering';

const CommentLayoutDiv = styled.div`
    margin-top : 40px;
`;

export default function (props) {

    const {Parse} = React.useContext(AppContext);
    const [blogPost, setBlogPost] = React.useState(null);
    const [template, setTemplate] = React.useState('');
    const [user, setUser] = React.useState(null);
    const [commentsEnabled, setCommentsEnabled] = React.useState("YES");
    const [loading, setLoading] = React.useState(false);
    const [rChange, setRChange] = React.useState(false);
    const [layout, setLayout] = React.useState("fixed");

    React.useEffect(() => {

        let params = queryString.parse(props.location.search);
        if (params['__t']) {
            setTemplate(params['__t']);
        }
        if (params['__c']) {
            setCommentsEnabled(params['__c']);
        }

        if (params['mode']) {
            if (params['mode'] === 'rchange') {
                setRChange(true);
            }
        }
        setLoading(true);


        var cuser = Parse.User.current();
        if (cuser != null) {
            const profile = cuser.get('profile');
            profile.fetch().then((data) => setUser(cuser));
        }


        var kbId = props.match.params.kb;
        const BlogPost = Parse.Object.extend("BlogPost");
        const blogPostQuery = new Parse.Query(BlogPost);
        blogPostQuery.include('user');
        blogPostQuery.include('user.profile');
        blogPostQuery
            .get(kbId)
            .then((data) => {
                setLoading(false);
                setBlogPost(data);
            })
            .catch((error) => {
                setLoading(false);
            });

        console.log(props);
    }, []);

    const breadcrumbs = (
        <BreadcrumbsStateless>
            <BreadcrumbsItem text="Home" key="home" href={'/home'}/>
            <BreadcrumbsItem text="Blog" key="Blog" href={'/blog'}/>
            <BreadcrumbsItem text={blogPost && blogPost.get('title')} key="kb" href={'#'}/>
        </BreadcrumbsStateless>
    );


    const actionsContent = (
        <ButtonGroup>
            <Button appearance="primary">Primary Action</Button>
            <Button>Default</Button>
            <Button>...</Button>
        </ButtonGroup>
    );


    const Action = styled.div`
        text-align : left !important;
    `;
    const action = (
        <ButtonGroup>
            <IconButton iconProps={{iconName: 'BackToWindow'}}
                        onClick={() => layout === "fixed" ? setLayout('fluid') : setLayout('fixed')}
                        title="Expand" ariaLabel="Expand"/>
            <Action>

                <DropdownMenu
                    trigger="Mode"
                    triggerType="button"
                    isCompact={true}
                    position={'bottom right'}
                    isMenuFixed
                    onOpenChange={e => console.log('dropdown opened', e)}
                >
                    <DropdownItemGroupRadio id="cities-aus" onChange={e => console.log(e)}>
                        <DropdownItemRadio defaultSelected={template === 'base'} onClick={() => setTemplate('base')} id="base">Base View</DropdownItemRadio>
                        <DropdownItemRadio defaultSelected={template === 'admin'} onClick={() => setTemplate('admin')} id="admin">Admin View</DropdownItemRadio>
                        <DropdownItemRadio defaultSelected={template === 'white'} onClick={() => setTemplate('white')} id="white">White View</DropdownItemRadio>
                        <DropdownItemRadio defaultSelected={template === 'none'} onClick={() => setTemplate('none')} id="none">No View</DropdownItemRadio>
                    </DropdownItemGroupRadio>
                </DropdownMenu>
            </Action>
        </ButtonGroup>
    );

    const MPageHeader = styled.div`
        width : 100%;
        
        & > div {
            width : 100%;
        }
    `;
    const PageData = () => {
        return (<Page>


            <Grid layout={layout} spacing={"comfortable"}>
                <MPageHeader>
                    <PageHeader breadcrumbs={breadcrumbs}
                                actions={rChange ? action : null}>
                        {blogPost && blogPost.get('title')}
                    </PageHeader>
                </MPageHeader>
                <Divider/>
                <If condition={!blogPost}>
                    <Then>
                        <If condition={loading}>
                            <Then>
                                <PageSpinner/>
                            </Then>
                            <Else>
                                No Article Found
                            </Else>
                        </If>

                    </Then>
                    <Else>
                        <Helmet>
                            <title>{blogPost && blogPost.get('title')}</title>
                            <meta name="description" content={blogPost && blogPost.get('title')}/>
                        </Helmet>


                        {/*<AvatarItem*/}
                        {/*avatar={*/}
                        {/*<Avatar*/}
                        {/*src={blogPost && blogPost.get('user').get('profile').get('avatar').url()}/>*/}
                        {/*}*/}
                        {/*primaryText={blogPost && blogPost.get('user').get('first_name') + " " + blogPost.get('user').get('last_name')}*/}
                        {/*secondaryText={blogPost && '@' + blogPost.get('user').get('username')}*/}
                        {/*/>*/}


                        <div style={{marginTop: '10px'}}>
                            <If condition={blogPost != null && blogPost.get('content') != null}>
                                <Then>
                                    <DocumentRender
                                        doc={blogPost && blogPost.get('content')}
                                    />


                                    <CommentEditor/>


                                </Then>
                                <Else>
                                    <DocumentRender
                                        doc={{
                                            version: 1,
                                            type: 'doc',
                                            content: [],
                                        }}
                                    />
                                    <CommentEditor/>
                                </Else>
                            </If>
                        </div>
                    </Else>
                </If>
            </Grid>
        </Page>);
    };


    const CommentEditor = () => {
        return (
            <If condition={user != null && commentsEnabled === 'YES'}>
                <Then>
                    <CommentLayoutDiv className={'comment-layout'}>
                        <Divider/>
                        <CommentLayout
                            avatar={
                                <Avatar src={user.get('profile').get('avatar').url()}
                                        label="User avatar"
                                        size="medium"/>
                            }
                            content={<Editor appearance="comment"/>}
                        />
                    </CommentLayoutDiv>
                </Then>
            </If>
        );
    };

    return (
        <TemplateRendering template={template}>
            <PageData/>
        </TemplateRendering>
    );
}
