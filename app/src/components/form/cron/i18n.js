export const defaultLocales = {
    en: {
        every: "Every",
        mminutes: "minute(s)",
        hoursOnMinute: "hour(s) on minute",
        daysAt: "day(s) at",
        at: "at",
        onThe: "On the",
        dayOfEvery: "day, of every",
        monthsAt: "month(s), at",
        everyDay: "Every",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
        hasToBeBetween: "Has to be between",
        and: "and",
        minutes: "MINUTES",
        hourly: "HOURLY",
        daily: "DAILY",
        weekly: "WEEKLY",
        monthly: "MONTHLY",
        advanced: "ADVANCED",
        cronExpression: "Cron expression:"
    },
    pl: {
        every: "Co",
        mminutes: "minut",
        hoursOnMinute: "godzin w minucie",
        daysAt: "dni o",
        at: "o",
        onThe: "",
        dayOfEvery: "dzień miesiąca, co",
        monthsAt: "miesięcy, o godzinie",
        everyDay: "W każdy",
        mon: "Pon",
        tue: "Wt",
        wed: "Śr",
        thu: "Czw",
        fri: "Pt",
        sat: "So",
        sun: "Nie",
        hasToBeBetween: "Wymagana wartość pomiędzy",
        and: "i",
        minutes: "MINUTY",
        hourly: "GODZINY",
        daily: "DNI",
        weekly: "TYGODNIE",
        monthly: "MIESIĄCE",
        advanced: "ZAAWANSOWANE",
        cronExpression: "Wyrażenie cron:"
    },
    it: {
        every: "Ogni",
        mminutes: "minuto/i",
        hoursOnMinute: "ora/e al minuto",
        daysAt: "giorno/i alle",
        at: "alle",
        onThe: "Al",
        dayOfEvery: "giorno, di ogni",
        monthsAt: "mese/i, alle",
        everyDay: "Ogni",
        mon: "Lun",
        tue: "Mar",
        wed: "Mer",
        thu: "Gio",
        fri: "Ven",
        sat: "Sab",
        sun: "Dom",
        hasToBeBetween: "Deve essere tra",
        and: "e",
        minutes: "MINUTI",
        hourly: "OGNI ORA",
        daily: "OGNI GIORNO",
        weekly: "OGNI SETTIMANA",
        monthly: "OGNI MESE",
        advanced: "AVANZATO",
        cronExpression: "Espressione cron:"
    },
    pt: {
        every: "A cada",
        mminutes: "minuto(s)",
        hoursOnMinute: "horas(s) deste minuto",
        daysAt: "dias(s) às",
        at: "às",
        onThe: "No ",
        dayOfEvery: "dia, de todos",
        monthsAt: "mês(es), às",
        everyDay: "Todo(a)",
        mon: "Seg",
        tue: "Ter",
        wed: "Qua",
        thu: "Qui",
        fri: "Sex",
        sat: "Sab",
        sun: "Dom",
        hasToBeBetween: "Deve ser entre",
        and: "e",
        minutes: "MINUTOS",
        hourly: "HORAS",
        daily: "DIÁRIO",
        weekly: "SEMANAL",
        monthly: "MENSAL",
        advanced: "AVANÇADO",
        cronExpression: "Expressão cron:"
    },
    es: {
        every: "Cada",
        mminutes: "minuto(s)",
        hoursOnMinute: "hora(s), en el minuto",
        daysAt: "dia(s) a las",
        at: "a las",
        onThe: "El día",
        dayOfEvery: "del mes, cada",
        monthsAt: "mes(es), a las",
        everyDay: "Cada",
        mon: "Lun",
        tue: "Mar",
        wed: "Mie",
        thu: "Jue",
        fri: "Vie",
        sat: "Sáb",
        sun: "Dom",
        hasToBeBetween: "Entre",
        and: "y",
        minutes: "CADA MINUTO(s)",
        hourly: "CADA HORA(s)",
        daily: "DIARIAMENTE",
        weekly: "SEMANALMENTE",
        monthly: "MENSUALMENTE",
        advanced: "AVANZADO",
        cronExpression: "Expresión CRON:"
    }
};
export function toCronstrueLocale(locale) {
    if (locale == "pt")
        return "pt_BR";
    else
        return locale;
}
export function createI18n(customLocales, locale) {
    const allLocales = Object.assign(Object.assign({}, defaultLocales), customLocales);
    return allLocales[locale] || allLocales["en"];
}