import React from "react";

class ChangeForm extends React.PureComponent {
    render(){
        return(
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                    <button class="btn btn-outline-secondary" type="button">Button</button>
                </div>
            </div>
        );
    }
}

export default ChangeForm;