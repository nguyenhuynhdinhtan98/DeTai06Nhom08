import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import configureFirebase from '../config/configureFirebase';
import {Alert} from 'react-native';
import Papa from 'papaparse';
export const singleFilePicker = async () => {
  try {
    // pick file type and get path file
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    return res.uri;
  } catch (err) {
    Alert.alert(err.message);
  }
};
// convert CSV data to JSON
export const csvDatatoJson = async (uri) => {
  var RNFS = require('react-native-fs'); // declare library
  return await RNFS.readFile(uri)
    .then((success) => {
      return Papa.parse(success.trim(), {
        header: true, // header file csv
        skipEmptyLines: true, // skip line empty
        encoding: 'utf8',
        fastMode: true,
        worker: true,
        complete: (results) => {
          return results;
        },
      }); // convert csv to json
    })
    .catch((err) => {
      Alert.alert('Invalid File');
    });
};

export const getUrlFileFirebase = (fileName) => {
  const storageRef = configureFirebase.storage().ref(); // url firebase storage
  const fileRef = storageRef.child(`/${fileName}`); //url file name on firebase storage
  return fileRef
    .getDownloadURL()
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const downloadFile = (url, fileName) => {
  const dirs = RNFetchBlob.fs.dirs; // path Dowbload in storage
  RNFetchBlob.config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true, // <-- this is the only thing required
      mediaScannable: true,
      notification: true, //notify
      overwrite: true, // overwrite file
      mime: 'text/csv', //type file
      title: fileName, //file name
      path: dirs.DownloadDir + '/' + fileName, //path file
      indicator: true,
    },
  })
    .fetch('GET', url) // method get
    .then(async (resp) => {
      Alert.alert('Please Check Storage.', 'File Path:' + resp.path());
    });
};

export const saveFile = async (data, fileName) => {
  //url file in storage emulator
  const downloads = RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName + '.csv';
  //convert JSON data to CSV then it will save in path
  await RNFetchBlob.fs
    .writeFile(downloads, Papa.unparse(data), 'utf8')
    .then(() =>
      Alert.alert(
        'File Export Success',
        'Directory:' + downloads,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {cancelable: false},
      ),
    );
};
// download file in storage firebase
export const handldeDownloadFileExample = async (fileName) => {
  console.disableYellowBox = true;
  const url = await getUrlFileFirebase(fileName);
  await downloadFile(url, fileName);
};

// find value in list class
export const searchFilterClass = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.class_name.indexOf(searchValue) != -1;
  });
  return output;
};
// find value in list subject
export const searchFilterSubject = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.subject_name.indexOf(searchValue) != -1;
  });
  return output;
};
// find value in list trainee
export const searchFilterTrainee = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.trainee_name.indexOf(searchValue) != -1;
  });
  return output;
};
// find value in list trainer
export const searchFilterTrainer = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.trainer_name.indexOf(searchValue) != -1;
  });
  return output;
};
//permission read and write file
export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // console.log('Permission Successs');
    } else {
      // console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
