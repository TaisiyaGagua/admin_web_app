import { takeEvery, put, call, all } from "redux-saga/effects";
import {
    deleteUserAsync,
    getUsersAsync,
    updateUserAsync,
} from "../services/api_client";
import { UpdateUserDto } from "../dtos/requests/update_user_dto";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import { User } from "../dtos/user";
import {
    blockUsersFailure,
    deleteUsersFailure,
    getUsersFailure,
    getUsersSuccess,
    unblockUsersFailure,
    updateLastLoginUserFailure,
    updateLastLoginUserSuccess,
} from "../state/users_state";

function* blockUser(action: {
    type: string;
    payload: string[];
}): Generator<any, void, ApiResultWrapper<any>> {
    try {
        const userIds = action.payload;
        const payload = { status: "Blocked" } as UpdateUserDto;
        const blockPromises = userIds.map((userId) =>
            call(updateUserAsync, userId, payload)
        );

        yield all(blockPromises);
        const response = yield call(getUsersAsync);

        yield put(getUsersSuccess(response.data));
    } catch (error) {
        yield put(blockUsersFailure(error as string));
    }
}

function* unblockUser(action: {
    type: string;
    payload: string[];
}): Generator<any, void, ApiResultWrapper<User[]>> {
    try {
        const userIds = action.payload;

        const payload = { status: "Active" } as UpdateUserDto;
        const unblockPromises = userIds.map((userId) =>
            call(updateUserAsync, userId, payload)
        );

        yield all(unblockPromises);
        const response = yield call(getUsersAsync);
        yield put(getUsersSuccess(response.data));
    } catch (error) {
        yield put(unblockUsersFailure(error as string));
    }
}

function* getUser(action: {
    type: string;
    payload: string[];
}): Generator<any, void, ApiResultWrapper<User[]>> {
    try {
        const response = yield call(getUsersAsync);
        yield put(getUsersSuccess(response.data));
    } catch (error) {
        yield put(getUsersFailure({}));
    }
}

function* deleteUser(action: {
    type: string;
    payload: string[];
}): Generator<any, void, any> {
    try {
        const userIds = action.payload;

        const deletePromises = userIds.map((userId) =>
            call(deleteUserAsync, userId)
        );

        yield all(deletePromises);

        const response = yield call(getUsersAsync);
        yield put(getUsersSuccess(response.data));
    } catch (error) {
        yield put(deleteUsersFailure(error as string));
    }
}

function* updateLastLoginUser(action: {
    type: string;
    payload: string;
}): Generator<any, void, ApiResultWrapper<any>> {
    let response: ApiResultWrapper<any> = {
        data: undefined,
        error: undefined,
    };
    try {
        let newLastLogin: Date = new Date();

        const payload = { lastLogin: newLastLogin } as UpdateUserDto;

        response = yield call(updateUserAsync, action.payload, payload);

        yield put(updateLastLoginUserSuccess(response.data));
    } catch {
        yield put(updateLastLoginUserFailure(response.error));
    }
}

export function* userSaga() {
    yield takeEvery("users/blockUsersRequest", blockUser);
    yield takeEvery("users/unblockUsersRequest", unblockUser);
    yield takeEvery("users/getUsersRequest", getUser);
    yield takeEvery("users/deleteUsersRequest", deleteUser);
    yield takeEvery("users/updateLastLoginUserRequest", updateLastLoginUser);
}
