import React, { ReactElement, useEffect, useState } from 'react';

import { Card, Statistic } from 'antd';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ArrowUpOutlined } from '@ant-design/icons';
import axios, { AxiosResponse } from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Dashboard(): ReactElement {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const [activeLicenses, setActiveLicenses] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const { data }: AxiosResponse<{ count: number }> = await axios.get(
        '/api/admin/publications/licenses/count',
      );

      setActiveLicenses(data.count);
    })();
  }, []);

  return (
    <div className="w-full h-full grid grid-cols-2 p-8">
      <div className="w-[80%] h-[80%] flex flex-col justify-center items-center">
        <span className="font-bold">Sales - Weekly</span>
        <Bar {...config} />
      </div>
      <div className="w-[80%] h-[80%] flex flex-col justify-center items-center">
        <span className="font-bold">Titles Sold - Weekly</span>
        <Bar {...config} />
      </div>
      <div className="w-[80%] h-[80%] flex flex-col justify-center items-center">
        <span className="font-bold">Sales - Monthly</span>
        <Bar {...config} />
      </div>
      <div className="w-[80%] h-[80%] flex flex-col justify-center items-center">
        {/*<Bar {...config} />*/}
        <Card
          className="w-full h-full flex justify-center items-center"
          bordered={true}
        >
          <Statistic
            loading={activeLicenses === 0}
            title="Active"
            value={activeLicenses}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="Licenses"
          />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
