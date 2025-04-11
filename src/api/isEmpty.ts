import {UserCredential} from "@/interfaces/Types";
import {DetailValues} from "@/interfaces/Interfaces";

export const isEmptyCred = (details: UserCredential) => {
    return (
        details.previousRoles === "" &&
        details.availability === "" &&
        details.skills === "" &&
        details.credentials === ""
    );
};

export const isEmptyDetail = (details: DetailValues) => {
    return (
        details.name === "" &&
        details.email === "" &&
        details.previousRoles === "" &&
        details.availability === "" &&
        details.skills === "" &&
        details.credentials === ""
    );
};