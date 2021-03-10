import cuid from 'cuid';

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
    store[cuid()] = employer;
    set(store);
}

function set(data: {[id: string]: IEmployer}) {
    localStorage.setItem("Store", JSON.stringify(data));
}

function modif(employer: IEmployer, id: string) {
    let store = get();
    store[id] = employer;
    set(store);
}

function del(id: string) {
    let store = get();
    delete store[id];
    set(store);
}

function get(): {[id: string]: IEmployer} {
    let store: {[id: string]: IEmployer} = 
        JSON.parse(localStorage.getItem("Store"));
    return store == null ? {} : store;
}

export function store(action: actions, employer: IEmployer, id: string = undefined) {
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