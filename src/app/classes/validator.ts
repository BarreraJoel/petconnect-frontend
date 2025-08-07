import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Validator {

    public static email(domains: string[] = ["gmail.com", "hotmail.com", "outlook.com"]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const text = control.value as string;
            let contains;
            if (!text) {
                return null;
            }
            for (const domain of domains) {
                if (contains = text.includes(domain)) {
                    break;
                }
            }
            return contains ? null : { email_format: true };
        };
    }

    public static minFiles(min: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const files = control.value as FileList;
            if (!files || files.length < min) {
                return {
                    min_files: {
                        required_amount: min,
                        actual_amount: files ? files.length : 0
                    }
                };
            }
            return null;
        };
    }

    public static getErrorMessage(control: any): string {
        let errorMessage: string = "";

        if (control.errors) {
            const errorKey = Object.keys(control.errors);

            for (const key of errorKey) {
                switch (key) {
                    case "required":
                        errorMessage = "El campo es obligatorio";
                        break;
                    case "email":
                        errorMessage = "El correo ingresado no tiene un formato válido";
                        break;
                    case "pattern":
                        let pattern = control.getError("pattern");
                        errorMessage = "Solo se aceptan caracteres ";
                        switch (pattern.requiredPattern) {
                            case "^[a-zA-Z ]*$":
                                errorMessage += "alfabeticos";
                                break;
                            case "^[0-9]+$":
                                errorMessage += "númericos";
                                break;
                        }
                        break;
                    case "minlength":
                        errorMessage = `La cantidad mínima de caracteres es ${control?.errors?.['minlength'].requiredLength}`;
                        break;
                    case "maxlength":
                        errorMessage = `La cantidad máxima de caracteres es ${control?.errors?.['maxlength'].requiredLength}`;
                        break;
                    case "min":
                        errorMessage = `El número a ingresar debe ser igual o mayor a ${control?.errors?.['min'].min}`;
                        break;
                    case "max":
                        errorMessage = `El número a ingresar debe ser igual o menor a ${control?.errors?.['max'].max}`;
                        break;
                    case "min_files":
                        errorMessage = `La cantidad de fotos a elegir es ${control?.errors?.['min_files'].required_amount}`;
                        break;
                    case "equals":
                        errorMessage = `El campo ${control?.errors?.['equals'].field} no coincide`;
                        break;

                }
            }
        }
        return errorMessage;
    }

    public static optional(validatorOne: ValidatorFn, validatorTwo: ValidatorFn): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const errorOne = validatorOne(control);
            const errorTwo = validatorTwo(control);

            return !errorOne || !errorTwo ? null : { ...errorOne, ...errorTwo };
        };
    }

    public static equals(string: string, fieldName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            // console.log(control.value);
            // console.log(string);
            
            return control.value == string ? null : {
                equals: {
                    field: fieldName
                }
            };
        };
    }
}
