import * as React from 'react';
import styles from './WebPartRenderCalender.module.scss';
import { IWebPartRenderCalenderProps } from './IWebPartRenderCalenderProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WebPartRenderCalender extends React.Component<IWebPartRenderCalenderProps, {}> {
  public render(): React.ReactElement<IWebPartRenderCalenderProps> {
    return (
      <div className={ styles.webPartRenderCalender }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              {/*<span className={ styles.title }>Welcome to SharePoint!</span>*/}
              {/*<p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>*/}
              <p className={ styles.description }>{escape(this.props.idCalendar)}</p>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
