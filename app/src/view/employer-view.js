import React                from 'react';
import MaterialTable        from "material-table";

// --- Работа с хранилищем ---
import { store, actions, IEmployer }   from '../store/store.tsx';

// --- Колонки, иконки и локализация для material table ---
import { tableIcons }       from '../materialTable/tableIcons'; 
import { localization }     from '../materialTable/localization';
import { columns }          from '../materialTable/columns';

// --- Инициализируем данные ---
import { init }             from '../initialData/initialData.tsx';
init(); // Запускается один раз, для повтоного запуска удалите флаг isInit в хранилище домена

class EmployerView extends React.Component {
    constructor(props) {
        super(props);

        // --- Функции ---
        this.update = this.update.bind(this);
        
        // --- Трансформация данных из {{key0}: {value0}, {key1}: {value1}} to [{value0+key0}, {value1+key1}]
        let data = [];
        let input = store(actions.GET);
        Object.keys(input).forEach(element => {
            input[element].id = parseInt(element);
            data.push(input[element]);
        });

        // --- State ---
        this.state = {
            data: data
        };
    }
    
    update() {
        let data = [];
        let input = store(actions.GET);
        Object.keys(input).forEach(element => {
            input[element].id = parseInt(element);
            data.push(input[element]);
        });

        this.setState({data: data});
    }

    render() {
        return (
            <MaterialTable 
                title='Сотрудники компании'
                
                options={{
                    pageSize: 10,
                    rowStyle: {
                        backgroundColor: '#EEE',
                    }
                }}                
                localization={localization}
                icons={tableIcons}
                columns={columns}
                data={this.state.data}
                editable={{
                    // --- Добавление сотрудника ---
                    onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            store(actions.ADD, newData);
                            this.update();                            
                            resolve();
                        }, 1000)
                    }),
                    // --- Изменение сотрудника ---
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            store(actions.MODIF, newData, newData.id)
                            this.update();
                            resolve();
                        }, 1000)
                    }),
                    // --- Удаление сотрудника ---
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            store(actions.DEL, oldData, oldData.id);
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