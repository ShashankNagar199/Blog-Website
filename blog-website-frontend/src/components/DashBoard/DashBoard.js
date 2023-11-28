import React from 'react';
import CommunityBlogs from '../CommunityBlogs/CommunityBlogs';
import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import styles from './DashBoard.module.css';
import { useLocation, Navigate } from 'react-router-dom';

const DashBoard = (props) => {
    const user = props.currentUser;
    const location = useLocation();

    if (user === null || user === undefined)
        return <Navigate replace to="/login" />

    const blogs = location.state.blogs;
    return <div className={styles.dashboardContent}>
        <CommunityBlogs user={user} blogs={blogs}/>
        <DashboardSidebar user={user} />
    </div>
}

export default DashBoard;