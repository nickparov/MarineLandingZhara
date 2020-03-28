import Chat from "./Chat";
import Modal from "./Modal";
import Loader from "./Loader";

const App = (function () {
  const Selectors = {
    EventBtnClass: ".event-button" 
  }
  
  interface EventHandlerObj {
    [key: string]: Function
  }
  
  const EventHandlers: EventHandlerObj = {
    OpenChat: function(e: JQuery.Event): void {
  
    },
    SendRequest: function(e: JQuery.Event): void {
      Modal.populateModal(
        "Send Request!", 
        `<input placeholder="Your message" name="message" class="form-control"/>`, 
        `<button class="btn btn-large btn-outline-primary">Send</button>`);
      Modal.show();
    }
  }
  
  function SetupEvents(): void {
    $(Selectors.EventBtnClass).on('click',(e) => {
      e.preventDefault();
      // event func identifier
      const eventFuncIndentifier: string = $(e.target).data('eventhandler');
      // checking if event obj has such func
      if(EventHandlers.hasOwnProperty(eventFuncIndentifier)) 
        EventHandlers[eventFuncIndentifier]();
      else  
        throw new Error("No such eventFuncIndentifier prop on EventHandler obj! Wrong one provided!")
    });
  }
  
  function start() {
    SetupEvents();

    setTimeout(() => {
      Loader.hideLoader();
    }, 1500);
  }

  return {
    start
  }
})()



jQuery(document).ready(() => App.start());
