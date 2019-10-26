import { STATUS_CHANGE } from "./Types/UserTypes";

export function StatusChange(status) {
    return {
        type: STATUS_CHANGE,
        payload: status
    }
}