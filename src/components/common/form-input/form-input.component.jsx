import React, {Component} from "react";
import "./form-input.styles.scss";
import viewIcon from "../../../assets/view.png";
import hideIcon from "../../../assets/hide.png";

const PASSWORD_TYPE = "password";

export default class FormInput extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            passwordHidden: true
        }
    }

    showPassword = () => {
        this.setState({passwordHidden: false});
    };
    hidePassword = () => {
        this.setState({passwordHidden: true});
    };

    handleChange = (event) => {
        const {value} = event.target;
        this.props.validator && this.props.validator(value);
        this.props.handleChange(event);
    };

    render() {
        const {type, notifications} = this.props;
        const {passwordHidden} = this.state;
        const notificationMessage = notifications && notifications[this.props.name];
        const otherProps = {...this.props};
        delete otherProps.type;
        delete otherProps.handleChange;
        const inputType = type === PASSWORD_TYPE && this.state.passwordHidden ?
            "password" : "text";
        const inputClassName =
            `
            ${type} 
            ${passwordHidden ? "hidden":""} 
            ${notificationMessage ? "invalid":""} 
            form-input`;
        return (
            <div className="form-input-group-component">
                <div className="title">
                    {this.props.label}
                    {this.props.required &&
                        <span>
                            &nbsp;<span className="mandatory">*</span>
                        </span>
                    }
                </div>
                <div>
                    <input  className={inputClassName}
                            type={inputType}
                            onChange={this.handleChange} {...otherProps}
                            autoComplete="current-password"
                    />
                    {type === PASSWORD_TYPE &&
                        <span>
                            &nbsp;&nbsp;
                            {this.state.passwordHidden ?
                                <img src={hideIcon} alt="" width="25" height="25" onClick={this.showPassword}/>
                                :
                                <img src={viewIcon} alt="" width="25" height="25" onClick={this.hidePassword}/>
                            }
                        </span>

                    }
                </div>
                {notificationMessage &&
                    <div className="notification">
                        {notificationMessage}
                    </div>
                }
            </div>
        )
    }
}
