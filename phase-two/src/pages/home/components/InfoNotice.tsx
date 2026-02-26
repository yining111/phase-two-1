import React from 'react';
import {  ExclamationCircleOutlined } from '@ant-design/icons';


//顶部提示
export const InfoNotice: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
  
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, marginRight: '24px' }}>
            <div style={{ fontSize: 30, fontWeight: 'bold', marginBottom: '8px' }}>欢迎来到 430 活动室</div>
            <div style={{ color: '#666', marginBottom: '12px' }}>这是 SACC 社团的活动室，请保持整洁有序，开启技术创作之路。</div>
            <div style={{ display: 'flex', gap: '16px', fontSize: 14, color: '#999' }}>
              <span>开放时长： 8:00 - 22:00</span>
              <span>场地： 430 room</span>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#fff5e5ff', padding: '16px', borderRadius: '8px', width: '300px' }}>
            <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ExclamationCircleOutlined style={{ color: '#fa8c16' }} />
              注意事项
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
              <li style={{ marginBottom: '4px' , color: '#f29d43ff'}}>开放时间：8:00-22:00（日）</li>
              <li style={{ marginBottom: '4px' , color: '#f29d43ff'}}>请爱护公物，保持环境卫生</li>
              <li style={{ marginBottom: '4px' , color: '#f29d43ff'}}>不可对未来一小时内预约</li>
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};