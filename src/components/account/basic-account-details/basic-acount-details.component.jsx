import React from "react";
import "./basic-acount-details.styles.scss";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../../../redux/user/user-selector";
import dateFormat from "dateformat";
import avatars from "../../../data/avatars";

function BasicAccountDetails ({currentUser}) {
    const {email, createAt, avatarId} = currentUser;
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

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

export default connect(mapStateToProps)(BasicAccountDetails);
