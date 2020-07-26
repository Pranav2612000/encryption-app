import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Grid} from '@material-ui/core'
import fileIcon from '../assets/fileIcon.png'
import fileIconLarge from '../assets/fileicon_black_orange.svg';
import dropDown from '../assets/dropDown.png'
import {connect} from 'react-redux';
import * as action from '../redux/fileRedux/fileAction';


const MyDropzone = (props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const hiddenFileInput = React.useRef(null);

  // function to get file size of inp file 
  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // function to get filetype of file
  const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  }

  const handleFileOpen = event => {
    hiddenFileInput.current.click();
  };

  // function to handle when file dragged over
  const dragOver = (e) => {
      e.preventDefault();
  }

  // function to handle when file dragged inside droppable area 
  const dragEnter = (e) => {
      e.preventDefault();
  }

  // function to handle when dragged outside droppable area
  const dragLeave = (e) => {
      e.preventDefault();
  }

  // function to handle when file is dropped
  const fileDrop = (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      console.log(files);
      if(files.length) {
        handleFiles(files);
      }
  }

  // function to work on files 
  const handleFiles = (files) => {
    if(files.length != 1) {
      console.log("Upload 1 file");
    }
    props.uploadFile(files[0]);
  }

  // function called when files uploaded manually
  const handleFilesUpload = (event) => {
    console.log(event.target.files);
    handleFiles(event.target.files);
  }

  return (
      <div className='container'>
        <div className='drop-container'
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
        >
          <input type="file" id="file" ref={hiddenFileInput} onChange={handleFilesUpload} style={{display: "none"}}/>
          {!props.file &&
            (
              <>
                <Grid container onClick={handleFileOpen} className='file-inp-container'>
                  <Grid item md={5}/>
                  <Grid item md={2} className='file-inp'>
                    <Grid container>
                      <Grid item xs={3}>
                        <img src={fileIcon}/>
                      </Grid>
                      <Grid item xs={6}>
                        "Upload"
                      </Grid>
                      <Grid item xs={3}>
                        <img src={dropDown}/>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={5}/>
                </Grid>
                <div className="drop-message">
                  or drop files here
                </div>
              </>
            )
          }
          {props.file &&
            (
              <>
                <img src={fileIconLarge} className='file-inp-container'/>
                <p className='drop-message'>{props.file.name}</p>
              </>
            )
          }
        </div>
      </div>
  )
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    file: state.fileReducer.file,
    loading: state.fileReducer.loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    uploadFile: (file) => dispatch(action.uploadFile(file))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDropzone);
