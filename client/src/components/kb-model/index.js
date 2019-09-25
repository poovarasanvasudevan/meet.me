import React from 'react';
import {Box, Flex} from "@rebass/grid";
import {Field} from "@atlaskit/form";
import {CreatableSelect} from "@atlaskit/select";
import ModalDialog, {ModalFooter, ModalTransition} from '@atlaskit/modal-dialog';
import styled from "styled-components";
import Textfield from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import Button from "@atlaskit/button";
import Form from '@atlaskit/form';
import FieldTextArea from '@atlaskit/field-text-area';


const MTextField = styled(Textfield)`

`;
const MSelectField = styled(Select)`

`;
export default function (props) {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(null);

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    React.useEffect(() => {
        setTitle(props.title);
    }, [props.title]);

    const close = () => {
        setOpen(false);
        props.close();
    };

    const footer = (props) => (
        <Flex>
            <Box p={1} width={12 / 12}>
                <ModalFooter showKeyline={props.showKeyline}>
                    <span/>
                    <div>
                        <Button type="button" onClick={close}>Close</Button>
                        &nbsp;
                        &nbsp;
                        <Button intent={'primary'} type="submit">Save</Button>
                    </div>
                </ModalFooter>
            </Box>
        </Flex>
    );

    const radioItems = [
        {name: 'color', value: 'red', label: 'Red'},
        {name: 'color', value: 'blue', label: 'Blue'},
        {name: 'color', value: 'yellow', label: 'Yellow'},
    ];
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
        console.log(JSON.stringify(data));
        if (props.formSubmit) {
            props.formSubmit(data);
        }
    };


    return (
        <ModalTransition>
            {open && (
                <ModalDialog
                    width={'large'}
                    scrollBehavior={'outside'}
                    autoFocus={false}
                    heading="Article Information"
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
                        <Box p={1} width={12 / 12}>
                            <Field label="Article Title" name="article_title" defaultValue={title || ""} isRequired={true}>
                                {({fieldProps}) => (
                                    <MTextField autoComplete={'off'}
                                                placeholder="Super doper article" {...fieldProps} />
                                )}
                            </Field>
                        </Box>
                        <Box p={1} width={4 / 12}>
                            <Field label="Article Status" name="article_status" isRequired={true}>
                                {({fieldProps}) => (
                                    <MSelectField
                                        menuPortalTarget={document.body}
                                        {...fieldProps}
                                        className="single-select"
                                        styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                                        classNamePrefix="react-select"
                                        options={[
                                            {label: 'New', value: 'adelaide'},
                                            {label: 'Draft', value: 'brisbane'},
                                            {label: 'Published', value: 'canberra'},
                                            {label: 'Reteried', value: 'darwin'},
                                        ]}
                                        placeholder="Article Status"
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box p={1} width={4 / 12}>
                            <Field label="Article Version" name="article_version" defaultValue={"1"}>
                                {({fieldProps}) => (
                                    <MTextField
                                        autoComplete="off"
                                        placeholder="1"
                                        {...fieldProps}
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box p={1} width={4 / 12}>
                            <Field label="Categories" name="categories" isRequired={true}>
                                {({fieldProps}) => (
                                    <MSelectField
                                        menuPortalTarget={document.body}
                                        {...fieldProps}
                                        className="single-select"
                                        styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                                        classNamePrefix="react-select"
                                        options={[
                                            {label: 'New', value: 'adelaide'},
                                            {label: 'Draft', value: 'brisbane'},
                                            {label: 'Published', value: 'canberra'},
                                            {label: 'Reteried', value: 'darwin'},
                                        ]}
                                        placeholder="Categories"
                                    />
                                )}
                            </Field>
                        </Box>
                        <Box p={1} width={12 / 12}>
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
                        <Box p={1} width={12 / 12}>

                            <FieldTextArea
                                label="Comments"
                                placeholder="Some comments...."
                                name={'comments'}
                                shouldFitContainer={true}
                            />

                        </Box>
                    </Flex>
                </ModalDialog>
            )}
        </ModalTransition>
    );
}
