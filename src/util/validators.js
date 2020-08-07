
export function validateEmail(mail) {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return expression.test(mail);
}

export function validatePassword(password) {
    const expression = /([a-zA-Z]{6,8})$/;
    return expression.test(password);
}
