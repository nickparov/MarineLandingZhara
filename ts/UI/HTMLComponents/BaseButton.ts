


import CoreComponent from './CoreComponent';

type dataAttr = {
  [key: string]: string
};

export default class BaseButton extends CoreComponent {
  private classes: [string];
  private id: string;
  private dataAttributes: dataAttr;

  constructor() {
    super();
    this.classes = ["btn btn-large btn-outline-primary event-button"];
    this.dataAttributes = {};
    this.id = "";
  }

  addClass(c: string): void {
    this.classes.push(c);
  }

  getClasses(): [string] {
    return this.classes;
  }

  setID(id: string) {
    this.id = id;
  }

  getID(): string {
    return this.id;
  }

  addAttribute(attr: dataAttr): void {
    this.dataAttributes[attr.key] = attr[attr.key];
  }

  // Override Method
  render(): string {
    throw new Error("Method not implemented.");
  }
}




  
