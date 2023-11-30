import axios, { AxiosHeaders, RawAxiosRequestHeaders } from "axios";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import config from "../config.json";
import { User } from "../dtos/user";
import { CheckUserDto } from "../dtos/requests/check_user_dto";
import { CheckUserResponse } from "../dtos/responses/check_user_response";
import { UpdateUserDto } from "../dtos/requests/update_user_dto";
import { CreateUserDto } from "../dtos/requests/create_user_dto";
import { UserResponseDto } from "../dtos/responses/user_response_dto";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const headers: RawAxiosRequestHeaders | AxiosHeaders = {
    Accept: "application/json",
};

export async function getUsersAsync(): Promise<ApiResultWrapper<User[]>> {
    const url = baseUrl + "/" + config.getUsersEndpoint;

    try {
        const response = await axios.get<UserResponseDto[]>(url, {
            headers,
        });

        const usersWithDateObjects = response.data.map((user) => ({
            ...user,
            id: user._id,
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

export async function createUserAsync(
    userToCreate: CreateUserDto
): Promise<ApiResultWrapper<any>> {
    const url = baseUrl + "/" + config.addUserEndpoint;

    try {
        const response = await axios.post(url, userToCreate, { headers });
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

export async function checkUserAsync(
    payload: CheckUserDto
): Promise<ApiResultWrapper<CheckUserResponse>> {
    const url = baseUrl + "/" + config.checkEndpoint;

    try {
        const response = await axios.post(url, payload, { headers });

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

export async function updateUserAsync(
    userId: string,
    payload: UpdateUserDto
): Promise<ApiResultWrapper<any>> {
    let url = baseUrl + "/" + config.updateUserEndpoint;
    url = url.replace("{userId}", userId);
    try {
        const response = await axios.patch(url, payload, { headers });

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

export async function deleteUserAsync(userId: string) {
    let url = baseUrl + "/" + config.deleteEndpoint;
    url = url.replace("{userId}", userId);

    try {
        const response = await axios.delete(url);

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
