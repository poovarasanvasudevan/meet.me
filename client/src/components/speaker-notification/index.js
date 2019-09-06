import React from 'react';
import Modal, {ModalTransition} from '@atlaskit/modal-dialog';

export default function (props) {

    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        setIsOpen(props.open);
    }, [props.open]);

    const closeDialog = () => {
        setIsOpen(false);
        props.close();
    };


    const actions = [
        {text: 'Close', onClick: closeDialog},
    ];
    return (
        <ModalTransition>
            {isOpen && (
                <Modal actions={actions} onClose={closeDialog} heading="Notifications">

                </Modal>
            )}
        </ModalTransition>
    );
}
