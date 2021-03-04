//https://habr.com/ru/post/349164/
//localStorage Может содержать только строки, что делает его совершенно бесполезным, если речь идёт хоть о чем-то сложнее строк


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
            console.log("Сотрудник с ID=" + employer.id + " существует");
            return;
        } else {
            employer.id = maxIndex() + 1;
    
            var storeObj = store({ name: actions.GET });
            storeObj.push(employer);
    
            var serialObj = JSON.stringify(storeObj);
            localStorage.setItem("Store", serialObj);
            console.log("Сотрудник добавлен ID=" + employer.id);
        }       
    } else {
        console.log("Сотрудник не добавлен");
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
function isExist(employer) {
    var storeObj = store({ name: actions.GET });
    for(let i = 0; i < storeObj.length; i++) {
        console.log(storeObj[i].id);
        console.log(employer.id);
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
    console.log("M");
    console.log(employer);
    console.log(store({ name: actions.GET }));
    if(!confirm(employer)) {
        console.log("Неправильно введён сотрудник");
        return;
    }   

    console.log('!');
    var index = isExist(employer);
    if(index == undefined) {
        console.log("Такого сотрудника не существует");
        return;
    } else {
        var storeObj = store({ name: actions.GET });
        storeObj[index] = employer;
        allDataSet(storeObj);
    }
}

function del() {

}

function get() {
    var storeObj = JSON.parse(localStorage.getItem("Store"));
    if(storeObj == null || storeObj == undefined) {
        return [];
    } else {
        storeObj.forEach(function(item, i, storeObj)
        {
            var itemWithType = item;
            item.birthDay       = new Date(item.birthDay);
            item.employmentDate = new Date(item.employmentDate);
            item.dismissal      = new Date(item.dismissal);
            item                = new Boolean(item.driverLicense);
        })
        return storeObj;
    }
}

function confirm(employer) {
    if(typeof(employer) == typeof(undefined)) {
        console.log("Сотрудник не задан");
        return Boolean(false);
    }   

    //console.log(typeof(employerExample.soname)          == typeof(employer.soname));
    //console.log(typeof(employerExample.name)            == typeof(employer.name));
    //console.log(typeof(employerExample.position)        == typeof(employer.position));
    //console.log(typeof(employerExample.birthDay)        == typeof(employer.birthDay));
    //console.log(typeof(employerExample.sex)             == typeof(employer.sex));
    //console.log(typeof(employerExample.employmentDate)  == typeof(employer.employmentDate));
    //console.log(typeof(employerExample.driverLicense)   == typeof(employer.driverLicense));
    //console.log((typeof(employerExample.patronymic)     == typeof(employer.patronymic) || 
    //typeof(employer.patronymic)         == typeof(undefined)));
    //console.log((typeof(employerExample.dismissal)      == typeof(employer.dismissal) || 
    //typeof(employer.patronymic)         == typeof(undefined)));

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
                typeof(employer.patronymic)         == typeof(undefined))                      
        )
    ) {
        console.log("Не правильно задан сотрудник");
        return Boolean(false);
    } else {
        // --- Можно работать с таким сотрудником ---
        console.log("Тип основных параметров верн");
        if(typeof(employer.dismissal) != typeof(undefined)) {
            if(employer.dismissal < employerExample.employmentDate) {
                console.log("Дата увольнения сотрудника раньше, чем дата устройства на работу");
                return Boolean(false);
            } else {
                console.log("Параметры сотрудника верны");
                return Boolean(true);
            }
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
            return del();
        case actions.GET:
            return get();
        case actions.SET:
            return allDataSet();

        default: alert("Действие " + action.name + " не опередено");
    }
}

export { store, actions };