import React, {Component} from 'react';
import background from './resources/background.jpg';

export default class MainPage extends Component {
  getStyle() {
    return {

    };
  }

  render() {
    return (
      <div
        style={{
          backgroundImage: 'url(' + background + ')',
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
        className="bg-dark text-light">

        <h1>Main Page</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac sapien nec nulla tincidunt vestibulum id ac nibh. Cras neque felis, pulvinar et risus non, fermentum malesuada purus. Etiam sagittis non felis sed pharetra. Quisque quis orci a nibh mattis tincidunt. Mauris vel nunc sit amet ante posuere porttitor. Suspendisse pellentesque libero neque, pulvinar egestas mi pulvinar at. Curabitur porttitor lacinia urna sagittis placerat. Donec eu magna purus. Etiam scelerisque tortor justo, vel ullamcorper odio tincidunt vitae.</p>
        <p>Integer a justo tempor, pulvinar lacus in, dapibus nisi. Curabitur in urna fermentum, egestas ex eget, consectetur metus. Integer condimentum pellentesque scelerisque. Nam et lobortis turpis. Aenean maximus rutrum arcu ac rutrum. Ut molestie id metus nec gravida. Nam semper, sapien eget eleifend pellentesque, nulla felis hendrerit urna, vitae rhoncus turpis massa sit amet odio. Sed id luctus sapien. In libero libero, vehicula at ligula vel, vulputate ultrices arcu. Vivamus ultricies venenatis dui a blandit. In lacus dolor, tincidunt quis neque a, laoreet convallis orci.</p>
        <p>Mauris molestie, quam ut tincidunt mattis, dui mauris congue erat, et hendrerit purus lectus vitae lacus. Morbi a diam nisl. Aenean ut erat nec ligula fermentum bibendum fringilla vitae nibh. Suspendisse lacinia neque enim. Aenean eu rhoncus dui. Quisque vel maximus lectus. Vestibulum vel lorem sed nulla finibus faucibus. Duis vitae arcu tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam consequat metus massa, et congue augue mollis dapibus.</p>
        <p>Morbi vitae tempor ante. Fusce vehicula risus eu eros laoreet aliquam. Fusce dapibus viverra est, at maximus mauris. Phasellus eget ex vulputate, interdum purus nec, pharetra quam. Fusce vitae condimentum nunc. Sed lacinia non odio a dignissim. Aenean eleifend ac ex in blandit.</p>
        <p>Duis condimentum vulputate nibh eu euismod. Etiam vulputate leo quis est vulputate congue. Pellentesque id felis diam. Donec faucibus, justo et aliquam porttitor, nulla diam elementum ante, vitae tristique orci mauris vitae risus. Phasellus sodales, massa et placerat pellentesque, lorem sem tempus justo, quis ultricies erat tortor at est. Phasellus sit amet interdum erat. Cras lectus ipsum, rutrum id posuere a, gravida id diam. Sed dictum interdum mi, in tristique lorem interdum at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer varius eu lorem vel bibendum. Cras luctus dictum arcu, sed aliquet nibh euismod quis.</p>
      </div>
    )
  };
}