import React from 'react';
import { Table } from 'antd';

interface MainTableProps {
  data: { year: number; totalJobs: number; averageSalary: number }[];
  onRowClick: (year: number) => void;
}

const MainTable: React.FC<MainTableProps> = ({ data, onRowClick }) => {
  const columns = [
    { title: 'Year', dataIndex: 'year', key: 'year', sorter: (a: any, b: any) => a.year - b.year },
    { title: 'Total Jobs', dataIndex: 'totalJobs', key: 'totalJobs', sorter: (a: any, b: any) => a.totalJobs - b.totalJobs },
    { title: 'Average Salary (USD)', dataIndex: 'averageSalary', key: 'averageSalary', sorter: (a: any, b: any) => a.averageSalary - b.averageSalary },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      onRow={(record) => ({
        onClick: () => onRowClick(record.year),
      })}
      rowKey="year"
    />
  );
};

export default MainTable;
