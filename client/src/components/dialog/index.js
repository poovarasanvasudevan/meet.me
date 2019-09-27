import React from 'react';

import {Dialog, DialogType, DialogFooter} from 'office-ui-fabric-react/lib/Dialog';
import {PrimaryButton, DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {useBaseStateValue} from "../context";

export default function (props) {

    const [{model}, dispatch] = useBaseStateValue();

    const closeModel = () => {
        dispatch({
            type: 'model',
            model: false
        });
    };

    return (<div>
        <Dialog
            hidden={!model}
            onDismiss={closeModel}
            dialogContentProps={{
                type: DialogType.normal,
                title: 'Missing Subject',
                subText: 'Do you want to send this message without a subject?'
            }}
            modalProps={{
                isBlocking: true,
                styles: {main: {maxWidth: 450}}
            }}
        >
            <DialogFooter>
                <PrimaryButton onClick={closeModel} text="Send"/>
                <DefaultButton onClick={closeModel} text="Don't send"/>
            </DialogFooter>
        </Dialog>
    </div>);
}
