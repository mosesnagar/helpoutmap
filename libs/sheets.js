import { google } from 'googleapis';
export async function getTasksList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'helpout', // sheet name
    });

    const rows = response.data.values;
    if (rows.length) {
      return rows.map((row) => ({
        title: row[1],
        location: row[2],
        description: row[3],
        contact: row[4],
        link: row[5],
        tags: row[6],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}