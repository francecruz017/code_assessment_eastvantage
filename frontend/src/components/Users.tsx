import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { CreateUserFormModal, FilterUsersForm, CustomDataTable } from '../partials';
import { UserListRecord, RawUsers, Role } from '../interfaces';
import api from '../api';
import { useEffectOnce } from '../hooks';
import { TableColumn } from 'react-data-table-component';
import { rolesToString } from '../helpers';


const Users = () => {
    const [showModal, setShowModal] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);

    const [userList, setUserList] = useState<UserListRecord[]>([]);

    const [loadingDatatable, setLoadingDatatable] = useState<boolean>(true);

    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertStatus, setAlertStatus] = useState<string>('');

    useEffectOnce(() => {
        api.get('/roles')
            .then(res => {
                setRoles(res.data.roles);
            })
            .catch(e => {
                console.error(e);
            });

        fetchUsers();
    });

    const fetchUsers = (roleToFilter = '') => {
        api.get('/users?role=' + roleToFilter)
            .then(res => {
                formatRawUsersToList(res.data.users);
            })
            .catch(e => {
                console.error(e);
            })
            .finally(() => setLoadingDatatable(false));
    }

    const formatRawUsersToList = (rawUsers: RawUsers[]) => {
        setUserList(rawUsers.map((userRaw: RawUsers) => ({
            ...userRaw,
            roles: rolesToString(userRaw.roles)
        })));
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const alertOnClose = () => {
        setAlertMessage('');
        setAlertStatus('');
    }

    const handleDelete = (userId: number, firstName: string, lastName: string) => {
        api.delete('/users/' + userId)
            .then(res => {
                setUserList((user: UserListRecord[]) => {
                    return user.filter(user => user.id !== userId);
                });

                setAlertMessage('User ' + firstName + ' ' + lastName + ' has been deleted.');
                setAlertStatus('success');
            })
            .catch(e => {
                console.error(e);
            });
    }

    const addNewUserToList = (newUser: UserListRecord) => {
        setUserList((users: UserListRecord[]) => {
            return [newUser, ...users];
        });

        setAlertMessage('User has been created.');
        setAlertStatus('success');
    }

    const handleOnFilter = (roleToFilter: string) => {
        fetchUsers(roleToFilter);
    }

    const columns: TableColumn<UserListRecord>[] = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Last Name",
            selector: (row) => row.last_name,
            sortable: true,
        },
        {
            name: "First Name",
            selector: (row) => row.first_name,
            sortable: true,
        },
        {
            name: "Middle Name",
            selector: (row) => row.middle_name ?? '',
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: 'Roles',
            selector: (row) => row.roles,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: UserListRecord) => (
                <button
                    className='btn btn-danger'
                    onClick={() => handleDelete(row.id, row.first_name, row.last_name)}
                >Delete</button>
            )
        }
    ];

    return (
        <div>
            <div>
                <Button variant="primary" onClick={handleShowModal}>
                    Create New User
                </Button>
            </div>

            <div className='margin-top btn-grp user-fetching-btn'>
                <FilterUsersForm
                    roles={roles}
                    handleOnFilter={handleOnFilter}
                    setLoadingDatatable={setLoadingDatatable}
                />
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

            <CreateUserFormModal
                showModal={showModal}
                roles={roles}
                handleCloseModal={handleCloseModal}
                addNewUserToList={addNewUserToList}
            />

            <CustomDataTable
                columns={columns}
                data={userList}
                tableTitle='Users'
                loading={loadingDatatable}
            />
        </div>
    );
};

export default Users;