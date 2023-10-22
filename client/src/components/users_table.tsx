import { useEffect } from "react";
import { User } from "../dtos/user";
import { useDispatch, useSelector } from "react-redux";
import { getUsersRequest } from "../state/users_state";

interface ShowUsersTableProps {
    selectedUsers: string[];
    setSelectedUsers: (users: string[]) => void;
}

function ShowUsersTable({
    selectedUsers,
    setSelectedUsers,
}: ShowUsersTableProps) {
    const dispatch = useDispatch();
    const users: User[] = useSelector((state: any) => state.users);

    useEffect(() => {
        dispatch(getUsersRequest());
    }, [dispatch]);

    const toggleUserSelection = (username: string) => {
        // dispatch(blockUsersRequest);
        if (selectedUsers.includes(username)) {
            setSelectedUsers(
                selectedUsers.filter(
                    (selectedUser) => selectedUser !== username
                )
            );
        } else {
            setSelectedUsers([...selectedUsers, username]);
        }
    };

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th className="bg-info" scope="col">
                        #
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
                                checked={selectedUsers.includes(user.username)}
                                onChange={() =>
                                    toggleUserSelection(user.username)
                                }
                            />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.lastLogin.toUTCString()}</td>
                        <td>{user.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export { ShowUsersTable };
