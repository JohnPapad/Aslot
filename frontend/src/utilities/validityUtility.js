export const checkValidity = ( value, rules, name ) => {

    if ( !rules ) {
        return {report: true, msg: ""}
    }

    if ( rules.required && value.trim() === '' )
    {
        return {report: false, msg: "Required"};
    }

    if ( rules.minLength && (value.length < rules.minLength) )
    {
        return {report: false, msg: "It must contain at least " + rules.minLength + " characters"};
    }

    if ( rules.maxLength && (value.length > rules.maxLength))
    {
        return {report: false, msg: "It must not contain more than " + rules.maxLength + " characters"};
    }

    if ( rules.isEmail ) {
        const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-][a-zA-Z0-9-]+)+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Please provide a valid email address"};
        }
    }

    if ( rules.isPassword ) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Password must only contain latin characters, at leat 1 upper, lower case letter and 1 number"}
        }
    }

    if ( rules.onlyLetters ) {
        const pattern = /^[a-zA-Z]+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "It must only contain letters"}
        }
	}
	
	if ( rules.onlyLettersDotsAndSpace ) {
        const pattern = /^[a-zA-Zα-ωΑ-Ω\. ]+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "It must only contain letters, dots or spaces"}
        }
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "It must only contain numbers"};
        }
    }

    if ( rules.isTel ) {
        if (value.length != 10)
        {
            return {report: false, msg: "Please enter a correct telephone number"};
        }

        const pattern = /^\d+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Please enter a correct telephone number"};
        }
    }

    if ( rules.isTimeDur ) {
        const pattern= /^([0-2][0-9])\:([0-5][0-9])\-([0-2][0-9])\:([0-5][0-9])$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "Please enter correct opening closing times"};
        }
    }

    if ( rules.isMinutes ) {
        const pattern = /^\d+$/;
        if (!pattern.test( value ) )
        {
            return {report: false, msg: "It must be minutes"};
        }

        if (value.length > 2)
        {
            return {report: false, msg: "It must be minutes"};
        }
    }

    return {report: true, msg: ""};
}
