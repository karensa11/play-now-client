import React, {Component} from "react";
import "./account-details.styles.scss";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../../../redux/user/user-selector";
import dateFormat from "dateformat";
import FormInput from "../../common/form-input/form-input.component";
import {setTitle} from "../../../util/utils";

class AccountDetails extends Component{
    constructor(props) {
        super(props);
        console.log("AccountDetails ctor");
    }
    componentDidMount() {
        setTitle("My Account");
    }

    render() {
        const {currentUser} = this.props;
        const presentationDate = new Date(currentUser.createAt.seconds * 1000);
        const userCreationDate = dateFormat(presentationDate, "dd-mm-yyyy hh:MM:ss");
        return (
            <div className="account-details-component">
                <div className="content">
                    <div className="basic-details">
                        <span className="title">Email :</span>&nbsp;
                        <span className="value">{currentUser.email}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span className="title">Member since :</span>&nbsp;
                        <span className="value">{userCreationDate}</span>
                    </div>
                    <div className="const-details">
                        <div>
                            <FormInput
                                name="displayName"
                                label="Display Name"
                                required
                                value={currentUser.displayName}
                            />
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

export default connect(mapStateToProps)(AccountDetails);
