import DataTable, { TableColumn } from 'react-data-table-component';

type DataType = { [key: string]: any };

interface CustomTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    tableTitle: string,
    loading: boolean
}

const CustomDataTable = <T extends DataType>({
    data,
    columns,
    tableTitle,
    loading
}: CustomTableProps<T>) => {
    return (
        <div className='custom-data-table'>
            <h2>{tableTitle}</h2>
            <DataTable
                columns={columns}
                data={data}
                pagination
                progressPending={loading}
            />
        </div>
    );
};

export default CustomDataTable;
