import * as React from 'react';
import { IWebPartRenderCalenderProps } from './IWebPartRenderCalenderProps';
import {Event} from "@microsoft/microsoft-graph-types";
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import ViewEvents from './ViewEvents/ViewEvents';
import * as strings from 'WebPartRenderCalenderWebPartStrings';
import Store from '../../pattern/Store';
import styles from './WebPartRenderCalender.module.scss';

export interface WebPartRenderCalenderState {
    eventsData: Event[];
}

export default class WebPartRenderCalender extends React.Component<IWebPartRenderCalenderProps, WebPartRenderCalenderState> {

   public state = {
       eventsData: []
   };

   public componentDidMount(): void {
       this._checkConnect();
   }

   public componentWillReceiveProps(): void {
       this._checkConnect();
   }

   private _checkConnect(): void {
       if (this.props.connectToggle === true || this.props.connectToggle === undefined && this.props.idCalendar !== '') {
           this._getEvents(this.props.idCalendar);
       } else if (this.props.connectToggle === false) {
           Store.subscribe(dataEvent => {
               this.setState({
                   eventsData: dataEvent,
               },() => {
                   this.render();
                   Store.unsubscribe(dataEvent);
               });
           });
       } else {
           console.log('no active');
       }
   }


   private _getEvents(id: string): void {
       this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
           client.api(`/me/calendars/${id}/events?$select=subject,start,end,location`).get((err, response) => {
               if (err) {
                   console.error(err);
                   return;
               }
               const dateNow = new Date().toISOString();
               const arrayEvents: Event[] = response.value.filter(x => x.start.dateTime >= dateNow )
                   .reverse().slice(0,3);
               this.setState({
                   eventsData: arrayEvents
               });
           });
       });
   }

  public render(): React.ReactElement<IWebPartRenderCalenderProps> {
    return (
      <div className={ styles.webPartRenderCalender }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{strings.TitleWebPart}</span> <br/>
                {this.state.eventsData.length > 0 ? <ViewEvents arrayEvents={this.state.eventsData} /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
