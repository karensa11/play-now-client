export const _INPUT_TYPES = {
    PASSWORD: "password",
    EMAIL: "email",
    USERNAME: "username"
};
const _INPUT_TYPES_DATA = {};
_INPUT_TYPES_DATA[_INPUT_TYPES.EMAIL] = {
    formType: "email",
    validatorExpression: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    validationMessage: "invalid email"
};
_INPUT_TYPES_DATA[_INPUT_TYPES.USERNAME] = {
    formType: "username",
    validatorExpression: /^[a-zA-Z][a-zA-Z0-9_]{3,10}$/,
    validationMessage: "username should contain 4-11 ABC/abc/0-9 characters, 1st character should be a letter"
};
_INPUT_TYPES_DATA[_INPUT_TYPES.PASSWORD] = {
    formType: "email",
    validatorExpression: /^[a-zA-Z]{6,8}$/,
    validationMessage: "password should contain 6-8 ABC/abc characters"
};

export const INPUT_TYPES_DATA = _INPUT_TYPES_DATA;
