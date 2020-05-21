import CoreComponent from './CoreComponent';

export default class EmailInput extends CoreComponent {
  private id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  render(): string {

    return ` <input 
              class="form-control" 
              type="text" 
              placeholder="Your Email"
              id="${this.id}" />`;
  }
}

