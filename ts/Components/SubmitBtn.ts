import CoreComponent from './CoreComponent';

export default class SubmitBtn extends CoreComponent {
  private email: string;

  constructor(email: string) {
    super();
    this.email = email;
  }

  render(): string {
    return `<div class="d-flex justify-content-center">
              <button 
                class="btn btn-large btn-outline-primary event-button" 
                data-eventhandler="DoSendRequest" 
                data-reqemail="${ this.email }"
                id="DoSendRequestBtn"
              >Send</button>
            </div>`;
  }
}

