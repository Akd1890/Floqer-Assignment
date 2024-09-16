import React from 'react';
import { Table } from 'antd';

interface JobTitlesTableProps {
  year: number;
  data: { job_title: string; totalJobs: number; }[];
}

const JobTitlesTable: React.FC<JobTitlesTableProps> = ({ year, data }) => {
  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="job_title"
      title={() => <h3>Job Titles for {year}</h3>}
    />
  );
};

export default JobTitlesTable;
