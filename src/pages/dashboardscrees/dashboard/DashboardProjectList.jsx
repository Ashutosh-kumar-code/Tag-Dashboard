import React from 'react';
import { Icons } from '../../../icons';
import Card from '../../../components/dashboard/card/Card';

const DashboardProjectList = () => {
    const projects = [
        {
            id: 1,
            name: 'Green Valley',
            date: '05/05/2022',
            Delay: 'Cityville',
        },
        {
            id: 2,
            name: 'Blue Sky Apartments',
            date: 'BS002',
            Delay: 'Townsville',
        }
    ];

    const handleEdit = (id) => {
        console.log(`Edit project with ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete project with ID: ${id}`);
    };

    return (
        <>
            <h1 className="list-heading mb-4">7A Project List</h1>
            <div className="list-table-head ">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="list-table-container">
                            <th className="list-th">Task Name</th>
                            <th className="list-th">Due Date</th>
                            <th className="list-th">Delay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, index) => (
                            <tr key={index} className="border-t text-gray-600">
                                <td className="list-th">{project.name}</td>
                                <td className="list-th">{project.date}</td>
                                <td className="list-th">{project.Delay}</td>
                                {/* <td className="list-th list-action">
                                    <Icons.edit className="cursor-pointer" size={24} />
                                    <Icons.read size={24} />
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 sm:hidden">
            {projects.map((project) => (
                <Card
                    key={project.id}
                    title={project.name}
                    subtitle={`Project Number: ${project.number}`}
                    description={`Address: ${project.address}\nArea: ${project.area}`}
                    image={project.image}
                    actions={[
                        {
                            label: <Icons.edit size={20} />,
                            onClick: () => handleEdit(project.id),
                            className: '',
                        },
                        {
                            label: <Icons.read size={20} />,
                            onClick: () => handleDelete(project.id),
                            className: '',
                        }
                    ]}
                />
            ))}
        </div> */}
        </>
    );
};

export default DashboardProjectList;
