import React from 'react';
import {BreadcrumbsItem, BreadcrumbsStateless} from "@atlaskit/breadcrumbs";
import {RouterLink} from "../../components/theme/link";
import Page from "@atlaskit/page";
import {Box} from "@rebass/grid";
import PageHeader from '@atlaskit/page-header';
import Button, {ButtonGroup} from "@atlaskit/button";
import {MLink} from "../../components/theme/link";
import {PrimaryButton} from 'office-ui-fabric-react';
import {IconButton, IIconProps} from 'office-ui-fabric-react';

import {
    DetailsList,
    DetailsListLayoutMode,
    SelectionMode,
} from 'office-ui-fabric-react/lib/DetailsList';

import {mergeStyleSets} from 'office-ui-fabric-react/lib/Styling';
import styled from "styled-components";
import {useBaseStateValue} from "../../components/context";

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


const actions = (
    <ButtonGroup>
        <MLink to={'/blog/new'}>
            <PrimaryButton text="New Post"/>
        </MLink>
    </ButtonGroup>

);

const classNames = mergeStyleSets({
    defaultCell: {
        display: 'flex !important',
        alignItems: 'center',
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

    const deleteBlogPost = () => {
        dispatch({type: 'model', model: true});
    };

    const columns = [
        {
            key: 'column1',
            name: 'File Type',
            className: classNames.defaultCell,
            iconClassName: classNames.fileIconHeaderIcon,
            ariaLabel: 'Column operations for File type, Press to sort on File type',
            iconName: 'Page',
            isIconOnly: true,
            fieldName: 'name',
            minWidth: 16,
            maxWidth: 16,

            onRender: (item) => {
                return <img src={item.iconName} className={classNames.fileIconImg} alt={item.fileType + ' file icon'}/>;
            }
        },
        {
            key: 'column2',
            name: 'Post Title',
            fieldName: 'name',
            minWidth: 210,
            maxWidth: 350,
            className: classNames.defaultCell,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            data: 'string',
            isPadded: true
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
                return <span>{item.dateModified}</span>;
            },
            isPadded: true
        },
        {
            key: 'column3',
            name: 'Date Published',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{item.dateModified}</span>;
            },
            isPadded: true
        },
        {
            key: 'column3',
            name: 'Date Modified',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{item.dateModified}</span>;
            },
            isPadded: true
        },
        {
            key: 'column3',
            name: 'Likes / Reaction',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{item.dateModified}</span>;
            },
            isPadded: true
        },
        {
            key: 'column3',
            name: 'Comments',
            fieldName: 'dateModifiedValue',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,

            data: 'number',
            onRender: (item) => {
                return <span>{item.dateModified}</span>;
            },
            isPadded: true
        },
        {
            key: 'column4',
            name: 'Modified By',
            fieldName: 'modifiedBy',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 90,
            isResizable: true,
            isCollapsible: true,
            data: 'string',

            onRender: (item) => {
                return <span>{item.modifiedBy}</span>;
            },
            isPadded: true
        },
        {
            key: 'column5',
            name: 'Total Read / Views',
            fieldName: 'fileSizeRaw',
            className: classNames.defaultCell,
            minWidth: 70,
            maxWidth: 120,
            isResizable: true,
            isCollapsible: true,
            data: 'number',

            onRender: (item) => {
                return <span>{item.fileSize}</span>;
            }
        },
        {
            key: 'column5',
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
        return item.key;
    };


    function _generateDocuments() {
        const items = [];
        for (let i = 0; i < 10; i++) {
            const randomDate = _randomDate(new Date(2012, 0, 1), new Date());
            const randomFileSize = _randomFileSize();
            const randomFileType = _randomFileIcon();
            let fileName = "test";
            fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1).concat(`.${randomFileType.docType}`);
            let userName = "test users";
            userName = userName
                .split(' ')
                .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                .join(' ');
            items.push({
                key: i.toString(),
                name: fileName,
                value: fileName,
                iconName: randomFileType.url,
                fileType: randomFileType.docType,
                modifiedBy: userName,
                dateModified: randomDate.dateFormatted,
                dateModifiedValue: randomDate.value,
                fileSize: randomFileSize.value,
                fileSizeRaw: randomFileSize.rawSize
            });
        }
        return items;
    }

    function _randomDate(start, end) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return {
            value: date.valueOf(),
            dateFormatted: date.toLocaleDateString()
        };
    }

    const FILE_ICONS = [
        {name: 'accdb'},
        {name: 'csv'},
        {name: 'docx'},
        {name: 'dotx'},
        {name: 'mpt'},
        {name: 'odt'},
        {name: 'one'},
        {name: 'onepkg'},
        {name: 'onetoc'},
        {name: 'pptx'},
        {name: 'pub'},
        {name: 'vsdx'},
        {name: 'xls'},
        {name: 'xlsx'},
        {name: 'xsn'}
    ];

    function _randomFileIcon() {
        const docType = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
        return {
            docType,
            url: `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${docType}_16x1.svg`
        };
    }

    function _randomFileSize() {
        const fileSize = Math.floor(Math.random() * 100) + 30;
        return {
            value: `${fileSize} KB`,
            rawSize: fileSize
        };
    }

    const items = _generateDocuments();

    console.log(items);
    return (
        <FullPage>
            <Header>
                <PageHeader breadcrumbs={breadcrumbs} actions={actions}>
                    Blog , Comments and Likes
                </PageHeader>
            </Header>
            <Body>
            <DetailsList
                items={items}
                compact={true}
                columns={columns}
                selectionMode={SelectionMode.none}
                getKey={_getKey}
                setKey="none"
                usePageCache={true}
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
            />
            </Body>
        </FullPage>
    );
}
