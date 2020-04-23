import Chat from "./Chat";
import Modal from "./Modal";
import Loader from "./Loader";
import Events from './Events';

var DatePicker = require('@chenfengyuan/datepicker');


const App = (function () {
  // Privates
  const Selectors = {
    EventBtnClass: ".event-button" 
  }

  const EventHandlers = Events.GetEventHandlers();
  
  function SetupEvents(): void {
    $(document).on('click', Selectors.EventBtnClass ,(e) => {
      e.preventDefault();
      // event func identifier
      const eventFuncIndentifier: string = $(e.target).data('eventhandler');
      // checking if event obj has such func
      if(EventHandlers.hasOwnProperty(eventFuncIndentifier)) 
        EventHandlers[eventFuncIndentifier](e);
      else  
        throw new Error("No such eventFuncIndentifier prop on EventHandler obj! Wrong one provided!")
    });
  }
  
  function start() {
    SetupEvents();

    setTimeout(() => {
      Loader.hideLoader();
    }, 0);
  }

  return {
    start
  }
})()



jQuery(document).ready(() => App.start());
