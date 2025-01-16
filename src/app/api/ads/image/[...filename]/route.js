import path from "path";
import fs from "fs";
import {
  authManagerApi,
  authenticateLecturer,
  authenticateUser,
} from "@/utils/authenticateMe";

export async function GET(req, { params }) {
  const [filename, code] = params.filename;
  let filePath = "";

  //contract
  filePath = path.join(process.cwd(), `/upload/${code}/`, filename);

  //formdress
  // filePath = path.join(process.cwd(), "/upload/formdress/", filename);

  try {
    const file = fs.readFileSync(filePath);
    // console.log("file -->", file);

    return new Response(file, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (err) {
    return new Response("File not found", { status: 404 });
  }
}
