import { Link } from "react-router-dom";
import { LinkStyles } from "../LinkStyles";
import type React from "react";
import type { SetStateAction } from "react";
import { useAppDispatch } from "../../store/hooks";
import { logoutUser } from "../../store/slices/userSlice";

type ProfileTypes = {
  openProfile: boolean;
  setOpenProfile: React.Dispatch<SetStateAction<boolean>>;
};

const ProfileDropdown = ({ openProfile, setOpenProfile }: ProfileTypes) => {
  const dispatch = useAppDispatch();
  return (
    <div className="profile-dropdown-container">
      <Link
        onClick={() => setOpenProfile(!openProfile)}
        to="/"
        style={LinkStyles}
        className="profile-dropdown-item"
      >
        <p>Giorgi</p>
      </Link>
      <Link
        onClick={() => setOpenProfile(!openProfile)}
        to="/"
        style={LinkStyles}
        className="profile-dropdown-item"
      >
        <p>Settings</p>
      </Link>
      <p
        onClick={() => dispatch(logoutUser())}
        className="profile-dropdown-item"
      >
        Logout
      </p>
    </div>
  );
};

export default ProfileDropdown;
