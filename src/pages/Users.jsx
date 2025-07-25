import React, { useEffect, useState, useRef } from 'react'
import PageHeader from '../components/utils/PageHeader'
import $ from 'jquery';
import 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import SummaryApi from '../common/Summaryapi';
import Axios from '../utils/axios';

const Users = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const tableRef = useRef();

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.get_users,
            });

            if (response.data && Array.isArray(response.data.data)) {
                const user = response.data.data;
                setUsers(user);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (users.length > 0 && tableRef.current) {
            // Destroy existing DataTable if it exists
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }

            // Initialize DataTable
            $(tableRef.current).DataTable({
                data: users,
                columns: [
                    // {
                    //     title: 'Timestamp',
                    //     data: 'timestamp',
                    //     render: function(data) {
                    //         return data ? new Date(parseInt(data) * 1000).toLocaleString() : '';
                    //     }
                    // },
                    // {
                    //     title: 'Admin',
                    //     data: 'admin'
                    // },
                    {
                        title: 'Name',
                        data: 'name'
                    },
                    {
                        title: 'Phone',
                        data: 'phone'
                    },
                    {
                        title: 'Status',
                        data: 'status',
                        render: function(data) {
                            const statusClass = data === 'Saved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
                            return `<span class="px-2 py-1 rounded text-sm ${statusClass}">${data}</span>`;
                        }
                    }
                ],
                responsive: true,
                pageLength: 10,
                lengthMenu: [5, 10, 25, 50, 100],
                language: {
                    emptyTable: "No users found",
                    processing: "Loading users..."
                }
            });
        }
        
        // Cleanup function
        return () => {
            if (tableRef.current && $.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [users]);
    
    return (
        <div>
            <PageHeader title="Users" />
            <div className="bg-white border p-3 dark:bg-darkinfo text-gray-900 dark:text-white rounded-lg overflow-hidden h-[calc(100vh-200px)]">
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div>Loading users...</div>
                    </div>
                ) : (
                    <table ref={tableRef} className="display" style={{width: '100%'}}>
                        {/* DataTable will generate headers automatically */}
                    </table>
                )}
            </div>
        </div>
    )
}

export default Users