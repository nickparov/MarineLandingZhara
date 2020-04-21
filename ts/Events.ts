import Modal from './Modal';
import Mail from './Modules/Mail';
import * as Components from './Components/Components';
import Loader from './Loader';

export const Events = (function(){
  const Selectors = {
    RequestEmail: "#RequestEmail",
    RequestMessage: "#RequestMessage",
    SendRequestBtn: "#SendRequestBtn"
  }

  interface EventHandlerObj {
    [key: string]: Function
  }

  const EventHandlers: EventHandlerObj = {
    OpenChat: function(e: JQuery.Event): void {
      
    },
    SendRequest: function(e: JQuery.Event): void {
      const email: any = $(Selectors.RequestEmail).val();

      if(_validateEmail(email))
        _valid();
      else 
        _invalid();

      function _validateEmail(email: string): boolean {
        // regex email checking
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

      function _valid(): void {
        Modal.populateModal(
          "Send Request!", 
            Components.RequestContainer("Type any additional info that you need us to know about!"), 
            `<div class="d-flex justify-content-center">
              <button 
                class="btn btn-large btn-outline-primary event-button" 
                data-eventhandler="DoSendRequest" 
                data-reqemail="${email}"
                id="DoSendRequestBtn"
              >Send</button>
            </div>`
          );
        Modal.show();
      }
      
      function _invalid(): void {
        Modal.populateModal(
          "Error!", 
          `<p class="alert alert-danger">Fill in your email first!</p>`,
          ""
          );
        Modal.show();
        setTimeout(() => {
          Modal.hideAndClear();
        }, 900);
      }
    },
    DoSendRequest: function(e: JQuery.ClickEvent): void {
      const req_email: string = $(e.target).data("reqemail"),
            req_body: any = $(Selectors.RequestMessage).val(); 
      Loader.showLoader();
      Mail.SendRequest(req_email, req_body);
    }
  }


  function GetEventHandlers(): EventHandlerObj {
    return EventHandlers;
  }

  return {
    GetEventHandlers
  }
})()


export default Events;