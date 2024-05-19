import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, FormGroup, FormControl, FormLabel, FormCheck, Alert } from 'react-bootstrap';
import { UserFormData, Role, UserListRecord } from '../interfaces';
import api from '../api';
import { rolesToString } from '../helpers';

interface CreateUserModalProps {
    showModal: boolean;
    roles: Role[];
    handleCloseModal: () => void;
    addNewUserToList: (newUser: UserListRecord) => void;
}

const CreateUserFormModal = ({
    showModal,
    roles,
    handleCloseModal,
    addNewUserToList,
}: CreateUserModalProps) => {

    const defaultcurrUserValues = {
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        roles: [],
    };

    const [responseMessage, setResponseMessage] = useState<string>('');

    const [currUser, setCurrUser] = useState<UserFormData>(defaultcurrUserValues);

    const [enableSubmit, setEnableSubmit] = useState<boolean>(true);

    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if ('' === currUser.middle_name) {
            delete currUser.middle_name;
        }

        setEnableSubmit(false);

        api.post('/users', currUser)
            .then(res => {
                addNewUserToList({
                    id: res.data.user.id,
                    first_name: res.data.user.first_name,
                    last_name: res.data.user.last_name,
                    middle_name: res.data.user.middle_name ?? '',
                    email: res.data.user.email,
                    roles: rolesToString(res.data.user.roles),
                });
                
                onHideModal();
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrUser({ ...currUser, [name]: value });
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        const selectedId = parseInt(value);

        setSelectedRoles((prevRoles) => {
            if (checked) {
                return [...prevRoles, selectedId];
            } else {
                return prevRoles.filter((roleId) => roleId !== selectedId);
            }
        });
    };

    useEffect(() => {
        if (selectedRoles.length !== 0 && currUser) {
            setCurrUser((prevUser) => ({ ...prevUser, roles: selectedRoles }));
        }
    }, [selectedRoles, currUser]);

    const onHideModal = () => {
        setCurrUser(defaultcurrUserValues);
        setSelectedRoles([]);
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
                    <FormGroup controlId='first_name'>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl
                            type='text'
                            name='first_name'
                            value={currUser.first_name}
                            onChange={handleInputChange}
                            pattern='^[a-zA-Z ]*$'
                            required
                        />
                    </FormGroup>

                    <FormGroup controlId='middle_name'>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl
                            type='text'
                            name='middle_name'
                            value={currUser.middle_name}
                            onChange={handleInputChange}
                            pattern='^[a-zA-Z ]*$'
                        />
                    </FormGroup>

                    <FormGroup controlId='last_name'>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl
                            type='text'
                            name='last_name'
                            value={currUser.last_name}
                            onChange={handleInputChange}
                            pattern='^[a-zA-Z ]*$'
                            required
                        />
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <FormLabel>Email *</FormLabel>
                        <FormControl
                            type='email'
                            name='email'
                            value={currUser.email}
                            onChange={handleInputChange}
                            required
                        />
                    </FormGroup>

                    <FormGroup controlId='roles'>
                        <FormLabel>Roles</FormLabel>
                        {
                            roles && roles.map(role => (
                                <FormCheck
                                    id={`checkbox-${role.id}`}
                                    key={role.id}
                                    type='checkbox'
                                    name='roles'
                                    value={role.id}
                                    label={role.name}
                                    checked={selectedRoles.includes(role.id)}
                                    onChange={handleRoleChange}
                                />
                            ))
                        }
                    </FormGroup>

                    <Button variant='primary' type='submit' style={{ marginTop: '10px' }} disabled={!enableSubmit}>
                        Create User
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateUserFormModal;