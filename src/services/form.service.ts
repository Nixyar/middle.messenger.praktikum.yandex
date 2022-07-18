import {validateForm} from "./validatorForm.service";

export function blurValidationForm(input: HTMLInputElement, values: object, errors?: object): object {
    const value = input.value.replace("(?i)(\\b)(on\\S+)(\\s*)=|javascript:|(<\\s*)(\\/*)script|style(\\s*)=|(<\\s*)meta", "");
    const data = {...values};
    const error = {...errors};

    if (errors) {
        // @ts-ignore
        error[input.name] = validateForm(input.name, value);
    }

    // @ts-ignore
    data[input.name] = value;

    return {
        values: {...data},
        errors: {...error},
    };
}

export function submitFormCheck(values: object, errors: object): object | undefined {
    const data = {...values};
    const error = {...errors};
    // Проверка на ошибки
    for (const keyVal in data) {
        if (data.hasOwnProperty(keyVal)) {
            // @ts-ignore
            error[keyVal] = validateForm(keyVal, data[keyVal]);
        }
    }

    // Если поля не были заполнены или не исправлена ошибка, то вернет все ошибки, иначе покажет результат формы
    for (const keyVal in error) {
        if (error.hasOwnProperty(keyVal)) {
            // @ts-ignore
            if (error[keyVal].length) {
                return {
                    values: {...data},
                    errors: {...error},
                };
            }
        }
    }
}
