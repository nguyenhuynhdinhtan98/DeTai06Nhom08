import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import configureFirebase from '../config/configureFirebase';
import {Alert} from 'react-native';
import Papa from 'papaparse';
export const singleFilePicker = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    return res.uri;
  } catch (err) {
    console.log(err);
  }
};
export const csvDatatoJson = async (uri) => {
  var RNFS = require('react-native-fs');
  return await RNFS.readFile(uri)
    .then((success) => {
      return Papa.parse(success.trim(), {
        header: true,
        skipEmptyLines: true,
        encoding: 'utf8',
        fastMode: true,
        worker: true,
        complete: (results) => {
          return results;
        },
      });
    })
    .catch((err) => {
      Alert.alert(err.message);
    });
};

export const getUrlFileFirebase = (fileName) => {
  const storageRef = configureFirebase.storage().ref();
  const fileRef = storageRef.child(`/${fileName}`);
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
      notification: true,
      overwrite: true,
      mime: 'text/csv',
      title: fileName,
      path: dirs.DownloadDir + '/' + fileName,
      indicator: true,
    },
  })
    .fetch('GET', url)
    .then(async (resp) => {
      Alert.alert('Please Check Storage.', 'File Path:' + resp.path());
    });
};
export const handldeDownloadFileExample = async (fileName) => {
  console.disableYellowBox = true;
  const url = await getUrlFileFirebase(fileName);
  await downloadFile(url, fileName);
};
export const searchFilterClass = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.class_name.indexOf(searchValue) != -1;
  });
  return output;
};
export const searchFilterSubject = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.subject_name.indexOf(searchValue) != -1;
  });
  return output;
};
export const searchFilterTrainee = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.trainee_name.indexOf(searchValue) != -1;
  });
  return output;
};
export const searchFilterTrainer = (listValue, searchValue) => {
  const output = listValue.filter((item) => {
    return item.trainer_name.indexOf(searchValue) != -1;
  });
  return output;
};
export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission Successs');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
