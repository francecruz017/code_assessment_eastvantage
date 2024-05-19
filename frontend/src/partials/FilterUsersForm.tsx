import { Button, Form } from 'react-bootstrap';
import { Role } from '../interfaces';
import { useState } from 'react';

interface FilterUsersFormProps {
    roles: Role[];
    handleOnFilter: (roleToFilter: string) => void;
    setLoadingDatatable: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterUsersForm = ({
    roles,
    handleOnFilter,
    setLoadingDatatable,
}: FilterUsersFormProps) => {

    const [selectedRoleToFilter, setSelectedRoleToFilter] = useState<string>('');

    const handleFilterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingDatatable(true);
        handleOnFilter(selectedRoleToFilter);
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoleToFilter(e.target.value);
    };

    return (
        <Form className='d-flex col-sm-6 users-filter-form' onSubmit={handleFilterSubmit}>
            <Form.Select onChange={handleFilterChange} value={selectedRoleToFilter}>
                <option value="">Show all</option>
                {
                    roles && roles.map((role: Role) => (
                        <option value={role.name} key={role.id}>{role.name}</option>
                    ))
                }
            </Form.Select>
            <Button variant="secondary" type="submit">Filter</Button>
        </Form>
    );
};

export default FilterUsersForm;