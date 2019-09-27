import React from 'react';
import {Box, Flex} from "@rebass/grid";
import {Field} from "@atlaskit/form";
import {CreatableSelect} from "@atlaskit/select";
import ModalDialog, {ModalFooter, ModalTransition} from '@atlaskit/modal-dialog';
import styled from "styled-components";
import Textfield from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import Form, {CheckboxField, Fieldset} from '@atlaskit/form';
import FieldTextArea from '@atlaskit/field-text-area';
import {DefaultButton, PrimaryButton} from 'office-ui-fabric-react';
import {Checkbox} from '@atlaskit/checkbox';
import {useStateValue} from "../../pages/blog/new/util/context";
import AppContext from "../../module/AppContext";

const MTextField = styled(Textfield)`

`;
const MSelectField = styled(Select)`

`;
export default function (props) {

    const [{appearence, title, settings, formValues}, dispatch] = useStateValue();
    const {Parse} = React.useContext(AppContext);
    const [status, setStatus] = React.useState([]);
    const [category, setCategory] = React.useState([]);

    const close = () => {
        dispatch({
            type: 'settings',
            settings: false
        });
    };


    React.useEffect(() => {
        const ListValues = Parse.Object.extend("ListValues");
        const listQuery = new Parse.Query(ListValues);
        listQuery.equalTo("group", 'BLOG_STATUS');
        listQuery.find().then((data) => setStatus(data.map((data) => ({
            label: data.get('value'),
            value: data.get('key')
        }))));

        const categoryQuery = new Parse.Query(ListValues);
        categoryQuery.equalTo("group", 'BLOG_CATEGORY');
        categoryQuery.find().then((data) => setCategory(data.map((data) => ({
            label: data.get('value'),
            value: data.get('key')
        }))));

    }, []);


    const footer = (props) => (
        <Flex>
            <Box p={'1px'} width={12 / 12}>
                <ModalFooter showKeyline={props.showKeyline}>
                    <span/>
                    <div>
                        <DefaultButton onClick={close}>Close</DefaultButton>
                        &nbsp;
                        &nbsp;
                        <PrimaryButton type="submit">Save</PrimaryButton>
                    </div>
                </ModalFooter>
            </Box>
        </Flex>
    );

    const mpOpetion = [
        {label: 'Adelaide', value: 'adelaide'},
        {label: 'Brisbane', value: 'brisbane'},
        {label: 'Canberra', value: 'canberra'},
        {label: 'Darwin', value: 'darwin'},
        {label: 'Hobart', value: 'hobart'},
        {label: 'Melbourne', value: 'melbourne'},
        {label: 'Perth', value: 'perth'},
        {label: 'Sydney', value: 'sydney'},
    ];
    const onFormSubmit = (data) => {

        /**
         * {"post_title":"hello","post_status":{"label":"New","value":"NEW"},"post_version":"1",
         * "categories":{"label":"Programming","value":"PROGRAMMING"},
         * "keywords":[{"label":"Melbourne","value":"melbourne"},{"label":"Brisbane","value":"brisbane"}],
         * "settings":["visibility","allow_comments","comments"]}
         * */
        var blogPost = null;
        if (formValues == null) {
            const BlogPost = Parse.Object.extend("BlogPost");
            blogPost = new BlogPost();
        } else {
            blogPost = formValues;
        }
        blogPost.set('title', data.post_title);
        blogPost.set('status', data.post_status.value);
        blogPost.set('version', parseInt(data.post_version));
        blogPost.set('categories', data.categories.value);
        blogPost.set('keywords', data.keywords.map((keyword) => keyword.value));
        blogPost.set('user', Parse.User.current());
        blogPost.set('description', data.comments || '');

        blogPost.save()
            .then((savedData) => {
                dispatch({
                    type: 'savearticle',
                    formValues: savedData
                });
                dispatch({
                    type: 'settings',
                    settings: false
                });

                console.log(JSON.stringify(savedData));
            });


    };


    return (
        <ModalTransition>
            {settings && (
                <ModalDialog
                    width={'large'}
                    scrollBehavior={'outside'}
                    autoFocus={false}
                    heading="Blog Post Information"
                    onClose={close || null}
                    shouldCloseOnOverlayClick={false}
                    components={{
                        Container: ({children, className}) => (
                            <Form onSubmit={onFormSubmit}>
                                {({formProps}) => (
                                    <form {...formProps} className={className}>
                                        {children}
                                    </form>
                                )}
                            </Form>
                        ),
                        Footer: footer,
                    }}>
                    <Flex flexWrap='wrap'>
                        <Box p={'1px'} width={12 / 12}>
                            <Field label="Post Title" name="post_title" defaultValue={title || ""} isRequired={true}>
                                {({fieldProps}) => (
                                    <MTextField autoComplete={'off'}
                                                placeholder="Super doper article" {...fieldProps} />
                                )}
                            </Field>
                        </Box>
                        <Box p={'1px'} width={4 / 12}>
                            <Field label="Post Status" name="post_status" isRequired={true}>
                                {({fieldProps}) => (
                                    <MSelectField
                                        menuPortalTarget={document.body}
                                        {...fieldProps}
                                        className="single-select"
                                        styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                                        classNamePrefix="react-select"
                                        options={status}
                                        placeholder="Status"
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box p={'1px'} width={4 / 12}>
                            <Field label="Post Version" name="post_version" defaultValue={"1"}>
                                {({fieldProps}) => (
                                    <MTextField
                                        autoComplete="off"
                                        placeholder="1"
                                        {...fieldProps}
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box p={'1px'} width={4 / 12}>
                            <Field label="Categories" name="categories" isRequired={true}>
                                {({fieldProps}) => (
                                    <MSelectField
                                        menuPortalTarget={document.body}
                                        {...fieldProps}
                                        className="single-select"
                                        styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                                        classNamePrefix="react-select"
                                        options={category}
                                        placeholder="Categories"
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box p={'1px'} width={12 / 12}>
                            <Field label="Keywords" name="keywords">
                                {({fieldProps}) => (
                                    <CreatableSelect
                                        isMulti
                                        {...fieldProps}
                                        isClearable
                                        options={mpOpetion}
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box p={'1px'} width={12 / 12}>

                            <FieldTextArea
                                label="Comments"
                                placeholder="Some comments...."
                                name={'comments'}
                                shouldFitContainer={true}
                            />

                        </Box>


                        <Box p={'1px'} width={12 / 12}>
                            <Fieldset legend="Post Settings / Privacy">

                                <Flex>
                                    <Box width={6 / 12}>
                                        <CheckboxField name="settings" value="visibility" defaultIsChecked={true}>
                                            {({fieldProps}) => <Checkbox {...fieldProps}
                                                                         label="Article Visible to Public"/>}
                                        </CheckboxField>

                                        <CheckboxField name="settings" value="allow_comments"
                                                       defaultIsChecked={true}>
                                            {({fieldProps}) => <Checkbox {...fieldProps}

                                                                         label="Allow Comments from users"/>}
                                        </CheckboxField>
                                    </Box>
                                    <Box width={6 / 12}>
                                        <CheckboxField name="settings" value="comments" defaultIsChecked={true}>
                                            {({fieldProps}) => <Checkbox {...fieldProps}
                                                                         label="Subscribe likes/comments via email"/>}
                                        </CheckboxField>
                                    </Box>
                                </Flex>
                            </Fieldset>
                        </Box>
                    </Flex>
                </ModalDialog>
            )}
        </ModalTransition>
    );
}
