import * as React from 'react';
import {Event} from "@microsoft/microsoft-graph-types";
import styles from './ViewEvents.module.scss';

export interface ViewEventsProps {
    arrayEvents: Event[];
}

const ViewEvents = ({arrayEvents}: ViewEventsProps) => {
    return(
        <div className={styles.eventsList}>
            <div className={styles.container}>
                {arrayEvents.map(({subject, id, start, location}) => {
                    const date = start.dateTime.split("T")[0];
                    return(
                        <div className={styles.eventData} key={id}>
                            <div className={styles.dateDiv}>
                                <h1 className={styles.date}>{date}</h1>
                            </div>
                            <div className={styles.dataLocSubj}>
                                <p className={styles.subject}>{subject}</p>
                                <p className={styles.location}>{location.displayName}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewEvents;
