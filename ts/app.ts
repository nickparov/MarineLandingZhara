import Chat from "./Chat";
import Modal from "./Modal";

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
    const eventFuncIndentifier: string = $(e.target).data('eventhandler');
    if(EventHandlers.hasOwnProperty(eventFuncIndentifier)) 
      EventHandlers[eventFuncIndentifier]();
    else  
      throw new Error("No such eventFuncIndentifier prop on EventHandler obj! Wrong one provided!")
  });
}

jQuery(document).ready(() => SetupEvents());
