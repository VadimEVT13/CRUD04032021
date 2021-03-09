export interface IEmployer {
    soname:             string;
    name:               string;
    patronymic:         string;
    position:           string;
    birthDay:           Date;
    sex:                string;
    employmentDate:     Date;
    dismissal:          Date;
    driverLicense:      boolean;
}

export enum actions {
    ADD     ='ADD',
    MODIF   ='MODIF',
    DEL     ='DEL',
    GET     ='GET'
}

function add(employer : IEmployer) {
    let store = get();
    if(Object.keys(store).length == 0) {
        store[0] = employer;
    } else {
        let index: number = +Object.keys(store).reduce(function(a, b) { return a > b ? a : b})
        store[index + 1] = employer;
    }
    set(store);
}

function set(data: {[id: number]: IEmployer}) {
    localStorage.setItem("Store", JSON.stringify(data));
}

function modif(employer: IEmployer, id: number) {
    let store = get();
    store[id] = employer;
    set(store);
}

function del(id: number) {
    let store = get();
    delete store[id];
    set(store);
}

function get(): {[id: number]: IEmployer} {
    let store: {[id: number]: IEmployer} = 
        JSON.parse(localStorage.getItem("Store"));
    return store == null ? {} : store;
}

export function store(action: actions, employer: IEmployer, id: number = -1) {
    switch(action) {
        case actions.ADD:
            return add(employer);
        case actions.MODIF:
            return modif(employer, id);
        case actions.DEL:
            return del(id);
        case actions.GET:
            return get();

        default: console.log("Действие " + action + " не опередено");
    }
}