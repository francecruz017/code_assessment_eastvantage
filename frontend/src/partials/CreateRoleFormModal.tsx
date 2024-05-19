import React, { useState } from 'react';
import { Button, Modal, Form, FormGroup, FormControl, FormLabel, FormCheck, Alert } from 'react-bootstrap';
import { Role, RoleFormData } from '../interfaces';
import api from '../api';

interface CreateRoleFormModalProps {
    showModal: boolean;
    handleCloseModal: () => void;
    addRoleToList: (role: Role) => void;
}

const CreateRoleFormModal = ({
    showModal,
    handleCloseModal,
    addRoleToList,
}: CreateRoleFormModalProps) => {
    const defaultNewRoleValues = {
        name: '',
    };

    const [responseMessage, setResponseMessage] = useState<string>('');
    const [enableSubmit, setEnableSubmit] = useState<boolean>(true);

    const [newRole, setNewRole] = useState<RoleFormData>(defaultNewRoleValues);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setEnableSubmit(false);

        api.post('/roles', newRole)
            .then(res => {
                addRoleToList({
                    id: res.data.role.id,
                    name: res.data.role.name,
                });

                handleCloseModal();
                setResponseMessage('');
            })
            .catch(err => {
                const errors = err.response.data.errors;
                const firstErrorMessage = errors[Object.keys(errors)[0]][0];

                setResponseMessage(firstErrorMessage);
            })
            .finally(() => setEnableSubmit(true));
    };

    const handleAlertClose = () => {
        setResponseMessage('');
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setNewRole({ name: value });
    };

    const onHideModal = () => {
        setNewRole(defaultNewRoleValues);
        handleCloseModal();
        setResponseMessage('');
    }

    return (
        <Modal show={showModal} onHide={onHideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {
                    responseMessage && (
                        <div className='margin-top'>
                            <Alert variant='danger' onClose={handleAlertClose} dismissible>
                                <p>{responseMessage}</p>
                            </Alert>
                        </div>
                    )
                }

                <Form onSubmit={handleSubmit}>
                    <FormGroup controlId='name'>
                        <FormLabel>Role Name *</FormLabel>
                        <FormControl
                            type='text'
                            name='name'
                            value={newRole.name}
                            onChange={handleNameChange}
                            pattern='^[a-zA-Z ]*$'
                            required
                        />
                    </FormGroup>

                    <Button variant='primary' type='submit' style={{ marginTop: '10px' }} disabled={!enableSubmit}>
                        Create Role
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateRoleFormModal;