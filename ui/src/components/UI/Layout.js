import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import { BugOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const LayoutNav = ({ children }) => {
  // get the route location without special characters for breadcrumb usage
  const location = useLocation().pathname.split('/');

  return (
    <Layout className="layout">
      <Header style={styles.headerContainer}>
        <BugOutlined style={styles.logo} />
        <span style={styles.appName}>Pharma</span>
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

// local styling
const styles = {
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: '#FDF9F8',
    fontSize: 29,
  },
  appName: {
    color: '#FDF9F8',
    marginLeft: '9px',
    fontSize: '19px',
  },
};

export default LayoutNav;
