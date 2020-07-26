import React, {useState, useEffect} from 'react';
import {Container, Grid, Button, TextField} from '@material-ui/core';
import {FileDrop} from 'react-file-drop';
import Dropzone, {useDropzone} from "react-dropzone";
import MyDropzone from './MyDropzone';
import {connect} from 'react-redux';
import * as action from '../redux/fileRedux/fileAction';
import fileIcon from '../assets/fileIconWhite.png';

const MainContent = (props) => {
  const [view, setView] = useState("");
  const [key, setKey] = useState('');
  useEffect(() => {
    if(props.decrypted_file) {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(props.decrypted_file);
      element.download = props.decrypted_file.name;
      document.body.appendChild(element);
      element.click();
      console.log(props.decrypted_file.name);
    }
  }, [props.decrypted_file])
  const decryptButtonHandler = (e) => {
    if(props.file) {
      //props.decryptFile(props.file);
      setView("decrypt");
    } else {
      console.log("Please chose a file");
      alert("Please choose a file");
    }
  }
  const decryptFileHandler = (e) => {
    if(key != '') {
      console.log(key);
      props.decryptFile(props.file, key);
    } else {
      console.log('Please enter a key');
      alert("Please enter a key");
    }
  }
  const encryptButtonHandler = (e) => {
    if(props.file) {
      //props.decryptFile(props.file);
      props.encryptFile(props.file);
      setView("encrypt");
    } else {
      console.log("Please chose a file");
      alert("Please choose a file");
    }
  }
  return (
    <Container>
      <div className="main-title">{props.encrypted_lang ? 'U)tt{(2w"u&-$(#&' : "Cubbit encryptor" }</div>
      { (view === "") && 
          (
            <>
              <div className='main-description'>
                {props.encrypted_lang ? 'Sv*s"uwv2#" {"w2x{ w2w"u&-$({#"2s"v2vwu&-$({#"@2ewu)&w2s"-2x{ w2(-$w2s"v2!s{"(s{"2-#)&2$&{*su-3' : "Advanced online file encryption and decryption. Secure any file type and maintain your privacy!"}
              </div>
              <div className='file-drop-area'>
                <MyDropzone/>
              </div>
              <div className='button-area'>
                <Grid container>
                  <Grid item xs={0}/>
                  <Grid item xs={12}>
                    <Button className='light-btn' color='secondary' onClick={encryptButtonHandler}>
                      Encrypt
                    </Button>
                    <Button className='dark-btn' color='secondary' onClick={decryptButtonHandler}>
                      Decrypt
                    </Button>
                  </Grid>
                  <Grid item xs={0}/>
                </Grid>
              </div>
            </>
          )
     }
     { (view === "decrypt" || (view === "encrypt" && props.loading == false)) && 
          (
            <>
              <Grid container className='decrypt-container'>
                <Grid item xs={1} md={3}/>
                <Grid item xs={10} md={6}>
                  <div className='file-area'>
                    <Grid container>
                      <Grid item xs={5}/>
                      <Grid item xs={2}>
                        <img src={fileIcon}/>
                      </Grid>
                      <Grid item xs={5}/>
                    </Grid>
                    <span style={{display: 'block', height: '20px'}}/>
                    <Grid container>
                      <Grid item xs={1} md={5}/>
                      <Grid item xs={10} md={2}>
                        {props.file ? props.file.name : "example.txt"}
                      </Grid>
                      <Grid item xs={1} md={5}/>
                    </Grid>
                  </div>
                  <div className='key-container'>
                    {view === 'encrypt' &&
                      <p> Your Encryption Key: </p>
                    }
                    {view === 'decrypt' &&
                      <p> Insert your key: </p>
                    }
                    <span style={{display: 'block', height: '10px'}}/>
                    {view === 'encrypt' &&
                      <TextField id="key" fullWidth={true} disabled={true} value={props.encryption_key}/>
                    }
                    {view === 'decrypt' &&
                      <TextField id="key" fullWidth={true} value={key} onChange={e => setKey(e.target.value)} placeholder="Insert encryption key"/>
                    }
                    <span style={{display: 'block', height: '30px'}}/>
                    {view === 'encrypt' &&
                      <Button>
                        <a style={{textDecoration: "none", color: "inherit"}} href={window.URL.createObjectURL(props.file)} download={props.file.name}>
                          Download
                        </a>
                      </Button>
                    }
                    {view === 'decrypt' &&
                      <Button onClick={decryptFileHandler}>
                        {/*                        <a style={{textDecoration: 'none', color: 'inherit'}} href={window.URL.createObjectURL(props.file)} download={props.file.name}>
                          Decrypt and Download
                        </a>
                        */}
                          Decrypt and Download
                      </Button>
                    }
                  </div>
                </Grid>
                <Grid item xs={1} md={3}/>
              </Grid>
              <span style={{display: 'block', height: '40px'}}/>
            </>
          )
     }   
    </Container>
  )
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    file: state.fileReducer.file,
    loading: state.fileReducer.loading,
    encryption_key: state.fileReducer.key,
    decrypting: state.fileReducer.decrypting,
    decrypted_file: state.fileReducer.decrypted_file,
    encrypted_lang: state.fileReducer.encrypted_lang
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    decryptFile: (file, key) => dispatch(action.decryptFile(file, key)),
    encryptFile: (file) => dispatch(action.encryptFile(file))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContent);
