import SectionCard from './SectionCard'

const DataTable = ({ columns, children }) => {
    return (
        <SectionCard className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-secondary">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column}
                                    className="px-6 py-4 text-left text-sm font-semibold whitespace-nowrap"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </SectionCard>
    );
};

export default DataTable;