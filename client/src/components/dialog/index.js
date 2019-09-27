import React from 'react';

import {Dialog, DialogType, DialogFooter} from 'office-ui-fabric-react/lib/Dialog';
import {PrimaryButton, DefaultButton} from 'office-ui-fabric-react/lib/Button';
import {useBaseStateValue} from "../context";

export default function (props) {

    const [{model, modelData}, dispatch] = useBaseStateValue();

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
                title: modelData.title || '',
                subText: modelData.description || ''
            }}
            modalProps={{
                isBlocking: modelData.block || false,
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
