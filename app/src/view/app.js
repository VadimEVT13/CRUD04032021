import React                from 'react';
import { store, actions }   from '../store/store.js';
import EmployerView         from './employer-view.js'

var employerExample = {
    soname:         "Артемьев",
    name:           "Вадим",
    patronymic:     "Владимирович",
    position:       "Программист",
    birthDay:       new Date("August 27, 1995"),
    sex:            "Мужчина",
    employmentDate: new Date("March 04, 2021"),
    dismissal:      new Date("March 11, 2021"),
    driverLicense:  Boolean(false)
  };
  
var employerList = [];

class App extends React.Component {
    constructor(props) {
        super(props);

        // --- Функции ---
        this.switchContext = this.switchContext.bind(this);
        
        // --- State ---
        this.state = {
            context: <EmployerView></EmployerView>,
            contextList: {
                MAIN_VIEW: "MAIN_VIEW"
            }
        };
        
        // ---  ДЛЯ ТЕСТА ---
        //store({ name: actions.ADD }, employerExample);
    }

    switchContext(name) {
        switch(name) {
            case this.state.contextList.MAIN_VIEW:
                return(
                    <EmployerView></EmployerView>
                );

            default: 
                return (
                    <div>
                        <h1>Bad apple</h1>
                    </div>
                );
        }
    } 

    render() {
      return (
        <div>
            {this.state.context}
        </div>
      );
    }
}

export default App;