import Modal from './Modal';
import FireBase from './Modules/FireBase';
import { RequestContainer, SubmitBtn } from './Components/export';
import Loader from './Loader';

export const Events = (function(){
  const Selectors = {
    RequestEmail: "#RequestEmail",
    RequestMessage: "#RequestMessage",
    SendRequestBtn: "#SendRequestBtn",
    EventBtnClass: ".event-button",
    EventInputClass: ".event-input"  
  }

  interface EventHandlerObj {
    [key: string]: Function
  }

  const BtnEventHandlers: EventHandlerObj = {
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
        const ReqContainerHTML = new RequestContainer("Type any additional info that you need us to know about!").render(),
              SubmitBtnHTML = new SubmitBtn(email).render();
        Modal.populateModal(
            "Send Request!", 
            ReqContainerHTML, 
            SubmitBtnHTML
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
      }
    },
    DoSendRequest: function(e: JQuery.ClickEvent): void {
      const req_email: string = $(e.target).data("reqemail"),
            req_body: any = $(Selectors.RequestMessage).val(); 
      Loader.showLoader();
      FireBase.SendRequest(req_email, req_body);
    }
  }

  const InputEventHandlers: EventHandlerObj = {
    PriceKeywordEntered: function(e: JQuery.TriggeredEvent): void {
      console.log(e.target.value);
    }
  }

  function Setup(): boolean {
    let error = false;
    // Setup Button Events
    $(document).on('click', Selectors.EventBtnClass ,(e) => {
      e.preventDefault();
      // event func identifier
      const eventFuncIndentifier: string = $(e.target).data('eventhandler');
      // checking if event obj has such func
      if(BtnEventHandlers.hasOwnProperty(eventFuncIndentifier)) 
      { 
        BtnEventHandlers[eventFuncIndentifier](e);
      } else 
      { 
        throw new Error("No such eventFuncIndentifier prop on EventHandler obj! Wrong one provided!");
      }
    });

    $(document).on('input', Selectors.EventInputClass, (e) => {
      e.preventDefault();
      const e_func_identifier: string = _getEventFuncIdentifier(e);
      if (InputEventHandlers.hasOwnProperty(e_func_identifier)) 
      {
        InputEventHandlers[e_func_identifier](e);
      } else 
      {
        throw new Error("No such eventFuncIndentifier prop on EventHandler obj! Wrong one provided!");
      }
    });

    return true;
  }

  function _getEventFuncIdentifier(e: JQuery.TriggeredEvent): string {
    return $(e.target).data('eventhandler');
  }

  return {
    Setup
  }
})()


export default Events;