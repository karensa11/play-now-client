import React from "react";
import "./basic-acount-details.styles.scss";
import dateFormat from "dateformat";
import avatars from "../../../data/avatars";

export default function BasicAccountDetails ({userToDisplay}) {
    const {email, createAt, avatarId} = userToDisplay;
    const userCreationDate = dateFormat(new Date(createAt.seconds * 1000), "dd-mm-yyyy hh:MM:ss");
    const selectedAvatar = avatars.filter(item => item.id === avatarId)[0];
    return (
        <div className="basic-account-details-component">
            <div className="details">
                <span className="title">Email :</span>&nbsp;
                <span className="value">{email}</span>
                &nbsp;&nbsp;&nbsp;
                <span className="title">Member since :</span>&nbsp;
                <span className="value">{userCreationDate}</span>
            </div>
            {selectedAvatar &&
                <div className="user-image">
                    <img src={selectedAvatar.url} alt={selectedAvatar.id}/>
                </div>
            }
        </div>
    )
}
