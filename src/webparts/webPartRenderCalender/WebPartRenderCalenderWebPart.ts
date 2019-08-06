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

import {Event} from "@microsoft/microsoft-graph-types";


export interface IWebPartRenderCalenderWebPartProps {
    idCalendar: string;
    connectToggle: boolean;
    dataEventsFromOtherWP: Event[];
}

export default class WebPartRenderCalenderWebPart extends BaseClientSideWebPart<IWebPartRenderCalenderWebPartProps> {

    private dataEvents: Event[] = [];
    //
    // public onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    //     if (propertyPath === 'connectToggle') {
    //         if (newValue === false){
    //             Store.subscribe(dataEvent => {
    //                 this.dataEvents = dataEvent;
    //                 this.render();
    //             });
    //         }
    //     }
    // }

  public render(): void {
    const element: React.ReactElement<IWebPartRenderCalenderProps > = React.createElement(
      WebPartRenderCalender,
      {
          idCalendar: this.properties.idCalendar,
          connectToggle: this.properties.connectToggle,
          dataEventsFromOtherWP: this.dataEvents,
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
                      checked: this.properties.connectToggle,
                      onText: 'On',
                      offText: 'Off'
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
