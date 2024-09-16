import React from 'react';
import { Layout, Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

// Define props to include children
const AppLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529' }}>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1" style={{ color: '#fff' }}>ML Engineer Salaries</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <div className="container">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Built with ❤️ using React and Ant Design. 
        <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
          <GithubOutlined style={{ fontSize: '18px', marginLeft: '10px' }} />
        </a>
      </Footer>
    </Layout>
  );
};

export default AppLayout;
