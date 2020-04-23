import CoreComponent from './CoreComponent';

export default class Alert extends CoreComponent {

  private AlertTypes = {
    success: "success",
    info: "info",
    warning: "warning",
    danger: "danger"
  }

  private type: string;
  private text: string;

  

  constructor(type: string, text: string) {
    super();
    this.type = type;
    this.text = text;
  }

  render(): string {
    if(this.AlertTypes.hasOwnProperty(this.type)) {
      return `
      <div class="alert alert-${ this.type }" role="alert">
        ${ this.text }
      </div>
      `;
    } else {
      return `<b>Error in Alert Component!</b>`;
    }
  }
}