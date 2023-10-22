import React, { useEffect, useState } from "react";
import blockLogo from "../images/icon_block.png";
import unlockLogo from "../images/icon_unlock.png";
import thrashLogo from "../images/icon_thrash.png";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../dtos/user";
import { blockUsersRequest } from "../state/users_state";


interface UserActionsProps {
    // status: "Active" | "Blocked";
    selectedUsers: string[];
}

const UserActions: React.FC<UserActionsProps> = (props: UserActionsProps) => {
    const [status, setStatus] = useState<string>("Active");
    const { selectedUsers /*onBlock, onUnlock*/ } = props;
    const dispatch = useDispatch();
    const users: User[] = useSelector((state: any) => state.users);

    useEffect(() => {
        dispatch(blockUsersRequest());
    }, [dispatch]);

    const handleBlockClick = async () => {
        for (selectedUsers) {
            if (status === "Active") {
                await fetch("http://localhost:5001/users", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedUsers),
                });
                console.log("this user has been bloked");
            }
        }
        console.log(selectedUsers);
    };

    const handleUnlockClick = () => {
        if (status === "Blocked") {
            //разблокировать из бд
            // onUnlock(username);
        }
    };

    const handleDeleteClick = async () => {
        for (const usernameToDelete of selectedUsers) {
            await fetch(`http://localhost:5001/${usernameToDelete}`, {
                method: "DELETE",
            });
            console.log("this user has been deleted");
            
        }

    };

    return (
        <div>
            <div className="action_toolbar">
                <img
                    src={blockLogo}
                    alt="Block"
                    onClick={handleBlockClick}
                    className="icon"
                />

                <img
                    src={unlockLogo}
                    alt="Unlock"
                    onClick={handleUnlockClick}
                    className="icon"
                />
                <img
                    src={thrashLogo}
                    alt="Delete"
                    onClick={handleDeleteClick}
                    className="icon"
                />
            </div>
        </div>
    );
};

export default UserActions;
