import * as React from 'react';

import * as strings from 'WebPartMsGraphWebPartStrings';

import styles from '../WebPartMsGraph.module.scss';

export interface ViewUserDataProps {
    name: string;
    email: string;
}

 const ViewUserData = ({name, email}: ViewUserDataProps) => {
    return(
        <div className={styles.column}>
            <h1 className={styles.username}>{strings.UserName}: {name}</h1>
            <h2 className={styles.useremail}>{strings.Email}: {email}</h2>
        </div>
    );
 };

export default ViewUserData;
