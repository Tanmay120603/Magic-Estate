import "./select.scss"

function Select({optionValues,selectName,selectId,labelText,defaultOption,handleChange,handleBlur,className}){
    return(
        <div className={"default-styling"+" "+className}>
        <label htmlFor={selectId}>{labelText}</label>
        <select name={selectName} id={selectId} onChange={handleChange} onBlur={handleBlur}>
            <option hidden={true}>{defaultOption}</option>
            {optionValues.map((optionValue,index)=><option key={index} value={optionValue}>{optionValue}</option>)}
        </select>
        </div>
    )
}

export default Select