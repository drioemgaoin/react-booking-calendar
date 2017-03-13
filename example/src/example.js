var React = require('react');
var ReactDOM = require('react-dom');
var ReactCalendar = require('react-calendar');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactCalendar />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
