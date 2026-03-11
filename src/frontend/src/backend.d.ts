import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Rsvp {
    id: bigint;
    status: AttendanceStatus;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export enum AttendanceStatus {
    no = "no",
    yes = "yes",
    maybe = "maybe"
}
export interface backendInterface {
    getAllRsvps(): Promise<Array<Rsvp>>;
    getRsvpById(id: bigint): Promise<Rsvp>;
    getRsvpStats(): Promise<[bigint, bigint, bigint]>;
    getRsvpsByStatus(status: AttendanceStatus): Promise<Array<Rsvp>>;
    submitRsvp(name: string, email: string, status: AttendanceStatus, message: string): Promise<void>;
}
