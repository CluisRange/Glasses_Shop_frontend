import { FC } from 'react'

interface Props {
    value: string
    valuetype: string
    placeholder?: string
    inputClass?: string
    setValue: (value: { [key: string]: string }) => void
    date: boolean
}

const InputField: FC<Props> = ({ value, valuetype, placeholder, inputClass, setValue, date}) => {

    return (
            <div className="inputField" style={{ width: '50%' }}>
                <input 
                    value={value} 
                    className={inputClass} 
                    placeholder={placeholder} 
                    onChange={(e) => setValue({[valuetype]: e.target.value})} 
                    style={{ width: '100%' }}
                    type={date ? 'date' : 'text'}
                />   
            </div>
        );
}

export default InputField
