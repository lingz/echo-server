/** @jsx React.DOM */

// var HelloWorld = React.createClass({
//   render: function() {
//     return (
//       <p>
//         Hello, <input type="text" placeholder="Your name here" />!
//         It is {this.props.date.toTimeString()}
//       </p>
//     );
//   }
// });

// setInterval(function() {
//   React.renderComponent(
//     <HelloWorld date={new Date()} />,
//     document.getElementById('example')
//   );
// }, 500);

var WHOLE_SENTENCES = {};
var SOUND_BITES = {};
var SOUND_ID_TO_SOUND_ENCODED_STRING = {};

var SentenceDisplay = React.createClass({

  handleClick: function (evt) {

    var fragment_id = evt.currentTarget.id;
    var soundbite_id = SOUND_BITES[fragment_id];
    playdasong(SOUND_ID_TO_SOUND_ENCODED_STRING[soundbite_id]);

  },
  render: function () {
        fragments = [];
        for (var id in this.props.fragment){
          if (this.props.fragment.hasOwnProperty(id)){
            if (typeof(this.props.fragment[id]) !== 'object')
              fragments.push(<p className="soundbite" id={id} onClick={this.handleClick}>{this.props.fragment[id]}</p>);
          }
        }
        return (
          <div>{fragments}</div>
        )

  }
});

function addToTranscript (word, id) {
  WHOLE_SENTENCES[id] = word;
  // console.log('WHOLE_SENTENCES', WHOLE_SENTENCES);
  React.renderComponent(
  <SentenceDisplay fragment={WHOLE_SENTENCES}/>,
  document.getElementById('container')
  );

}


var fireBDataRef = new Firebase("https://echo-transcript.firebaseio.com/data");

var fireBOutputRef = new Firebase("https://echo-transcript.firebaseio.com/output"); 

fireBOutputRef.on("value", function (snapshot) {
  console.log(snapshot.val());
  for (var id in snapshot.val()){
    if (snapshot.val().hasOwnProperty(id)){
      

      var soundbite_id = snapshot.val()[id]['dataId'];
      SOUND_BITES[id] = soundbite_id;
      // fireBDataRef.on("value", function (snapshot) {
      //   console.log("data", snapshot.val());
      // });
      var text_data = snapshot.val();
      fireBDataRef.child(soundbite_id).on("value", function (snapshot) {
        SOUND_ID_TO_SOUND_ENCODED_STRING[soundbite_id] = snapshot.val();
        addToTranscript(text_data[id]['text'], id);
      });
    }
  }
  addToTranscript(snapshot.val());
});

function playdasong (base64_sound_encoding) {
    var snd = new Audio("data:audio/wav;base64," + base64_sound_encoding);
    snd.play();
}
