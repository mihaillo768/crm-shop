import React from "react";
import ChangeForm from "./changeForm";
//function Ma(e)
 // { 
  //  var t=e.allowRenameColumn,
 //   n=e.onClick,
  //  r=e.children;
  //  return t?o.a.createElement("span",{style:{cursor:"pointer"},onClick:n},r):o.a.createElement("span",null,r)
 // }

class Card extends React.PureComponent {
  defaultText = () => {
    this.setState(
      <button>xui</button>
    )
  }

  changeText = () => {
    this.setState(() =>{
    }
    );
  }

  render() {

    return (
      <div>
        <div onClick={this.changeText} class="card-header">Header</div>
        <div class="card-body">
          <h5 class="card-title">Light card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button onClick={this.changeText}>xui</button>
          <h1>{() => this.defaultText}</h1>
        </div>
      </div>
    );
  }
}

export default Card
