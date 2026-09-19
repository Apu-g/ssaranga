/**
 * SsaRanga — Leads form → Google Sheets
 *
 * How to set up:
 * 1. Create a Google Sheet (or reuse one). The lead rows will be appended to
 *    the sheet tab named "Leads" (created automatically if missing).
 * 2. Open Extensions > Apps Script, paste this file as Code.gs.
 * 3. Deploy > New deployment > Web app:
 *      - Execute as:  Me
 *      - Who has access: Anyone
 *    Copy the "/exec" URL and put it in the site's .env.local as
 *    GOOGLE_SHEETS_APPS_SCRIPT_URL.
 */

const SHEET_NAME = "Leads";
const HEADERS = ["Timestamp", "Name", "Phone", "Email", "Program", "Message"];

function doPost(e) {
  var response = { success: true };
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    ensureHeaders(sheet);

    sheet.appendRow([
      new Date(),
      clean(data.name),
      clean(data.phone),
      clean(data.email),
      clean(data.program),
      clean(data.message),
    ]);
  } catch (err) {
    response = { success: false, error: String(err) };
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/* GET handler — useful for testing the deployment in a browser. */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ success: true, message: "SsaRanga leads endpoint is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    var existing = sheet
      .getRange(1, 1, 1, HEADERS.length)
      .getValues()[0]
      .join("\u0000");
    if (existing !== HEADERS.join("\u0000")) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }
  }
}

function clean(value) {
  var text = String(value == null ? "" : value).trim();
  return text || "";
}