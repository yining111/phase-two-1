import React from 'react';
import {  Table } from 'antd';

interface BookingHistory {
  key: string;
  teamName: string;
  time: string;
  activityName: string;
}

const History: React.FC = () => {
  const historyData: BookingHistory[] = [
    {
      key: '1',
      teamName: '前端组',
      time: '2026-02-18 14:00-16:00',
      activityName: '学习',
    },
    {
      key: '2',
      teamName: '后端组',
      time: '2026-02-17 09:00-11:00',
      activityName: '学习',
    },

  ];

  const columns = [
    {
      title: '组名',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">预约历史记录</h2>
      <div className="flex-1">
        <Table 
          columns={columns} 
          dataSource={historyData} 
          rowKey="key"
          pagination={{ pageSize: 10 }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export { History };