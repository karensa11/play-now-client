import React from "react";
import "./user-avatar.styles.scss";

export default function UserAvatar({item, onClick}) {
    const {url, id} = item;
    return (
        <img className="user-avatar-component"
            src={url} alt={id} id={id} onClick={onClick} />
    )
}
