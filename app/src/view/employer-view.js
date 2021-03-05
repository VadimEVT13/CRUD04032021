import React                from 'react';
import { store, actions }   from '../store/store.js';
import MaterialTable        from "material-table";
import Select               from '@material-ui/core/Select';
import MenuItem             from '@material-ui/core/MenuItem';
import Checkbox             from '@material-ui/core/Checkbox';
import ruLocale             from 'date-fns/locale/ru';

import AddBox               from '@material-ui/icons/AddBox';
import ArrowDownward        from '@material-ui/icons/ArrowDownward';
import Check                from '@material-ui/icons/Check';
import ChevronLeft          from '@material-ui/icons/ChevronLeft';
import ChevronRight         from '@material-ui/icons/ChevronRight';
import Clear                from '@material-ui/icons/Clear';
import DeleteOutline        from '@material-ui/icons/DeleteOutline';
import Edit                 from '@material-ui/icons/Edit';
import FilterList           from '@material-ui/icons/FilterList';
import FirstPage            from '@material-ui/icons/FirstPage';
import LastPage             from '@material-ui/icons/LastPage';
import Remove               from '@material-ui/icons/Remove';
import SaveAlt              from '@material-ui/icons/SaveAlt';
import Search               from '@material-ui/icons/Search';
import ViewColumn           from '@material-ui/icons/ViewColumn';

import { forwardRef }       from 'react';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class EmployerView extends React.Component {
    constructor(props) {
        super(props);

        // --- Функции ---
        this.update = this.update.bind(this);
        
        // --- State ---
        this.state = {
            data: store({ name: actions.GET })
        };
    }
    
    update() {
        this.setState({data: store({ name: actions.GET })});
    }

    render() {
        return (
            <MaterialTable 
                title='Сотрудники компании'
                localization={{
                    body: {
                        emptyDataSourceMessage: "Нет данных",
                        addTooltip: 'Добавить',
                        deleteTooltip: 'Удалить',
                        editTooltip: 'Изменить',
                        editRow: {
                            deleteText: "Удалить сотрудника?",
                            cancelTooltip: 'Отменить',
                            saveTooltip: 'Сохранить'
                        },
                        dateTimePickerLocalization: ruLocale
                    },
                    pagination: {                        
                        firstTooltip: 'Первая страница',
                        previousTooltip: 'Предыдущая страница',
                        nextTooltip: 'Следующая страница',
                        labelDisplayedRows: '{from}-{to} из {count}',
                        lastTooltip: 'Последняя страница',
                        labelRowsSelect: 'строк'
                    },
                    header: {
                        actions: 'Действия'
                    },
                    toolbar: {
                        searchTooltip: 'Поиск',
                        searchPlaceholder: 'Поиск'
                    }
                }}
                options={{
                    pageSize: 10,
                    rowStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                icons={tableIcons}
                columns={[
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
                                value={props.value || "Мужчина"}
                                onChange={e => props.onChange(e.target.value)}
                                >
                                
                                <MenuItem value="Мужчина">Мужчина</MenuItem >
                                <MenuItem value="Женщина">Женщина</MenuItem >
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
                            rowData.employmentDate != undefined ?               // Дата устройства задана? 
                                rowData.dismissal < rowData.employmentDate ?    // Увольнения < устройства 
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
                ]}
                data={this.state.data}
                editable={{
                    // --- Добавление сотрудника ---
                    onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            newData.birthDay        = newData.birthDay == null ?            undefined : new Date(newData.birthDay);
                            newData.employmentDate  = newData.employmentDate == null ?      undefined : new Date(newData.employmentDate);
                            newData.dismissal       = newData.dismissal == null ?           undefined : new Date(newData.dismissal);
                            newData.driverLicense   = newData.driverLicense == undefined ?  false : newData.driverLicense;
                            newData.sex             = newData.sex == undefined ?            "Мужчина" : newData.sex;

                            store({ name: actions.ADD }, newData);
                            this.update();                            
                            resolve();
                        }, 1000)
                    }),
                    // --- Изменение сотрудника ---
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            newData.birthDay        = newData.birthDay == null ?        undefined : new Date(newData.birthDay);
                            newData.employmentDate  = newData.employmentDate == null ?  undefined : new Date(newData.employmentDate);
                            newData.dismissal       = newData.dismissal == null ?       undefined : new Date(newData.dismissal);

                            store({ name: actions.MODIF }, newData)
                            this.update();
                            resolve();
                        }, 1000)
                    }),
                    // --- Удаление сотрудника ---
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            store({ name: actions.DEL }, oldData);
                            this.update();
                            resolve()
                      }, 1000)
                    })
                }}
            />            
        );
    }
}

export default EmployerView;