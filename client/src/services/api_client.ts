import axios, { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import config from "../config.json";
import { User } from "../dtos/user";
import { CheckUserRequest } from "../dtos/requests/check_user_request";
import { CheckUserResponse } from "../dtos/responses/check_user_response";
import { UpdateUserRequest } from "../dtos/requests/update_user_request";

const baseUrl = config.backendBaseUrl;
const headers: RawAxiosRequestHeaders | AxiosHeaders = {
    Accept: "application/json",
};

export async function getUsersAsync(): Promise<ApiResultWrapper<User[]>> {
    const url = baseUrl + "/" + config.getUsersEndpoint;

    try {
        const response = await axios.get<User[]>(url, {
            headers,
        });

        console.log(JSON.stringify(response));

        const usersWithDateObjects = response.data.map((user) => ({
            ...user,
            lastLogin: new Date(user.lastLogin),
        }));

        const result: ApiResultWrapper<User[]> = {
            data: usersWithDateObjects,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<User[]> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function createUser(
    userToCreate: User
): Promise<ApiResultWrapper<any>> {
    const url = baseUrl + "/" + config.addUserEndpoint;

    try {
        const response = await axios.post(url, userToCreate, { headers });

        console.log(JSON.stringify(response));

        const result: ApiResultWrapper<any> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<any> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function checkUser(
    payload: CheckUserRequest
): Promise<ApiResultWrapper<CheckUserResponse>> {
    const url = baseUrl + "/" + config.checkEndpoint;

    try {
        const response = await axios.post(url, payload, { headers });

        console.log(JSON.stringify(response));

        const result: ApiResultWrapper<CheckUserResponse> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<CheckUserResponse> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}

export async function updateUser(
    userId: string,
    payload: UpdateUserRequest
): Promise<ApiResultWrapper<any>> {
    let url = baseUrl + "/" + config.updateUserEndpoint;
    url = url.replace("{userId}", userId);
    try {
        const response = await axios.patch(url, payload, { headers });

        console.log(JSON.stringify(response));

        const result: ApiResultWrapper<any> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<any> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}


export async function deleteUser(
    payload: CheckUserRequest
) {
    const url = baseUrl + "/" + config.checkEndpoint;

    try {
        const response = await axios.post(url, payload, { headers });

        console.log(JSON.stringify(response));

        const result: ApiResultWrapper<CheckUserResponse> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<CheckUserResponse> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}