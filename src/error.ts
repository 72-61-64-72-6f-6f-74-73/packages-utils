export type IErrorCatchCallback = {
    name: string;
    message: string;
    stack: string;
    url: string;
    func: string;
};

export type ErrorMessage<T extends string> = { err: T };

export const err_msg = <T extends string>(err: T): ErrorMessage<T> => {
    return { err };
};

export const throw_err = (param: string | ErrorMessage<string>): undefined => {
    if (typeof param === `string`) throw new Error(param);
    else throw new Error(param.err);
};

export const handle_error = (e: unknown, append?: string): ErrorMessage<string> => {
    const msg = (e as Error).message ? (e as Error).message : String(e);
    const err = `${msg}${append ? ` ${append}` : ``}`;
    return { err };
};