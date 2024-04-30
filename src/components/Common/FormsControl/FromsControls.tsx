import React from 'react';
import s from './FromsControls.module.css'
import {Checkbox as AntdCheckbox, Input as AntdInput} from 'antd';

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
    return <FormsControl {...props}><AntdInput.TextArea
        style={{margin: "10px 0"}} {...input} {...restProps}/></FormsControl>
};

export const Input = (props: any) => {
    const {input, meta, ...restProps} = props
    return <FormsControl {...props}><AntdInput {...input} {...restProps}/></FormsControl>
};

export const CheckBox = (props: any) => {
    const {input, meta, label, ...restProps} = props
    return <FormsControl {...props}><AntdCheckbox {...input} {...restProps}>{label}</AntdCheckbox></FormsControl>
};
