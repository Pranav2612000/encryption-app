import React from 'react';
import {Container, Grid} from '@material-ui/core';
import {connect} from 'react-redux';
const Footer = (props) => {
  return (
        <div className="footer">
          <Container>
            <Grid container>
              <Grid item md={2}/>
              <Grid item md={8}>
                {props.encrypted_lang ? `fzw2+z# w2{'2"w*w&2(zw2')!2#x2(zw2$s&('2?2{(2{'2y&ws(w&2#&2 w''w&>2vw$w"v{"y2#"2z#+2+w  2(zw2{"v{*{v)s '2+#&}2(#yw(zw&` : " The whole is never the sum of the parts - it is greater or lesser, depending on how well the individuals work together"}
              </Grid>
              <Grid item md={2}/>
            </Grid>
          </Container>
        </div>
  )
}
const mapStateToProps = (state) => {
  return {
    encrypted_lang: state.fileReducer.encrypted_lang
  };
}
const mapDispatchToProps = (dispatch) => {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
