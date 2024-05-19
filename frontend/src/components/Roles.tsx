import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { Role } from '../interfaces';
import api from '../api';
import { useEffectOnce } from '../hooks';
import { TableColumn } from 'react-data-table-component';
import { CustomDataTable, CreateRoleFormModal } from '../partials';


const Users = () => {
    const [showModal, setShowModal] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);

    const [rolesLoading, setRolesLoading] = useState(true);

    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertStatus, setAlertStatus] = useState<string>('');

    useEffectOnce(() => {
        api.get('/roles')
            .then(res => {
                setRoles(res.data.roles);
            })
            .catch(e => {
                console.error(e);
            })
            .finally(() => setRolesLoading(false));
    });

    const handleDelete = (id: number, name: string) => {
        api.delete('/roles/' + id)
            .then(res => {
                setRoles((roles: Role[]) => {
                    return roles.filter(role => role.id !== id);
                });

                setAlertMessage('Role ' + name + ' has been deleted.');
                setAlertStatus('success');
            })
            .catch(e => {
                console.error(e);
            });
    }

    const alertOnClose = () => {
        setAlertMessage('');
        setAlertStatus('');
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const addRoleToList = (newRole: Role) => {
        setRoles((roles: Role[]) => {
            return [newRole, ...roles];
        });

        setAlertMessage('User has been created.');
        setAlertStatus('success');
    }

    const columns: TableColumn<Role>[] = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Assigned Users",
            selector: (row) => row.users_count ?? 0,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: Role) => (
                <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(row.id, row.name)}
                >
                    Delete
                </button>
            )
        }
    ];

    return (
        <div>
            <div>
                <Button variant="primary" onClick={handleShowModal}>
                    Create New Role
                </Button>
            </div>

            {
                (alertMessage && alertStatus) && (
                    <div className='margin-top'>
                        <Alert variant={alertStatus} onClose={alertOnClose} dismissible>
                            <p>{alertMessage}</p>
                        </Alert>
                    </div>
                )
            }

            <CustomDataTable
                columns={columns}
                data={roles}
                tableTitle='Roles'
                loading={rolesLoading}
            />

            <CreateRoleFormModal
                showModal={showModal}
                handleCloseModal={handleCloseModal}
                addRoleToList={addRoleToList}
            />
        </div>
    );
};

export default Users;