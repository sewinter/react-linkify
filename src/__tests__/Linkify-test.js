jest.dontMock('../Linkify.jsx');

let React = require('react/addons');
let TestUtils = React.addons.TestUtils;

describe('Linkify', () => {
  let Linkify = require('../Linkify.jsx');
  
  describe('#parseString', () => {
    let linkify = TestUtils.renderIntoDocument(<Linkify></Linkify>);

    it('should not modify the string', () => {
      let input = 'React is a JavaScript library for building user interfaces.';
      let output = linkify.parseString(input);

      expect(output).toEqual(input);
    });

    it('should parse http url', () => {
      let input = 'http://facebook.github.io/react/';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(input);
      expect(output.props.children).toEqual(input);
    });

    it('should parse https url', () => {
      let input = 'https://facebook.github.io/react/';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(input);
      expect(output.props.children).toEqual(input);
    });

    it('should parse no protocol url', () => {
      let input = 'facebook.github.io/react/';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(`http://${input}`);
      expect(output.props.children).toEqual(input);
    });

    it('should parse url in beginning of text', () => {
      let input = ['https://github.com/facebook/react', ' is the location to the React source code.'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0].type).toEqual('a');
      expect(output[0].props.href).toEqual(input[0]);
      expect(output[0].props.children).toEqual(input[0]);
      expect(output[1]).toEqual(input[1]);
    });

    it('should parse url in middle of text', () => {
      let input = ['Go to ', 'https://github.com/facebook/react', ' for the React source code.'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });

    it('should parse url in end of text', () => {
      let input = ['The React source code is located at ', 'https://github.com/facebook/react'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(input[1]);
      expect(output[1].props.children).toEqual(input[1]);
    });
  });

  describe('#parse', () => {
    let linkify = TestUtils.renderIntoDocument(<Linkify></Linkify>);
    
    it('should not parse <a> elements', () => {
      let input = (
        <a href="http://facebook.github.io/react/">
          http://facebook.github.io/react/
        </a>
      );
      let output = linkify.parse(input);

      expect(output).toEqual(input);
    });

    it('should not parse <button> elements', () => {
      let input = <button>http://facebook.github.io/react/</button>;
      let output = linkify.parse(input);

      expect(output).toEqual(input);
    });

    it('should parse email', () => {
      let input = 'tasti@zakarie.com';
      let output = linkify.parseString(input);

      expect(output.type).toEqual('a');
      expect(output.props.href).toEqual(`mailto:${input}`);
      expect(output.props.children).toEqual(input);
    });

    it('should parse email in sentence', () => {
      let input = ['For more information, contact ', 'tasti@zakarie.com', '.'];
      let output = linkify.parseString(input.join(''));

      expect(Array.isArray(output)).toEqual(true);
      expect(output[0]).toEqual(input[0]);
      expect(output[1].type).toEqual('a');
      expect(output[1].props.href).toEqual(`mailto:${input[1]}`);
      expect(output[1].props.children).toEqual(input[1]);
      expect(output[2]).toEqual(input[2]);
    });
  });

  describe('#render', () => {
  
  });

  describe('#static', () => {
    let Linkify = require('../Linkify.jsx');

    // Issue with ES6 not allowing use of a static variable inside another
    it('should contain the same string', () => {
      expect(Linkify.defaultProps.properties.href).toEqual(Linkify.MATCH);
    });
  });
});