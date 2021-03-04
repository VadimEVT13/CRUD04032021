import React                from 'react';
import { store, actions }   from '../store/store.js';
import MaterialTable        from "material-table";
import Select               from '@material-ui/core/Select';
import MenuItem             from '@material-ui/core/MenuItem';

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
                        render: rowData => 
                            <a href="#" onClick={() => {
                                console.log(rowData);
                            }}>
                                {rowData.soname}
                            </a>
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
                                value={props.value}
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
                        lookup: { true: 'Есть', false: 'Отсутствуют' },
                        editComponent: props => (
                            <Select 
                                value={props.value}
                                onChange={e => props.onChange(e.target.value)}
                                >                                
                                <MenuItem value="true">Есть</MenuItem >
                                <MenuItem value="false">Отсутствуют</MenuItem >
                            </Select>
                        )
                    }
                ]}
                data={this.state.data}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            newData.birthDay        = newData.birthDay == null ?        undefined : new Date(newData.birthDay);
                            newData.employmentDate  = newData.employmentDate == null ?  undefined : new Date(newData.employmentDate);
                            newData.dismissal       = newData.dismissal == null ?       undefined : new Date(newData.dismissal);
                            newData.driverLicense   = newData.driverLicense == 'false' ?  false : true;

                            store({ name: actions.MODIF }, newData)
                            this.update();
                            resolve();
                        }, 1000)
                    })
                }}
            />            
        );
    }
}

export default EmployerView;