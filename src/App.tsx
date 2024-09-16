import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AnalyticsChart from './components/AnalyticsChart';
import MainTable from './components/MainTable';
import JobTitlesTable from './components/JobTitlesTable';
import ChatApp from './components/ChatApp';
import useFetchData from './hooks/useFetchData';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const { jobData, loading, error } = useFetchData();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [mainTableData, setMainTableData] = useState<{ year: number; totalJobs: number; averageSalary: number }[]>([]);
  const [jobTitlesData, setJobTitlesData] = useState<{ job_title: string; totalJobs: number; }[]>([]);

  useEffect(() => {
    if (!loading && jobData) {
      // Process data for main table
      const processedData = jobData.reduce((acc, item) => {
        const yearData = acc.find(d => d.year === item.work_year);
        if (yearData) {
          yearData.totalJobs += 1;
          yearData.totalSalary += item.salary_in_usd;
        } else {
          acc.push({
            year: item.work_year,
            totalJobs: 1,
            totalSalary: item.salary_in_usd,
          });
        }
        return acc;
      }, [] as { year: number; totalJobs: number; totalSalary: number }[]);

      const formattedData = processedData.map(d => ({
        year: d.year,
        totalJobs: d.totalJobs,
        averageSalary: d.totalSalary / d.totalJobs,
      }));

      setMainTableData(formattedData);
    }
  }, [loading, jobData]);

  useEffect(() => {
    if (selectedYear) {
      // Process data for job titles table
      const titlesData = jobData
        .filter(item => item.work_year === selectedYear)
        .reduce((acc, item) => {
          const job = acc.find(j => j.job_title === item.job_title);
          if (job) {
            job.totalJobs += 1;
          } else {
            acc.push({ job_title: item.job_title, totalJobs: 1 });
          }
          return acc;
        }, [] as { job_title: string; totalJobs: number; }[]);

      setJobTitlesData(titlesData);
    }
  }, [selectedYear, jobData]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', color: 'white' }}>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 20 }}>
        {error && <p>Error loading data: {error}</p>}
        {loading && <p>Loading...</p>}
        {!loading && !error && (
          <>
            <MainTable onRowClick={setSelectedYear} data={mainTableData} />
            {selectedYear && <JobTitlesTable year={selectedYear} data={jobTitlesData} />}
            <AnalyticsChart data={mainTableData} />
            <ChatApp />
          </>
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Your Footer Here</Footer>
    </Layout>
  );
};

export default App;
