import fs from "fs";
import { google } from "googleapis";

async function getAuthDrive() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "google-credentials.json",
    scopes: "https://www.googleapis.com/auth/drive",
  });

  const client = await auth.getClient();

  const drive = google.drive({
    version: "v3",
    auth: client,
  });

  const driveFolder = "1wIOxSoDIRLYHn0KknytJ160JUKyITcL2";

  return {
    auth,
    client,
    drive,
    driveFolder,
  };
}

export async function uploadFile(file: any) {
  try {
    const { drive } = await getAuthDrive();

    const requestBody = {
      name: file.filename,
      parents: ["1wIOxSoDIRLYHn0KknytJ160JUKyITcL2"],
    };

    const media = {
      mineType: file.mimetype,
      body: fs.createReadStream(file.path),
    };

    const response = await drive.files.create({
      media,
      requestBody,
    });
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function deleteServerFile(filePath: string) {
  fs.unlink(filePath, () => {
    console.log("Arquivo deletado.");
  });
}

export async function getFile(id: string) {
  try {
    const { drive } = await getAuthDrive();
    const response = await drive.files.get(
      {
        fileId: id,
        alt: "media",
      },
      {
        responseType: "arraybuffer",
      }
    );

    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
}
