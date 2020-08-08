import React, {Component} from "react";
import "./account-details.styles.scss";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {currentUserSelector} from "../../../redux/user/user-selector";
import FormInput from "../../common/form-input/form-input.component";
import {setTitle} from "../../../util/utils";
import CustomButton from "../../common/custom-button/custom-button.component";
import {updatePassword, updateUserDetails} from "../../../util/firebase";
import {objectNotEmpty} from "../../../util/objectUtils";
import PasswordConfirm from "../../common/password-confirm/password-confirm-input.component";
import ItemsTable from "../../common/items-table/items-table.component";
import avatars from "../../../data/avatars";
import BasicAccountDetails from "../basic-account-details/basic-acount-details.component";
import UserAvatar from "../user-avatar/user-avatar.component";

class AccountDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            displayName: this.props.currentUser.displayName,
            password: "",
            avatarId: this.props.currentUser.avatarId,
            resetPassword: false,
            selectedAvatar: this.props.currentUser.selectedAvatar,
            invalidValues: {},
            updateMessage: null // TODO - add notification for success of failure
        };
    }
    componentDidMount() {
        setTitle("My Account");
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.resetPassword && this.setState({resetPassword: false});
    }
    handleChange = (name, value, isValid) => {
        const invalidValues = {...this.state.invalidValues};
        invalidValues[name] = !isValid;
        this.setState({[name]: value, shouldShowUpdateSuccessMessage: false});
    };
    selectAvatar = (event) => {
        const {id} = event.target;
        this.setState({avatarId: +id, shouldShowUpdateSuccessMessage: false});
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const {displayName, password, avatarId, invalidValues} = this.state;
        const {currentUser} = this.props;
        if(objectNotEmpty(invalidValues)){
            return;
        }
        if(displayName !== currentUser.displayName || avatarId !== currentUser.avatarId)
        {
            try {
                await updateUserDetails({
                    ...this.props.currentUser,
                    displayName: displayName,
                    avatarId: avatarId
                });
                alert("updated details with success");
            } catch (err) {
                alert("failed to update");
            }
        }
        if(password !== "") {
            try {
                await updatePassword(password);
                alert("your password was successfully updated");
                this.setState({password: "", resetPassword: true});
                alert("updated password with success");
            } catch (err) {
                alert("failed to update");
            }
        }
    };

    render() {
        const {displayName, resetPassword, avatarId} = this.state;
        const {internal} = this.props.currentUser;
        return (
            <div className="account-details-component">
                <form>
                    <div className="container">
                        <div className="content">
                            <BasicAccountDetails />
                            <div className="const-details">
                                <div className="side-section">
                                    <FormInput
                                        name="displayName"
                                        label="Display Name"
                                        required
                                        handleChange={this.handleChange}
                                        value={displayName}
                                    />
                                </div>
                                {internal &&
                                    <div className="side-section">
                                        <PasswordConfirm
                                            name="password"
                                            handleChange={this.handleChange}
                                            resetPassword={resetPassword}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="image-border">
                                <div className="title">
                                    Select Avatar
                                </div>
                                <ItemsTable
                                    items={avatars}
                                    bulkSize={20}
                                    selectedItemId={avatarId}
                                    itemRenderer={(item) => (
                                        <UserAvatar item={item} onClick={this.selectAvatar} />
                                    )}
                                />
                            </div>
                            <div className="buttons">
                                <CustomButton onClick={this.handleSubmit}>
                                    Save
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector
});

export default connect(mapStateToProps)(AccountDetails);
