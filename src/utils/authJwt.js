import { connect } from "react-redux";


const  authenticateUser = ({userActivited}) =>{
  const token = localStorage.getItem('jwt')
  if (token) {
    function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(base64);
      };
  const tokenJSON = parseJwt(token)
  
  const data = { user: {
      bio: null,
      email: tokenJSON.email,
      image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
      token,
      username: tokenJSON.username
      }}
  userActivited(data)
}
  }

  const mapStateToProps = ({user}) =>{
    return{
      user
    }
  }
  const mapDispatchToProps = (dispatch) =>{
    return{
      userActivited: (user) =>{
      dispatch({
        type: 'USER_ACTIVITED',
        payload: user
      })
    }
  }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(authenticateUser)