import React, { Component } from 'react'
import { getSkateSpots, fetchCurrentUser } from '../../action'
import { connect } from 'react-redux'
import SkateSpotItem from '../child_components/SkateSpotItem'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux'
import withAuth from '../../hocs/withAuth.js'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = {
  title: {
    fontFamily: 'pacifico',
    flexGrow: 1,
    maxWidth: 500,
    margin: 20,
    fontSize: 30
  },
};

class BookmarkContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      myBookmarks:'',
      filteredArray:'',
      term:''
    }
  }

  componentWillReceiveProps(nextProps){
    this.handleSearch(nextProps.logSearchTerm)
  }

  handleSearch = (term) =>{
    this.setState({
      term: term
    })
  }

  renderBookmarks = () =>{
    console.log('Bookmarkscontainer State---', this.state )
    if (this.state.term === '' || this.state.term === undefined && this.state.myBookmarks !== undefined){
      return(
      <Grid justify='space-evenly' container spacing={24}>
          {this.state.myBookmarks ? this.state.myBookmarks.map(spot => <SkateSpotItem key={spot.id} spot={spot} />): null}
      </Grid>
      )
    }else {
      let filteredArray = this.state.myBookmarks.filter(bookmark => bookmark.name.toLowerCase().includes(this.state.term) || bookmark.description.toLowerCase().includes(this.state.term))
      return(
        <Grid justify='space-evenly' container spacing={24}>
          {filteredArray.map(spot => <SkateSpotItem key={spot.id} spot={spot}/>)}
        </Grid>
      )
    }
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
        <center>
          <Typography className={classes.title} variant="title">
            Bookmarks
          </Typography><br/><br/>
          </center>

          {this.renderBookmarks()}

      </div>
    )
  }

  async componentDidMount(){
    console.log('my current props', this.props)
    this.setState({ myBookmarks: this.props.userData.user.bookmarks})
  }

  getBookmarkedSpots = () =>{
    if (this.state.allSkateSpots.payload.length > 0){

    }
  }

}


const mapStateToProps = (state) => {
  return {
    userData: state.user,
    skateSpots: state.skateSpots,
    loadingData: state.loadingData,
    logSearchTerm: state.logSearchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser()),
      getSkateSpots: () => dispatch(getSkateSpots())
    }
}


const stylesMap = withStyles(styles)

const connectMap = connect(mapStateToProps, mapDispatchToProps)

export default withAuth(compose(stylesMap, connectMap)(BookmarkContainer))
