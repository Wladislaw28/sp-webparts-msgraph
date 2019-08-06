import { WebPartContext  } from "@microsoft/sp-webpart-base";
import {Event} from "@microsoft/microsoft-graph-types";

export interface IWebPartRenderCalenderProps {
    idCalendar: string;
    connectToggle: boolean;
    context: WebPartContext;
    dataEventsFromOtherWP: Event[];
}
