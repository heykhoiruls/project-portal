import React from "react";
import ProfileContact from "./profile-contact";
import ProfileIdentity from "./profile-identity";

const UserProfile = () => {
  return (
    <div className="w-full py-5 gap-3 flex flex-col">
      <ProfileContact />
      <ProfileIdentity />
    </div>
  );
};

export default UserProfile;
