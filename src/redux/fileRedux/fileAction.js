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

export const requestToUploadFile = () => ({
  type: REQ_TO_UPLOAD_FILE
});
export const fileUploadSuccess = (file) => ({
  type: FILE_UPLOAD_SUCCESS,
  file: file
});
export const fileUploadFailure = () => ({
  type: FILE_UPLOAD_FAILURE
});
export const uploadFile = (file) => (dispatch) => {
  dispatch(requestToUploadFile());
  console.log('here');
  //get file contents
  dispatch(fileUploadSuccess(file));
  //If errors encountered:
  // fileUploadFailure();
}

export const requestToEncrypt = () => ({
  type: REQ_TO_ENCRYPT
});
export const encryptSuccess = (file) => ({
  type: ENCRYPT_SUCCESS,
  file: file
});
export const encryptFailure = () => ({
  type: ENCRYPT_FAILURE
});
export const encryptFile = (file) => (dispatch) => {
  dispatch(requestToEncrypt());
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e) => { 
    console.log(e);
    const data = e.target.result;
    const key = "frontend"; // get random key
    const encrypted_data = encrypt(data, key);
    //const encrypted_data = "hello world";
    const encrypted_file = new File([encrypted_data], "encrypted" + file.name, {type: "text/plain"});
    dispatch(encryptSuccess(encrypted_file));
    return e.target.result;
  }
  //function to encrypt
  //if error
  //dispatch(encryptFailure());
  reader.onerror = (e) => {
    dispatch(encryptFailure(file));
  }
}

export const requestToDecrypt = () => ({
  type: REQ_TO_DECRYPT
});
export const decryptSuccess = (file) => ({
  type: DECRYPT_SUCCESS,
  decrypted_file: file
});
export const decryptFailure = () => ({
  type: DECRYPT_FAILURE
});
export const decryptFile = (file, key) => (dispatch) => {
  console.log(key);
  dispatch(requestToDecrypt());
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e) => { 
    console.log(e);
    const data = e.target.result;
    //const key = "frontend"; // get random key
    const decrypted_data = decrypt(data, key);
    //const encrypted_data = "hello world";
    const decrypted_file = new File([decrypted_data], "decrypted" + file.name, {type: "text/plain"});
    dispatch(decryptSuccess(decrypted_file));
    return e.target.result;
  }

  reader.onerror = (e) => {
    dispatch(decryptFailure(file));
  }
}

const encrypt = (data, key) => {
  //Split message into chunks of keysize
  var chunks, n;
  n = getN(key);
  console.log(n);
  chunks = chunkSubstr(data, key.length);  
  var encrypted_chunks = chunks.map((chunk) => {
    //Reverse each chunk
    var this_chunk = reverseString(chunk);

    //Shift each character by n
    this_chunk = this_chunk.split("").map((elem) => shiftUpByN(elem, n)).join("")
    console.log(this_chunk);
    this_chunk = reverseString(this_chunk);
    return this_chunk;
  });
  var encrypted_str = encrypted_chunks.join("");
  return encrypted_str;

}

const decrypt = (data, key) => {
  //Split message into chunks of keysize
  var chunks, n;
  n = getN(key);
  console.log(n);
  chunks = chunkSubstr(data, key.length);  
  var decrypted_chunks = chunks.map((chunk) => {
    //Reverse each chunk
    var this_chunk = reverseString(chunk);

    //Shift each character by n
    this_chunk = this_chunk.split("").map((elem) => shiftDownByN(elem, n)).join("")
    console.log(this_chunk);
    this_chunk = reverseString(this_chunk);
    return this_chunk;
  });
  var decrypted_str = decrypted_chunks.join("");
  return decrypted_str;
}

function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }
  return chunks;
}

function reverseString(str) { 
  return str.split('').reverse().join('');
} 
const reducer = (accumulator, currentValue) => accumulator + currentValue;

function getN(key) {
  return (key.split("").map((elem) => elem.charCodeAt(0)).reduce(reducer)) % 94;
}
function shiftUpByN(val, n) {
  console.log(val.charCodeAt(0));
  console.log(n);
  if(32 <= val.charCodeAt(0) && val.charCodeAt(0) <= 125) {
  //if(true) {
    if((val.charCodeAt(0) + n) > 125) {
      return String.fromCharCode(31 + ((val.charCodeAt(0) + n) - 125));//.charCodeAt(10);
    }
    else {
      return String.fromCharCode((val.charCodeAt(0) + n));//.charCodeAt(10);
    }
  } else {
    console.log('here');
    return val;
  }
}

function shiftDownByN(val, n) {
  console.log(val);
  console.log(n);
  if(32 <= val.charCodeAt(0) && val.charCodeAt(0) <= 125) {
    if((val.charCodeAt(0) - n) < 32) {
      //return String.fromCharCode(31 + ((val.charCodeAt(0) + n) - 125));//.charCodeAt(10);
      return String.fromCharCode(125 + (val.charCodeAt(0) - 31) - n);
    }
    else {
      return String.fromCharCode((val.charCodeAt(0) - n));//.charCodeAt(10);
    }
  } else {
    return val;
  }
}














