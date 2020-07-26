import React from "react";
import {Tabs, Tab} from '@material-ui/core';
import {connect} from 'react-redux';
import * as action from '../redux/fileRedux/fileAction';
const LanguageSwitcher = (props) => {
  const tabChangeHandler = (e, val) => {
    console.log(val);
    props.switchLanguage(val);
  }
  return (
    <Tabs value={props.encrypted_lang} onChange={tabChangeHandler} className='lang-tab'>
      <Tab label="Encrypted" value={1}/>
      <Tab label="English" value={0}/>
    </Tabs>
  )
}
const mapStateToProps = (state) => {
  return {
    encrypted_lang: state.fileReducer.encrypted_lang
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    switchLanguage: (lang) => dispatch(action.switchLanguage(lang))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
