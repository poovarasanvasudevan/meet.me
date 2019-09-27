import React from 'react';
import {BreadcrumbsItem, BreadcrumbsStateless} from "@atlaskit/breadcrumbs";
import {RouterLink} from "../../components/theme/link";
import PageHeader from '@atlaskit/page-header';
import Button, {ButtonGroup} from "@atlaskit/button";
import {MLink} from "../../components/theme/link";
import {PrimaryButton, DefaultButton} from 'office-ui-fabric-react';
import {IconButton, IIconProps} from 'office-ui-fabric-react';

import {ShimmeredDetailsList} from 'office-ui-fabric-react/lib/ShimmeredDetailsList';

import {
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';

import {mergeStyleSets} from 'office-ui-fabric-react/lib/Styling';
import styled from "styled-components";
import {useBaseStateValue} from "../../components/context";
import AppContext from "../../module/AppContext";
import moment from 'moment';

const FullPage = styled.div`
    display : flex;
    flex-direction : column;
    height: 100%;
    width:100%;
`;

const Header = styled.div`
    flex: 0 0 auto;
    padding-left : 18px;
    padding-right : 18px;
`;
const Body = styled.div`
    flex: 1 1 auto; 
    position: relative;
    overflow-y: auto;
    padding-left : 10px;
    
    &::-webkit-scrollbar-track
    {
        background-color: #F5F5F5;
    }
        
    &::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
        border: 1px solid #000;
    }
        
    &::-webkit-scrollbar-thumb
    {
        background-color: #cccccc;
    }
`;
const breadcrumbs = (
    <BreadcrumbsStateless onExpand={() => {
    }}>
        <BreadcrumbsItem text="Home" key="home" component={RouterLink} href={'/home'}/>
        <BreadcrumbsItem text="Blog" key="Blog" component={RouterLink} href={'#'}/>
    </BreadcrumbsStateless>
);


const classNames = mergeStyleSets({
    defaultCell: {
        display: 'flex !important',
        alignItems: 'center',
        fontSize: '14px',
        '&:before': {
            display: 'flex',
        }
    },
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px'
    },
    fileIconCell: {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        selectors: {
            '&:before': {
                content: '.',

                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden'
            }
        }
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px'
    },

});

export default function (props) {

    const [{model}, dispatch] = useBaseStateValue();
    const [blogPost, setBlogPost] = React.useState([]);
    const [blogPostLoader, setBlogPostLoader] = React.useState(true);
    const {Parse} = React.useContext(AppContext);

    React.useEffect(() => {
        reloadGrid();
    }, []);


    const reloadGrid = () => {
        setBlogPostLoader(true);
        const BlogPost = Parse.Object.extend("BlogPost");
        const blogPostQuery = new Parse.Query(BlogPost);
        blogPostQuery.equalTo('user', Parse.User.current());
        blogPostQuery.find()
            .then((data) => {
                setBlogPost(JSON.parse(JSON.stringify(data)));
                setBlogPostLoader(false);
            });
    };

    const deleteBlogPost = () => {
        dispatch({
            type: 'model',
            model: true,
            modelData: {
                title: 'Are you sure',
                description: "You want to delete the article"
            }
        });
    };

    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY');
    };

    const actions = (
        <ButtonGroup>
            <DefaultButton iconProps={{
                iconName: 'Refresh'
            }} text={'Refresh'} onClick={reloadGrid}/>
            <MLink to={'/blog/new'}>
                <PrimaryButton text="New Post"/>

            </MLink>
        </ButtonGroup>
    );


    const columns = [
        {
            key: 'column2',
            name: 'Post Title',
            fieldName: 'name',
            minWidth: 210,
            maxWidth: 350,
            className: classNames.defaultCell,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            data: 'string',
            isPadded: true,
            onRender: (item) => {
                return <span>{item.title}</span>;
            },
        },
        {
            key: 'column3',
            name: 'Date Created',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{formatDate(item.createdAt)}</span>;
            },
            isPadded: true
        },
        {
            key: 'column4',
            name: 'Date Published',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{formatDate(item.published_date) || ''}</span>;
            },
            isPadded: true
        },
        {
            key: 'column5',
            name: 'Date Modified',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{formatDate(item.updatedAt) || ''}</span>;
            },
            isPadded: true
        },
        {
            key: 'column6',
            name: 'Likes / Reaction',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>0</span>;
            },
            isPadded: true
        },
        {
            key: 'column7',
            name: 'Comments',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{item.description || ''}</span>;
            },
            isPadded: true
        },
        {
            key: 'column8',
            name: 'Modified By',
            fieldName: 'modifiedBy',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 130,
            isResizable: true,
            isCollapsible: true,
            data: 'string',

            onRender: (item) => {
                return <span>{item.user.first_name + ' ' + item.user.last_name}</span>;
            },
            isPadded: true
        },
        {
            key: 'column9',
            name: 'Total Read / Views',
            fieldName: 'fileSizeRaw',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 120,
            isResizable: true,
            isCollapsible: true,
            data: 'number',

            onRender: (item) => {
                return <span>0</span>;
            }
        },
        {
            key: 'column10',
            name: 'Action',
            fieldName: 'fileSizeRaw',
            minWidth: 70,
            className: classNames.defaultCell,
            maxWidth: 90,
            isResizable: true,
            isCollapsible: true,
            data: 'number',

            onRender: (item) => {
                return (
                    <span>
                        <IconButton iconProps={{iconName: 'Edit'}} title="Edit"/>
                        <IconButton iconProps={{iconName: 'Lock'}} title="Lock"/>
                        <IconButton iconProps={{iconName: 'Delete'}} color={'red'} title="Delete"
                                    onClick={deleteBlogPost}/>
                    </span>
                );
            }
        }
    ];


    const _getKey = (item, index) => {
        return item.objectId || new Date().valueOf();
    };


    return (
        <FullPage>
            <Header>
                <PageHeader breadcrumbs={breadcrumbs} actions={actions}>
                    Blog , Comments and Likes
                </PageHeader>
            </Header>
            <Body>
            <ShimmeredDetailsList
                items={blogPost}
                compact={true}
                columns={columns}
                selectionMode={SelectionMode.none}
                setKey={'items'}
                listProps={{ renderedWindowsAhead: 0, renderedWindowsBehind: 0 }}
                enableShimmer={blogPostLoader}
            />
            </Body>
        </FullPage>
    );
}
