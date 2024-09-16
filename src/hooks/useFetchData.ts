import { useEffect, useState } from 'react';
import { csv } from 'd3-fetch';

interface JobData {
  work_year: number;
  experience_level: string;
  employment_type: string;
  job_title: string;
  salary: number;
  salary_currency: string;
  salary_in_usd: number;
  employee_residence: string;
  remote_ratio: number;
  company_location: string;
  company_size: string;
}

const useFetchData = () => {
  const [jobData, setJobData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const data = await csv<JobData>('/salaries.csv', (row) => ({
          work_year: +row.work_year || 0,
          experience_level: row.experience_level || '',
          employment_type: row.employment_type || '',
          job_title: row.job_title || '',
          salary: +row.salary || 0,
          salary_currency: row.salary_currency || '',
          salary_in_usd: +row.salary_in_usd || 0,
          employee_residence: row.employee_residence || '',
          remote_ratio: +row.remote_ratio || 0,
          company_location: row.company_location || '',
          company_size: row.company_size || '',
        }));

        console.log(data); // Log data to verify
        setJobData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching or parsing CSV data:", error);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchCSVData();
  }, []);

  return { jobData, loading, error };
};

export default useFetchData;
