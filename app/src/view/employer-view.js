import React                from 'react';
import { store, actions }   from '../store/store.js';
import MaterialTable        from "material-table";
import Select               from '@material-ui/core/Select';
import MenuItem             from '@material-ui/core/MenuItem';
import Checkbox             from '@material-ui/core/Checkbox';

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
                options={{
                    pageSize: 10
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
                        type:   "string"
                    },                    
                    {
                        title:  "Имя",
                        field:  "name",
                        type:   "string"
                    },                    
                    {
                        title:  "Отчество",
                        field:  "patronymic",
                        type:   "string"
                    },                    
                    {
                        title:  "Должность",
                        field:  "position",
                        type:   "string"
                    },                    
                    {
                        title:  "День рождения",
                        field:  "birthDay",
                        type:   "date"
                    },                    
                    {
                        title:  "Пол",
                        field:  "sex",
                        editComponent: props => (
                            <Select 
                                value={props.value || ''}
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
                        type:   "date"
                    },                    
                    {
                        title:  "Дата увольнения",
                        field:  "dismissal",
                        type:   "date"
                    },                    
                    {
                        title:  "Наличие водительских прав",
                        field:  "driverLicense",
                        type:   "boolean",
                        editComponent: props => (
                            <Checkbox 
                                checked={ props.value || false }
                                onChange={e => { 
                                     
                                    console.log(props); 
                                    props.onChange(e.target.checked); }}
                                >
                            </Checkbox>
                        )
                    }
                ]}
                data={this.state.data}
                editable={{
                    onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            newData.birthDay        = newData.birthDay == null ?            undefined : new Date(newData.birthDay);
                            newData.employmentDate  = newData.employmentDate == null ?      undefined : new Date(newData.employmentDate);
                            newData.dismissal       = newData.dismissal == null ?           undefined : new Date(newData.dismissal);
                            newData.driverLicense   = newData.driverLicense == undefined ?  false : newData.driverLicense;

                            store({ name: actions.ADD }, newData);
                            this.update();                            
                            resolve();
                        }, 1000)
                    }),
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