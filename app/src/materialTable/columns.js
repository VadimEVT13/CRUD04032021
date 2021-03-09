import React                from 'react';
import Select               from '@material-ui/core/Select';
import MenuItem             from '@material-ui/core/MenuItem';
import Checkbox             from '@material-ui/core/Checkbox';

const columns=[
    {
        title:      "ID",
        field:      "id",
        type:       "numeric",
        editable:   "never"
    },                    
    {
        title:  "Фамилия",
        field:  "soname",
        type:   "string",
        validate: rowData => (rowData.soname != undefined ?
            rowData.soname.match(/^[А-Я][а-я]*$/g) == null : true) ? 
        { isValid: false, helperText: 'Фамилия обязательно задаётся с большой буквы. Русские буквы без пробелов' } : true
    },                    
    {
        title:  "Имя",
        field:  "name",
        type:   "string",
        validate: rowData => (rowData.name != undefined ?
            rowData.name.match(/^[А-Я][а-я]*$/g) == null : true) ? 
        { isValid: false, helperText: 'Имя обязательно задаётся с большой буквы. Русские буквы без пробелов' } : true
    },                    
    {
        title:  "Отчество",
        field:  "patronymic",
        type:   "string",
        validate: rowData => (rowData.patronymic != undefined ? 
            rowData.patronymic.match(/^[А-Я]*$|^[А-Я][а-я]*$/g) == null : false) ? 
        { isValid: false, helperText: 'Отчество задаётся не обязательно с большой буквы. Русские буквы без пробелов' } : true
    },                    
    {
        title:  "Должность",
        field:  "position",
        type:   "string",
        validate: rowData => (rowData.position != undefined ? 
            rowData.position.match(/^[А-Я][а-я]*$/g) == null : true) ? 
        { isValid: false, helperText: 'Должность обязательно задаётся с большой буквы. Русские буквы без пробелов' } : true
    },                    
    {
        title:  "День рождения",
        field:  "birthDay",
        type:   "date",
        validate: rowData => rowData.birthDay == undefined ?
        { isValid: false, helperText: 'День рождения задаётся обязательно' } : true
    },                    
    {
        title:  "Пол",
        field:  "sex",
        type:   "string",
        editComponent: props => (
            <Select 
                value={props.value || "М"}
                onChange={e => props.onChange(e.target.value)}
                >
                
                <MenuItem value="М">М</MenuItem >
                <MenuItem value="Ж">Ж</MenuItem >
            </Select>
        )
    },                    
    {
        title:  "Дата трудоустройства",
        field:  "employmentDate",
        type:   "date",
        validate: rowData => rowData.employmentDate == undefined ?
        { isValid: false, helperText: 'Дата трудоустройства задаётся обязательно' } : true
    },                    
    {
        title:  "Дата увольнения",
        field:  "dismissal",
        type:   "date",
        validate: rowData => rowData.dismissal != undefined ?   // Дата увольнения задана?
            rowData.employmentDate != undefined?                // Дата устройства задана? 
                new Date(rowData.dismissal) < new Date(rowData.employmentDate) ?    // Увольнения < устройства 
                    { isValid: false, helperText: 'Дата увольнения должна быть позже даты устройства на работу' } : true
                : { isValid: false, helperText: 'Задайте дату трудоустройства' }   //надо задать                                         
            : true                                              // Ничего не задано, принять
    },                    
    {
        title:  "Наличие водительских прав",
        field:  "driverLicense",
        type:   "boolean",
        editComponent: props => (
            <Checkbox 
                checked={ props.value || false }
                onChange={e => { 
                    props.onChange(e.target.checked); }}
                >
            </Checkbox>
        )
    }
]

export { columns };