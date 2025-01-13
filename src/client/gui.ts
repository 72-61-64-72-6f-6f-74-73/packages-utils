import { type ResultsList } from "..";

export type IClientGuiDialogKind = "info" | "warning" | "error";

export type IClientGuiDialogAlertOpts = string;

export type IClientGuiDialogConfirmOpts = string | { title?: string, kind?: IClientGuiDialogKind; message: string; cancel?: string; ok?: string; };

export type IClientGuiDialogResolve = ResultsList<string>;

export type IClientGuiNotifyPermission = "default" | "denied" | "granted";
export type IClientGuiNotifySendOptions = {
    id?: number;
    channel_id?: string;
    title: string;
    body?: string;
};

export type IClientGui = {
    alert(opts: IClientGuiDialogAlertOpts): Promise<boolean>;
    confirm(opts: IClientGuiDialogConfirmOpts): Promise<boolean>;
    notify_init(): Promise<IClientGuiNotifyPermission | undefined>;
    notify_send(opts: string | IClientGuiNotifySendOptions): Promise<void>;
};