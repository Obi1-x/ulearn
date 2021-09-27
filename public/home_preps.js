'use strict';

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  signOut(arg){
        arg.preventDefault();
	    arg.stopPropagation();
	    console.log(arg);
	    FB.auth().signOut();
	    window.location.pathname = 'index.html'; //Redirect to homepage.
  }

  render() {
    if (this.state.liked) {
      return 'Course created.';
    }

    /*
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );*/

    return (
    <div>
      <h1> Welcome </h1>
      <button onClick={() => this.setState({ liked: true })}>
        Create course
      </button>
      <button  onClick={(e) => this.signOut(e)}> 
        Sign out 
      </button>
      </div>
    );
  }
}

const domContainer = document.querySelector('#homepageView');
ReactDOM.render(<LikeButton/>, domContainer);