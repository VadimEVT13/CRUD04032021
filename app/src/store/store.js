var employerExample = {
    id:             0,
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

const actions = {
    ADD:    'ADD',
    MODIF:  'MODIF',
    DEL:    'DEL',
    GET:    'GET',
    SET:    'SET'
}

function add(employer) {
    if(confirm(employer)) {
        if(isExist(employer) != undefined) {
            return;
        } else {
            employer.id = maxIndex() + 1;
    
            var storeObj = store({ name: actions.GET });
            storeObj.push(employer);
    
            var serialObj = JSON.stringify(storeObj);
            localStorage.setItem("Store", serialObj);
        }       
    } else {
    }
}

// --- Возвращает наибольший индекс сотрудника ---
function maxIndex() {
    var storeObj = store({ name: actions.GET });
    var index = 0;

    storeObj.forEach(function(item, i, storeObj) {
        index = item.id;
    });

    return index;
}

// --- Существует ли сотрудник? Возвращает его индекс в массиве ---
// Возвращает undefined если не существует
function isExist(employer) {
    var storeObj = store({ name: actions.GET });
    for(let i = 0; i < storeObj.length; i++) {
        if(employer.id == storeObj[i].id) {
            return i;
        }
    }

    return undefined;
}

// --- Обновить все данные ---
function allDataSet(data) {
    var serialObj = JSON.stringify(data);
    localStorage.setItem("Store", serialObj);
}

function modif(employer) {
    if(!confirm(employer)) {
        return;
    }   

    var index = isExist(employer);
    if(index == undefined) {
        return;
    } else {
        var storeObj = store({ name: actions.GET });
        storeObj[index] = employer;
        allDataSet(storeObj);
    }
}

function del(employer) {
    var index = isExist(employer);
    if(index != undefined) {
        var storeObj = store({ name: actions.GET });
        storeObj.splice(index, 1);
        allDataSet(storeObj);
    } else {
    }
}

function get() {
    var storeObj = JSON.parse(localStorage.getItem("Store"));
    if(storeObj == null || storeObj == undefined) {
        return [];
    } else { 
        return storeObj;
    }
}

function confirm(employer) {
    if(typeof(employer) == typeof(undefined)) {
        return Boolean(false);
    }   

    if(
        !(
            typeof(employerExample.soname)          == typeof(employer.soname)          &&
            typeof(employerExample.name)            == typeof(employer.name)            &&
            typeof(employerExample.position)        == typeof(employer.position)        &&
            typeof(employerExample.birthDay)        == typeof(employer.birthDay)        &&
            typeof(employerExample.sex)             == typeof(employer.sex)             &&
            typeof(employerExample.employmentDate)  == typeof(employer.employmentDate)  &&
            typeof(employerExample.driverLicense)   == typeof(employer.driverLicense)   &&

            (typeof(employerExample.patronymic)     == typeof(employer.patronymic) || 
                typeof(employer.patronymic)         == typeof(undefined))               && 
            (typeof(employerExample.dismissal)      == typeof(employer.dismissal) || 
                typeof(employer.dismissal)         == typeof(undefined))                      
        )
    ) {
        return Boolean(false);
    } else {
        // --- Можно работать с таким сотрудником ---
        if(typeof(employer.dismissal) != typeof(undefined)) {
            if(employer.dismissal < employer.employmentDate) {
                return Boolean(false);
            } else {
                return Boolean(true);
            }
        } else {
            return Boolean(true);
        }
    }
}

function store(action, employer) {
    switch(action.name) {
        case actions.ADD:
            return add(employer);
        case actions.MODIF:
            return modif(employer);
        case actions.DEL:
            return del(employer);
        case actions.GET:
            return get();

        default: console.log("Действие " + action.name + " не опередено");
    }
}

export { store, actions };