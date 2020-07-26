import crypto from 'crypto';
import {actionTypes} from './fileActionTypes';

export const switchLanguage = (lang:string) => ({
  type: actionTypes.SWITCH_LANGUAGE,
  lang: lang
});
export const requestToUploadFile = () => ({
  type: actionTypes.REQ_TO_UPLOAD_FILE
});
export const fileUploadSuccess = (file:File) => ({
  type: actionTypes.FILE_UPLOAD_SUCCESS,
  file: file
});
export const fileUploadFailure = () => ({
  type: actionTypes.FILE_UPLOAD_FAILURE
});
export const uploadFile = (file:File) => (dispatch) => {
  dispatch(requestToUploadFile());
  console.log('here');
  //get file contents
  dispatch(fileUploadSuccess(file));
  //If errors encountered:
  // fileUploadFailure();
}

export const requestToEncrypt = () => ({
  type: actionTypes.REQ_TO_ENCRYPT
});
export const encryptSuccess = (file:File, key:string) => ({
  type: actionTypes.ENCRYPT_SUCCESS,
  file: file,
  key: key
});
export const encryptFailure = () => ({
  type: actionTypes.ENCRYPT_FAILURE
});
export const encryptFile = (file:File) => (dispatch) => {
  dispatch(requestToEncrypt());
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e: ProgressEvent<FileReader> | null) => { 
    console.log(e);
    var data;
    if(e && e.target) {
      data = e.target.result;
    }
    var key_bytes = crypto.randomBytes(32);//get random key
    var key1:string[] = [];
    key_bytes.forEach((byte) => {
      key1.push(scaleKeyBytes(byte));
    });
    const key = key1.join('');
    //console.log(key1);
    //var key = 'frontend'; 
    const encrypted_data = encrypt(data, key);
    //const encrypted_data = "hello world";
    const encrypted_file = new File([encrypted_data], "encrypted" + file.name, {type: "text/plain"});
    dispatch(encryptSuccess(encrypted_file, key));
    if(e && e.target) {
      return e.target.result;
    }
  }
  //function to encrypt
  //if error
  //dispatch(encryptFailure());
  reader.onerror = (e) => {
    dispatch(encryptFailure());
  }
}

export const requestToDecrypt = () => ({
  type: actionTypes.REQ_TO_DECRYPT
});
export const decryptSuccess = (file:File) => ({
  type: actionTypes.DECRYPT_SUCCESS,
  decrypted_file: file
});
export const decryptFailure = () => ({
  type: actionTypes.DECRYPT_FAILURE
});
export const decryptFile = (file:File, key:string) => (dispatch) => {
  console.log(key);
  dispatch(requestToDecrypt());
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = (e) => { 
    console.log(e);
    var data;
    if(e && e.target)
      data = e.target.result;
    //const key = "frontend"; // get random key
    const decrypted_data = decrypt(data, key);
    //const encrypted_data = "hello world";
    const decrypted_file = new File([decrypted_data], "decrypted" + file.name, {type: "text/plain"});
    dispatch(decryptSuccess(decrypted_file));
    if(e && e.target)
      return e.target.result;
  }

  reader.onerror = (e) => {
    dispatch(decryptFailure());
  }
}

const encrypt = (data:string, key:string) => {
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

const decrypt = (data:string, key:string) => {
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

function chunkSubstr(str:string, size:number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }
  return chunks;
}

function reverseString(str:string) { 
  return str.split('').reverse().join('');
} 
const reducer = (accumulator, currentValue) => accumulator + currentValue;

function getN(key:string) {
  return (key.split("").map((elem) => elem.charCodeAt(0)).reduce(reducer)) % 94;
}
function shiftUpByN(val:string, n:number) {
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

function shiftDownByN(val:string, n:number) {
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
function scaleKeyBytes(val:number) {
  var mod = val % 94;
  console.log(String.fromCharCode(32 + mod));
  return String.fromCharCode(32 + mod);
}
