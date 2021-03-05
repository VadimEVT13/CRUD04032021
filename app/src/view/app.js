import React                from 'react';
import { store, actions }   from '../store/store.js';
import EmployerView         from './employer-view.js';

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