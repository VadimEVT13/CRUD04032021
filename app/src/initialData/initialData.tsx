// @ts-ignore
import { store, actions, IEmployer } from '../store/store.tsx'

var employer_1 : IEmployer = {
    soname:         "Артемьев",
    name:           "Вадим",
    patronymic:     "Владимирович",
    position:       "Программист",
    birthDay:       new Date('1995-08-27'),
    sex:            "М",
    employmentDate: new Date('2021-03-09'),
    dismissal:      undefined,
    driverLicense:  false
}
var employer_2 : IEmployer = {
    soname:         "Иванов",
    name:           "Иван",
    patronymic:     "Иванович",
    position:       "Программист",
    birthDay:       new Date('1994-11-20'),
    sex:            "М",
    employmentDate: new Date('2021-03-09'),
    dismissal:      undefined,
    driverLicense:  true
}
var employer_3 : IEmployer = {
    soname:         "Васильева",
    name:           "Василиса",
    patronymic:     "Васильевна",
    position:       "Менеджер",
    birthDay:       new Date('1990-03-01'),
    sex:            "Ж",
    employmentDate: new Date('2020-03-09'),
    dismissal:      new Date('2021-03-09'),
    driverLicense:  false
}

export function init() {
    if(localStorage.getItem("isInit") == null) {
        store(actions.ADD, employer_1);
        store(actions.ADD, employer_2);
        store(actions.ADD, employer_3);

        localStorage.setItem("isInit", "true");
    }
}