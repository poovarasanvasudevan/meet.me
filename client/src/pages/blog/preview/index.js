import React from 'react';
import AppContext from "../../../module/AppContext";
import {If, Else, Then, Switch, Case, Default} from 'react-if';
import Page, {Grid, GridColumn} from '@atlaskit/page';
import PageHeader from '@atlaskit/page-header';
import {BreadcrumbsItem, BreadcrumbsStateless} from "@atlaskit/breadcrumbs";
import Avatar, {AvatarItem} from '@atlaskit/avatar';
import {Helmet} from "react-helmet";
import DocumentRender from '../../../components/document-render';
import queryString from 'query-string';
import BasePageTemplate from '../../../components/base-page-template';
import SkeletonV2 from "../../../components/SkeletonV2";
import {CommentLayout} from '@atlaskit/comment';
import {Editor} from '@atlaskit/editor-core';
import styled from 'styled-components';
import {Divider} from "../../../components/util";
import PageSpinner from '../../../components/page-spinner';

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

    React.useEffect(() => {

        let params = queryString.parse(props.location.search);
        if (params['__t']) {
            setTemplate(params['__t']);
        }
        if (params['__c']) {
            setCommentsEnabled(params['__c']);
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
                //data.get('user').get('profile').fetch();
                setLoading(false);
                setBlogPost(data);
                //console.log(JSON.stringify(data));
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

    const PageData = () => {
        return (<Grid layout={'fixed'} spacing={"comfortable"}>
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
                    <PageHeader breadcrumbs={breadcrumbs}>
                        {blogPost && blogPost.get('title')}
                    </PageHeader>

                    <AvatarItem
                        avatar={
                            <Avatar
                                src={blogPost && blogPost.get('user').get('profile').get('avatar').url()}/>
                        }
                        primaryText={blogPost && blogPost.get('user').get('first_name') + " " + blogPost.get('user').get('last_name')}
                        secondaryText={blogPost && '@' + blogPost.get('user').get('username')}
                    />

                    <div style={{marginTop: '32px'}}>
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
        </Grid>);
    };


    const CommentEditor = () => {
        return (
            <If condition={user != null && commentsEnabled === 'YES'}>
                <Then>
                    <CommentLayoutDiv className={'comment-layout'}>
                        <Divider/>
                        <CommentLayout
                            avatar={<Avatar src={user.get('profile').get('avatar').url()}
                                            label="User avatar"
                                            size="medium"/>}
                            content={<Editor appearance="comment"/>}
                        />
                    </CommentLayoutDiv>
                </Then>
            </If>
        );
    };

    return (
        <Switch>
            <Case condition={template === 'admin'}>
                <If condition={user !== null}>
                    <Then>
                        <SkeletonV2
                            containerNavigation={() => null}
                            productNavigation={() => null}
                            navWidth={0}>

                            <PageData/>

                        </SkeletonV2>

                    </Then>
                    <Else>
                        <PageData/>
                    </Else>
                </If>
            </Case>
            <Case condition={template === 'base'}>
                <BasePageTemplate>
                    <PageData/>
                </BasePageTemplate>
            </Case>
            <Default>
                <PageData/>
            </Default>
        </Switch>
    );
}
