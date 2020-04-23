export default abstract class Component {
  private renderHTML: string;

  constructor() {
    this.renderHTML = ``;
  }
  
  abstract render() :string;

}