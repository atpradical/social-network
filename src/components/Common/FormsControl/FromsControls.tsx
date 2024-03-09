import React from 'react';
import s from './FromsControls.module.css'

const FormsControl = ({input, meta, element, ...props}: any) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const TextArea = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormsControl {...props}><textarea {...input} {...restProps}/></FormsControl>
};

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormsControl {...props}><input {...input} {...restProps}/></FormsControl>
};
