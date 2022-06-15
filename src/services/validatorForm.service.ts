export function validateForm(inputName: string, value: string): string {
    if (inputName === 'login') {
        if (value.length < 3 || value.length > 20) {
            return 'Number of characters from 3 to 20 characters';
        } else if (value.match(/[\s\W]/g)) {
            return 'Latin only and no special characters except underscore';
        } else if (!isNaN(+value)) {
            return 'Login cannot consist only of numbers';
        } else {
            return '';
        }
    }

    if (inputName === 'password') {
        if (value.length < 8 || value.length > 40) {
            return 'Number of characters from 8 to 40 characters';
        } else if (value === value.toLowerCase() || !value.match(/\d+/)) {
            return 'Password must contain one capital letter and a number';
        } else {
            return '';
        }
    }

    if (inputName === 'first_name' || inputName === 'second_name') {
        if (value.length && value[0] === value[0].toLowerCase()) {
            return 'First letter must be capitalized';
        } else if (!value.match(/^[а-яa-z]+(?:['_.\s][a-z]+)*$/i)){
            return 'Check for correct name';
        } else {
            return '';
        }
    }

    if (inputName === 'email') {
        if (!value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return 'Check if the email is correct';
        } else {
            return '';
        }
    }

    if (inputName === 'phone') {
        if (value.length < 10 || value.length > 15) {
            return 'Number of characters from 10 to 15 characters';
        } else {
            return '';
        }
    }

    return '';
}
