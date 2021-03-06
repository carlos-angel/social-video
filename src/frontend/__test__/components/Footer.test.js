import 'jsdom-global/register';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Footer from '../../components/Footer';

describe('<Footer />', () => {
  const footer = mount(<Footer />);

  test('Render Footer Component', () => {
    expect(footer.length).toEqual(1);
  });

  test('Footer haves 3 anchors', () => {
    expect(footer.find('a')).toHaveLength(3);
  });

  test('Footer Sanpshot', () => {
    const footer = shallow(<Footer />);
    expect(footer).toMatchSnapshot();
  });
});
