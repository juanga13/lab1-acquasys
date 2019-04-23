import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import './home.css';
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";

export default class News extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
  };

  handleClick = () => {
    const {cookies} = this.props;
    console.log(cookies.cookies.token);

    if (cookies.cookies.token === undefined) {
      alert("feelsbadman");
    } else {
      alert("LOGGED with this is token: " + cookies.get("token"));
    }
  };

  render() {
    return(
      <div className='news'>
        <h3>NEWS div</h3>
        <Button onClick={this.handleClick}>Check if im logged</Button>
        <div style={{padding: "18px"}}>
          <h4>News number 1</h4>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam imperdiet nec nibh non gravida. Nunc nunc
            ligula, varius id maximus sed, vulputate eget ex. Sed porta nisl lacus, tristique interdum velit fermentum
            ut. Etiam in justo nec ex malesuada laoreet. Aliquam consectetur consectetur sapien, id interdum elit
            vestibulum non. Quisque elementum non nibh id lobortis. Integer vel sapien eu dui congue commodo. Sed nibh
            leo, auctor vel eros sit amet, bibendum convallis enim. Fusce et elit suscipit, pretium felis ac, lobortis
            lectus. Pellentesque ac pretium nisi. Sed aliquet erat non orci vulputate, porta semper tortor placerat.
            Suspendisse potenti.
          </li>
          <h4>Other news that is also important</h4>
          <li>
            Vivamus eu lacus ac diam vulputate vulputate. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer erat massa, sagittis sit amet pretium nec, gravida in magna. Aenean imperdiet lorem est, et dapibus
            tortor lobortis imperdiet. Nam at ipsum posuere, finibus lectus vitae, placerat diam. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas at accumsan orci. Nunc metus
            neque, commodo non leo sit amet, faucibus ultricies est. Nunc consequat tellus vitae metus euismod, vel
            placerat lacus convallis. Proin quis arcu sodales, auctor orci commodo, interdum libero. Praesent dapibus
            arcu aliquam dolor porttitor tempor. Nunc fringilla risus tempus sodales porttitor. Suspendisse sollicitudin
            cursus purus, at porttitor nisl congue vel. Sed ex quam, consequat ac vulputate nec, egestas vel neque.
            Morbi dignissim, lorem vel dignissim pharetra, ex ipsum vestibulum elit, et rutrum turpis eros molestie
            quam.
          </li>
          <h4>Stop reading this lorem, kono ipsum</h4>
          <li>
            Mauris lacinia ante et ipsum interdum hendrerit nec vel est. Duis in ultricies risus, non dapibus sapien.
            Mauris ac lobortis tortor. Praesent elementum semper porttitor. Sed ornare, velit interdum dapibus semper,
            eros risus cursus tortor, at ornare ipsum mi vitae nisi. Sed ornare lorem lacus. In id nibh faucibus magna
            iaculis luctus ac vel eros. Nulla cursus purus nec dui tempor, vel finibus augue hendrerit. Donec dignissim
            ac quam a vestibulum. Donec vehicula ornare mauris at scelerisque. Donec dapibus faucibus erat id bibendum.
            Nullam convallis placerat sapien sit amet commodo. Cras facilisis ante ut cursus maximus. Donec sit amet
            ligula commodo, sodales diam in, semper ligula. Sed fermentum lobortis diam eu efficitur. Sed iaculis turpis
            id ullamcorper suscipit.
          </li>
        </div>
      </div>
    );
  };
}