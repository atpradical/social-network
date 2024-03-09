export const requiredFiled = (value: string) => {
    return value ? undefined : "Field is required";
}
export const maxLengthCreator = (maxLength: number) => (value: string) => {
    return value && value.length < maxLength ?  undefined: `Max length is ${maxLength} symbols`;
}