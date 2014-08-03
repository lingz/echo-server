/** @jsx React.DOM */

var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
        Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
      </p>
    );
  }
});

setInterval(function() {
  React.renderComponent(
    <HelloWorld date={new Date()} />,
    document.getElementById('example')
  );
}, 500);

var myFirebaseRef = new Firebase("https://echokaffy.firebaseio.com/");

// da data
myFirebaseRef.set({
  
  8384912: {
    users: ['kaffy', 'karffik', 'ling'],
    karffik: {
      count: 1,
      1: {
        word: 'hello',
        sound: '',
        timestart: 0,
        timeend: 1,
      },
    },
    kaffy: {
      count: 1,
      1: {
        word: 'hello',
        sound: '',
        timestart: 0,
        timeend: 1,
      },
    },
    ling: {
      count: 1,
      1: {
        word: 'hello',
        sound: '',
        timestart: 0,
        timeend: 1,
      },
    }
  }
});