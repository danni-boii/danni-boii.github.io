/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// plugin that creates slider
import Slider from "nouislider";

// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  CustomInput,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

export default class Basics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realCode: "9527",
      codeClass: "",
      inputCode: "",
      formClass: ""
    };
    
  }

  password_enter(){
    if(this.state.inputCode == ""){
      this.setState({
        codeClass: "",
        formClass: ""
    })
    }
    else if(this.state.inputCode == this.state.realCode){
      this.setState({
        codeClass: "form-control-success",
        formClass: "has-success"
      })
    }
    else if(this.state.inputCode != this.state.realCode){
      this.setState({
        codeClass: "form-control-danger",
        formClass: "has-danger"
      })
    }
  }

  setInput(event){
    this.setState({inputCode : event.target.value})
  }

  render() {
    return (
    <div className="section section-basic" id="basic-elements">
      <img
        alt="..."
        className="path"
        src={require("assets/img/path1.png").default}
      />
      <Container>
        <div className="space-70" />
        <div id="inputs">
          <h3>Please Enter the password here</h3>
          <p className="category">Code</p>
          <Row>
            <Col lg="3" sm="6">
              <FormGroup className={this.state.formClass}>
                <Input defaultValue="" placeholder="Secret Code" type="text" className={this.state.codeClass} onChange={e=>this.setInput(e)}/>
                <Button color="primary" type="button" onClick={this.password_enter.bind(this)}>
                  Enter
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
  }
}
