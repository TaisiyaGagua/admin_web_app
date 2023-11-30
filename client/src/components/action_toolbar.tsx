import React from "react";
import blockLogo from "../images/icon_block.png";
import unlockLogo from "../images/icon_unlock.png";
import thrashLogo from "../images/icon_thrash.png";
import { useDispatch, useSelector } from "react-redux";
import {
    blockUsersRequest,
    deleteUsersRequest,
    unblockUsersRequest,
} from "../state/users_state";
import { clearSelectedUsers } from "../state/selected_users_state";
import { useNavigate } from "react-router-dom";

const UserActions: React.FC = () => {
    const selectedIds: string[] = useSelector(
        (state: any) => state.selectedUsers
    );
    const currentUserID = localStorage.getItem("currentUserID");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBlockClick = async () => {
        dispatch(blockUsersRequest(selectedIds));
        dispatch(clearSelectedUsers());
        if (currentUserID && selectedIds.includes(currentUserID)) {
            navigate("/");
        }
    };

    const handleUnlockClick = () => {
        dispatch(unblockUsersRequest(selectedIds));
        dispatch(clearSelectedUsers());
    };

    const handleDeleteClick = async () => {
        dispatch(deleteUsersRequest(selectedIds));
        dispatch(clearSelectedUsers());
        if (currentUserID && selectedIds.includes(currentUserID)) {
            navigate("/");
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
