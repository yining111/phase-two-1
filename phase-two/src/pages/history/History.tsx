import React from 'react';
import { Card, Table } from 'antd';

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
    <div style={{ padding: '24px' ,width:1000,height:500 }}>
      <Card title="预约历史记录" bordered={false} style={{width:1000,height:500}}>
        <Table 
          columns={columns} 
          dataSource={historyData} 
          rowKey="key"
        />
      </Card>
    </div>
  );
};

export { History };