import { useEffect, useState } from "react";
import { User } from "../dtos/user";
import { useDispatch, useSelector } from "react-redux";
import { getUsersRequest } from "../state/users_state";
import {
    addSelectedUser,
    removeSelectedUser,
    clearSelectedUsers,
} from "../state/selected_users_state";

interface RootState {
    users: User[];
    selectedUsers: string[];
}

function ShowUsersTable() {
    const dispatch = useDispatch();
    const [selectAll, setSelectAll] = useState(false);
    const users: User[] = useSelector((state: RootState) => state.users);
    const selectedUsers: string[] = useSelector(
        (state: RootState) => state.selectedUsers
    );

    useEffect(() => {
        dispatch(getUsersRequest());
        dispatch(clearSelectedUsers());
    }, [dispatch]);

    const toggleUserSelection = (
        e: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        let isChecked = e.target.checked;
        if (isChecked) {
            dispatch(addSelectedUser(id));
        } else {
            dispatch(removeSelectedUser(id));
        }
    };
    const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);

        if (isChecked) {
            users.forEach((user) => {
                if (!selectedUsers.includes(user.id)) {
                    dispatch(addSelectedUser(user.id));
                }
            });
        } else {
            selectedUsers.forEach((userId) => {
                dispatch(removeSelectedUser(userId));
            });
        }
    };

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="bg-info" scope="col">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                        />
                    </th>
                    <th className="bg-info" scope="col">
                        Name
                    </th>
                    <th className="bg-info" scope="col">
                        e-mail
                    </th>
                    <th className="bg-info" scope="col">
                        Last Login
                    </th>
                    <th className="bg-info" scope="col">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody className="table-info">
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={(e) =>
                                    toggleUserSelection(e, user.id)
                                }
                            />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.lastLogin?.toUTCString()}</td>
                        <td>{user.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { ShowUsersTable };
