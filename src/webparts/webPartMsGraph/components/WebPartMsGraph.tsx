import * as React from 'react';
import styles from './WebPartMsGraph.module.scss';
import { IWebPartMsGraphProps } from './IWebPartMsGraphProps';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export default class WebPartMsGraph extends React.Component<IWebPartMsGraphProps, {}> {

    public componentDidMount(): void {
        this._proba();
    }

    private _proba(): void{
        this.props.context.msGraphClientFactory.getClient().then((client: MSGraphClient): void => {
            client.api('/me').get((error, user: MicrosoftGraph.User, rawResponse?: any) => {
                console.log(user);
                console.log(user.displayName);
            });
        });
    }

  public render(): React.ReactElement<IWebPartMsGraphProps> {
    return (
      <div className={ styles.webPartMsGraph }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
