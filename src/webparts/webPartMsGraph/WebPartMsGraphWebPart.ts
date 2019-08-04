import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import WebPartMsGraph from './components/WebPartMsGraph';
import { IWebPartMsGraphProps } from './components/IWebPartMsGraphProps';



export interface IWebPartMsGraphWebPartProps {
  description: string;
}

export default class WebPartMsGraphWebPart extends BaseClientSideWebPart<IWebPartMsGraphWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWebPartMsGraphProps > = React.createElement(
      WebPartMsGraph,
        {
            context: this.context
        }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
