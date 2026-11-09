/* Election Models: routes. */
route('GET','/model/forecast',({query})=>T_forecast(query.race,+query.turnout||0,+query.swing||0));
