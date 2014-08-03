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

var myFirebaseRef = new Firebase("https://echo-transcript.firebaseio.com/");

function playdasong (base64_sound_encoding) {
  console.log(base64_sound_encoding);
    var snd = new Audio("data:audio/wav;base64," + base64_sound_encoding);
    snd.play();
}

myFirebaseRef.child("ABCD").child("admin").child("0").on("value", function(snapshot) {
  playdasong(snapshot.val());

});
