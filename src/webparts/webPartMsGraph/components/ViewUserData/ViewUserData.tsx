import * as React from 'react';
import styles from '../WebPartMsGraph.module.scss';

export interface ViewUserDataProps {
    name: string;
    email: string;
}

 const ViewUserData = ({name, email}: ViewUserDataProps) => {
    return(
        <div className={styles.column}>
            <h1>UserName: {name}</h1>
            <h2>Email: {email}</h2>
        </div>
    );
 };

export default ViewUserData;
