import styles from '../styles/Modal.module.css'

interface ModalProps {
    children: JSX.Element;
    show: boolean
    onClose: () => void,
    actionButtonText: string,
    formId: string,
}

export default function Modal(props: ModalProps) {
    if (false === props.show) {
        return null;
    }

    /* TODO: Blur the body background when the modal is open */

    return (
        <div className={ styles.modal } id="modal">
            <div className={ styles.content }>
                { props.children }
            </div>
            <div className={ styles.actions }>
                <button className={ styles.cancelButton } onClick={ props.onClose }>
                    Cancel
                </button>
                <button
                    className={ styles.toggleButton }
                    type={ "submit" }
                    form={ props.formId }
                >
                    { props.actionButtonText }
                </button>
            </div>
        </div>
    )
}
