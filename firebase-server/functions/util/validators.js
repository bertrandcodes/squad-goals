const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
}

const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}

exports.validateSignupData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Must not be empty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Must be a valid email address';
    }

    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (data.password !== data.confirmPassword)
        errors.confirmPassword = 'Passwords must match';
    if (isEmpty(data.handle)) {
        errors.handle = 'Must not be empty';
    } else if (data.handle.length > 10) {
        errors.handle = 'Handle is too long'
    }


    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateLoginData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) errors.loginEmail = 'Must not be empty';
    if (isEmpty(data.password)) errors.loginPassword = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    userDetails.completed = data.completed;

    return userDetails
}

exports.validateGoals = (data) => {
    let errors = {};

    if (isNaN(Number(data.goal)) || isEmpty(data.goal)) errors.goal = 'Goal must be a number!';
    if (isEmpty(data.name)) errors.name = 'Name your challenge';
    if (isEmpty(data.description)) errors.description = 'What is it you need to do? (e.g. "Do 10 pushups")';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateAddFriend = (friendUid, uid) => {
    let errors = {};

    if (friendUid.length !== 28 || friendUid.length === 0) {
        errors.id = 'Invalid friend code'
    } else if (friendUid === uid) {
        errors.id = `You can't be friends with yourself... can you?`
    }


    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}

exports.validateNewValue = (newValue, inputValue) => {
    let errors = {};
    console.log('input', inputValue)
    console.log('new', newValue)


    if (inputValue < 0) {
        errors.value = 'Stop looking for bugs. There are none.'
    }
    else if (newValue === null || inputValue === null) {
        errors.value = 'Must be a number!'
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}