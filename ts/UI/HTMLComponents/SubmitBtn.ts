import CoreComponent from './CoreComponent';

export default class SubmitBtn extends CoreComponent {
  private email: string;
  private event_handler_func: string;

  constructor(handler: string, email?: string) {
    super();
    this.email = email ? email : "";
    this.event_handler_func = handler;
  }

  render(): string {
    return `<div class="d-flex justify-content-center">
              <button 
                class="btn btn-large btn-outline-primary event-button" 
                data-eventhandler="${ this.event_handler_func }" 
                data-reqemail="${ this.email }"
                id="DoSendRequestBtn"
              >Send</button>
            </div>`;
  }
}

