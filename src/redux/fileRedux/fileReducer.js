import {REQ_TO_UPLOAD_FILE,
        FILE_UPLOAD_SUCCESS,
        FILE_UPLOAD_FAILURE,
        REQ_TO_ENCRYPT,
        ENCRYPT_SUCCESS,
        ENCRYPT_FAILURE,
        REQ_TO_DECRYPT,
        DECRYPT_SUCCESS,
        DECRYPT_FAILURE,
} from './fileActionTypes';

const initialState = {
  file: null,
  loading: false,
  op: ""
}

const fileReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQ_TO_ENCRYPT:
      return {
        ...state,
        loading: true
      };
    case ENCRYPT_SUCCESS:
      return {
        ...state,
        file: action.file,
        key: action.key,
        loading: false
      };
    case ENCRYPT_FAILURE:
      return {
        ...state,
        loading: false,
        error: "Encryption error"
      };
    case REQ_TO_UPLOAD_FILE:
      return {
        ...state,
        loading: true
      };
    case FILE_UPLOAD_SUCCESS:
      console.log('here');
      return {
        ...state,
        file: action.file,
        loading: false
      };
    case FILE_UPLOAD_FAILURE:
      return {
        ...state,
        loading: true,
        error: "Error uplaoding file"
      };
    case REQ_TO_DECRYPT:
      return {
        ...state,
        decrypting: true,
      };

    case DECRYPT_SUCCESS:
      return {
        ...state,
        decrypting: false,
        decrypted_file: action.decrypted_file
      }
    case DECRYPT_FAILURE:
      return {
        ...state,
        decrypting: false,
        decryption_error: "Error"
      }
    default:
      return state;
  }
};

export default fileReducer;
