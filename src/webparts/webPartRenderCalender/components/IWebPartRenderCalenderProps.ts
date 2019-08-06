import { WebPartContext  } from "@microsoft/sp-webpart-base";

export interface IWebPartRenderCalenderProps {
    idCalendar: string;
    connectToggle: boolean;
    context: WebPartContext;
}
