import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField, PropertyPaneToggle
} from '@microsoft/sp-property-pane';

import * as strings from 'WebPartRenderCalenderWebPartStrings';
import WebPartRenderCalender from './components/WebPartRenderCalender';
import { IWebPartRenderCalenderProps } from './components/IWebPartRenderCalenderProps';
import Store from '../pattern/Store';

export interface IWebPartRenderCalenderWebPartProps {
    idCalendar: string;
    connectToggle: boolean;
}

export default class WebPartRenderCalenderWebPart extends BaseClientSideWebPart<IWebPartRenderCalenderWebPartProps> {

    public onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
        if (propertyPath === 'connectToggle') {
            console.log("connect");
            Store.subscribe(text => {
               console.log('broadcast',text);
            });
        }
    }

  public render(): void {
    const element: React.ReactElement<IWebPartRenderCalenderProps > = React.createElement(
      WebPartRenderCalender,
      {
          idCalendar: this.properties.idCalendar,
          connectToggle: this.properties.connectToggle,
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('idCalendar', {
                  label: strings.IdCalendarFieldLabel
                }),
                  PropertyPaneToggle('connectToggle', {
                      label: strings.ToggleConnect,
                      checked: this.onPropertyPaneFieldChanged.bind(this),
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
