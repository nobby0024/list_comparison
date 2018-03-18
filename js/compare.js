// variable for file compare
var hashA = new Object();
var hashB = new Object();
var isSizeZeroA = true;
var isSizeZeroB = true;

$(function () {
  // File Upload by Selecting File
  $("#file-upload-button-A").click(function () {
    $("#fileA").click();
  });
  $("#file-upload-button-B").click(function () {
    $("#fileB").click();
  });
  var fileA = $("#fileA")[0];
  var fileB = $("#fileB")[0];
  change_monitor(fileA, "A");
  change_monitor(fileB, "B");

  // File Upload by drag & drop
  var dropZoneA = $("#dropZoneA");
  var dropZoneB = $("#dropZoneB");
  dropZoneA.on('drop', handleFileSelectA);
  dropZoneB.on('drop', handleFileSelectB);

  $(document).on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
});

function handleFileSelectA(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var file = evt.originalEvent.dataTransfer;
  updateFile(file, "A");
}

function handleFileSelectB(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  var file = evt.originalEvent.dataTransfer;
  updateFile(file, "B");
}

function change_monitor(file, targetFile) {
  file.onchange = function () {
    const fileList = file.files;
    // If upload cancelled or file size is zero
    if (file.files.length < 1 || file.files[0].size == 0) {
      resetUploadFile(targetFile);
      return;
    }

    var checkFile = file.files[0];
    var reader = new FileReader();
    reader.readAsText(fileList[0])
    resetUploadFile(targetFile); // reset uploaded file
    reader.onload = function () {
      var tmpHash = new Object();
      var line_array = reader.result.split(/\r\n|\r|\n/);
      for (var i = 0; i < line_array.length; i++) {
        tmpHash[line_array[i]] = 1;
      }
      if (targetFile == "A") {
        hashA = tmpHash;
        $("#fileA-name").text(fileList[0].name);
        isSizeZeroA = false;
      } else {
        hashB = tmpHash;
        $("#fileB-name").text(fileList[0].name);
        isSizeZeroB = false;
      }
      updateButtonDisabledStatus();
    }
  }
}

// -------------------------------------
// for Drag & Drop
// -------------------------------------
function updateFile(data, targetFile) {
  const fileList = data.files;
    // If upload cancelled or file size is zero
    if (data.files.length < 1 || data.files[0].size == 0) {
      resetUploadFile(targetFile);
      return;
    }

    var checkFile = data.files[0];
    var reader = new FileReader();
    reader.readAsText(fileList[0])
    resetUploadFile(targetFile); // reset uploaded file
    reader.onload = function () {
      var tmpHash = new Object();
      var line_array = reader.result.split(/\r\n|\r|\n/);
      for (var i = 0; i < line_array.length; i++) {
        tmpHash[line_array[i]] = 1;
      }
      if (targetFile == "A") {
        hashA = tmpHash;
        $("#fileA-name").text(fileList[0].name);
        isSizeZeroA = false;
      } else {
        hashB = tmpHash;
        $("#fileB-name").text(fileList[0].name);
        isSizeZeroB = false;
      }
      updateButtonDisabledStatus();
    }
}

function resetUploadFile(targetFile) {
  if (targetFile == "A") {
    isSizeZeroA = true;
    $("#fileA-name").text("-");
  } else {
    isSizeZeroB = true;
    $("#fileB-name").text("-");
  }
  updateButtonDisabledStatus();
}

// -------------------------------------
// Download text file from hash object
// -------------------------------------
function saveTextFromHashKeys(fileName, targetHash) {
  var text = "";
  for (key in targetHash) {
    if (key.length === 0) {
      continue;
    }
    text += key;
    text += "\r\n";
  }
  var blob = new Blob([text], { type: 'text/plain' });
  window.URL = window.URL || window.webkitURL;
  var ref = window.URL.createObjectURL(blob);
  $("#main").after('<a id="downloadLink">download start</a>');
  $("#downloadLink").attr('href', ref);
  $("#downloadLink").attr('download', fileName + '.txt');
  $("#downloadLink")[0].click();
  $("#downloadLink").remove();
}

// -------------------------------------
// Download functions
// -------------------------------------
function getAandB() {
  var resultHash = new Object();
  for (key in hashA) {
    if (key in hashB) {
      resultHash[key] = 1;
    }
  }
  saveTextFromHashKeys("AandB", resultHash);
}

function getAorB() {
  var resultHash = new Object();
  for (key in hashA) {
    resultHash[key] = 1;
  }
  for (key in hashB) {
    resultHash[key] = 1;
  }
  saveTextFromHashKeys("AorB", resultHash);
}


function getOnlyA() {
  var resultHash = new Object();
  for (key in hashA) {
    if (!(key in hashB)) {
      resultHash[key] = 1;
    }
  }
  saveTextFromHashKeys("onlyA", resultHash);
}

function getOnlyB() {
  var resultHash = new Object();
  for (key in hashB) {
    if (!(key in hashA)) {
      resultHash[key] = 1;
    }
  }
  saveTextFromHashKeys("onlyB", resultHash);
}

function updateButtonDisabledStatus() {
  if (isSizeZeroA == false && isSizeZeroB == false) {
    $(".dl-button").prop('disabled', false);
  } else {
    $(".dl-button").prop('disabled', true);
  }
}

