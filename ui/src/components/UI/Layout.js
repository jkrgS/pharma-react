import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import '../../styles/main.scss';
import { BugOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const LayoutNav = ({ children }) => {
  const location = useLocation().pathname.split('/');

  return (
    <Layout className="layout">
      <Header>
        <BugOutlined style={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          {/* <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item> */}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item className="capitalize">{location}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="siteLayoutContent">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}></Footer>
    </Layout>
  );
};

const styles = {
  logo: {
    color: '#FDF9F8',
    fontSize: 23,
  },
};

export default LayoutNav;
