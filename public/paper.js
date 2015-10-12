var Paper = React.createClass({
  render: function() {
    return (
    <div>
      <Page url="/paper/today/page/0" />
    </div>
    );
  }  
});

var Page = React.createClass({
  load: function(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({
          data: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });    
  },
  getInitialState: function() {
    return {
      data : {"page": "", "num": 1},        
    }
  },
  componentDidMount: function() {
    this.load(this.props.url);
  },
  prevPage: function() {
    var prev = this.state.data.num - 1;
    if (prev >= 0) {
      this.load("/paper/today/page/" + prev);
    }    
  },
  nextPage: function() {
    var next = this.state.data.num + 1;
    this.load("/paper/today/page/" + next);
  },  
  render: function() {
    return (
    <div>
      <img className="img-responsive" src={ "data:image/png;base64," + this.state.data.page }/>
      <div className="row page">
        <div onClick={this.prevPage} onTouchEnd={this.prevPage} className="col-md-1 col-sm-1 col-xs-1 nav left"></div>      
        <div className="col-md-10 col-sm-10 col-xs-10"></div>
        <div onClick={this.nextPage} onTouchEnd={this.nextPage} className="col-md-1 col-sm-1 col-xs-1 nav right"></div>
      </div>
    </div>
    );
  }
});

React.render(
 <Paper/> , document.getElementById('content')
);
