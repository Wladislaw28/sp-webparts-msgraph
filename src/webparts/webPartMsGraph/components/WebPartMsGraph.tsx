import * as React from 'react';
import styles from './WebPartMsGraph.module.scss';
import { IWebPartMsGraphProps } from './IWebPartMsGraphProps';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import ViewUserData from './ViewUserData/ViewUserData';
import {Calendar} from "@microsoft/microsoft-graph-types";
import { Dropdown, DropdownMenuItemType,
    IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


export interface IWebPartMsGraphState {
    userName: string;
    userEmail: string;
    userCalendars: Calendar[];
    options: IDropdownOption[];
}

export default class WebPartMsGraph extends React.Component<IWebPartMsGraphProps, IWebPartMsGraphState> {

    public state = {
      userName: '',
        userEmail: '',
        userCalendars: [],
        options: []
    };

    public componentDidMount(): void {
        this._getUserData();
    }

    private _getUserData(): void {
        this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
            client.api('/me').get((error, user: MicrosoftGraph.User, rawResponse?: any) => {
                if (error) {
                    console.error(error);
                    return;
                }
                this.setState({
                    userName: user.displayName,
                    userEmail: user.mail
                }, () => {
                    this._getUserCalendars();
                });
            });
        });
    }

    private _getUserCalendars(): void {
        this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
            client.api('/me/calendars').get((err, response) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.setState({
                    userCalendars: response.value,
                },() => {
                    this._createOptions(this.state.userCalendars);
                });
            });
        });
    }

    private _createOptions (calendars: Calendar[]): void {
        const options: IDropdownOption[] = [];
        calendars.forEach(({name, id}) => {
            options.push({
                key: id,
                text: name
            });
        });
       this.setState({
           options: options
       });
    }

    private _onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
        console.log(`Selection change: ${item.text} ${item.key}`);
        // this.setState({ selectedItem: item });
    }

  public render(): React.ReactElement<IWebPartMsGraphProps> {
        const {userName, userEmail, options} = this.state;

      const dropdownStyles: Partial<IDropdownStyles> = {
          dropdown: { width: 600 },
          label: {marginTop: 170}
      };

    return (
      <div className={ styles.webPartMsGraph }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to task 4 in SharePoint!</span>
                <ViewUserData name={userName} email={userEmail} /> <br/>
                <div>
                    <Dropdown placeholder="Choice the calendar" label="List of calendars" defaultSelectedKey=""
                              options={options} styles={dropdownStyles} onChange={this._onChange} />
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
