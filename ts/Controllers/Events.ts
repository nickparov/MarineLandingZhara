import Modal from '../UI/Modal';
import FireBase from '../Modules/FireBase';
import { RequestContainer, SubmitBtn, EmailInput, Alert } from '../UI/HTMLComponents/export';
import Loader from '../UI/Loader';
import Cities from "../Modules/Cities";

export const Events = (function(){
  const Selectors = {
    RequestEmail: "#RequestEmail",
    RequestMessage: "#RequestMessage",
    SendRequestBtn: "#SendRequestBtn",
    EventBtnClass: ".event-button",
    EventInputClass: ".event-input"  ,
    PriceRequest: {
      "cityFromField": "#city_from_field",
      "cityToField": "#city_to_field",
      "FromCityList": "#from_city_list",
      "moreLess3Days": "#more_less_3_days",
      "dateAirport": "#date_airport",
      "userEmail": "PriceRequestEmailField"
    }
  }

  interface EventHandlerObj {
    [key: string]: Function
  }

  type jQueryStringValType = string | number | string[] | undefined;

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
              SubmitBtnHTML = new SubmitBtn("DoSendRequest", email).render();
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
    },
    SendPriceRequest: function(e: JQuery.ClickEvent): void {

      const ReqContainerHTML = new EmailInput(Selectors.PriceRequest.userEmail).render(),
            SubmitBtnHTML = new SubmitBtn("DoSendPriceRequest").render();

      Modal.populateModal(
        "Your Email", 
        ReqContainerHTML, 
        SubmitBtnHTML
      );

      Modal.show();
    },
    DoSendPriceRequest: function(e: JQuery.ClickEvent): void {
      const EmailUISelector: string = `#${Selectors.PriceRequest.userEmail}`,
            user_email: jQueryStringValType = $(EmailUISelector).val(),
            data = {
              toCity: $(Selectors.PriceRequest.cityToField).val(),
              fromCity: $(Selectors.PriceRequest.cityFromField).val(),
              isLoose: $(Selectors.PriceRequest.moreLess3Days).is(":checked"),
              dateAirport: $(Selectors.PriceRequest.dateAirport).val(),
              email: user_email
            };
      
      function _hasAllRequiredFields(): boolean {
        let flag = true;

        if(typeof data.toCity === "string" 
          && typeof data.dateAirport === "string" 
          && typeof data.fromCity === "string"
          && typeof data.email === "string"
          ) {
          if(data.toCity.length === 0) 
            flag = false;
          
          if(data.dateAirport.length === 0) 
            flag = false;
          
          if(data.fromCity.length === 0) 
            flag = false;

          if(data.email.length === 0) 
            flag = false;
        }
        

        return flag;
      }

      function _validateEmail(email: jQueryStringValType): boolean {
        // regex email checking
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

      function _invalid(): void {
        Modal.addAlert("danger", "you entered wrong email!", "");
      }

      function _valid(): void {
        Loader.showLoader();
        FireBase.SendPriceRequest(data);
      }


      if(_hasAllRequiredFields()) {
        if(_validateEmail(user_email)) 
          _valid();
        else 
          _invalid();
      } else {
        Modal.addAlert("danger", "some fields are empty!", "");
        $("#PriceRequestSection").prepend(new Alert("danger", "Some fields are empty!").render());
      }


    }
  }

  const InputEventHandlers: EventHandlerObj = {
    CityNameEntered: function(e: JQuery.TriggeredEvent) {

      const input: string = e.target.value,
            last_letter_index = input.length - 1,
            last_letter = input[last_letter_index],
            reg = new RegExp("^[a-zA-Z\s]*"),
            cityListID = $(e.target).data('citylistid'),
            cityListDOMElement = $(cityListID);
      
      if($(cityListDOMElement).hasClass("d-none")) {
        $(cityListDOMElement).removeClass("d-none");
      } 

      let contentHTML = ``;

      if(!reg.test(last_letter)) {
        e.target.value = input.substring(0, last_letter_index);
      } else {
        const searched_cities = Cities.getCitiesByKeyword(input);

        // if we got data
        if(searched_cities.length > 0) {
          searched_cities.forEach(city_name => {
            contentHTML += `<li>${city_name}</li>`;
          }); 
        // if not
        } else {
          contentHTML += `
            <p class="m-0 p-0">
              <span style="color: white;">No Results</span> <i class="float-right remixicon-close-line close_city_list_btn" style="color: white; font-weight: 700;"></i>
            </p>
          `;
        }
  
        $(cityListID).html(contentHTML);
        // if no content SHOW NO RESULTS
      }
    },
    
  }

  function Setup(): void {
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
  }

  function _getEventFuncIdentifier(e: JQuery.TriggeredEvent): string {
    return $(e.target).data('eventhandler');
  }

  return {
    Setup
  }
})()


export default Events;