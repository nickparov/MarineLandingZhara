
import CoreComponent from './CoreComponent';

export default class RequestContainer extends CoreComponent {
  
  private p_message: string;
  private wasfocused: boolean;

  constructor(p_message: string) {
    super();
    this.p_message = p_message;
    this.wasfocused = false;
    this.setHandler();
  }

  private setHandler(): void {
    // set handler
    $(document).on({
      focusin: function() {
        if(this.wasfocused === false) {
          $(this).val("")
          this.wasfocused = true;
        } 
      }
    }, "#RequestMessage");
  }


  render(): string {
    return `
      <div class="row">
        <div class="col-lg-4">
            <p class="alert alert-info">${this.p_message}</p>
        </div>
        <div class="col-lg-8">
            <textarea name="message" rows=3 id="RequestMessage" class="form-control">Additional Info</textarea> 
        </div>
      </div>
    `;
  }




}
