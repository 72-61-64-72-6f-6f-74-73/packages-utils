import { type NotifyMessage } from ".";

export const is_err_response = (response: any): response is { err: string } => {
    return "err" in response && typeof response.err === "string";
}

export const is_pass_response = (response: any): response is { pass: true } => {
    return "pass" in response && response.pass === true;
}

export const is_result_response = (response: any): response is { result: string } => {
    return "result" in response && typeof response.result === "string";
}

export const is_results_response = (response: any): response is { results: string[] } => {
    return "results" in response && Array.isArray(response.results);
}

export const is_error_response = (response: any): response is { error: string } => {
    return "error" in response && typeof response.result === "string";
}

export const is_message_response = (response: any): response is NotifyMessage => {
    return (
        typeof response === "object" &&
        response !== null &&
        "message" in response &&
        typeof response.message === "string" &&
        (response.ok === undefined || typeof response.ok === "string") &&
        (response.cancel === undefined || typeof response.cancel === "string")
    );
};