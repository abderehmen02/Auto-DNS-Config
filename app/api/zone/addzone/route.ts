import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let { body } = await request.json();
    const { apiKey, domainName, accountId } = JSON.parse(body);

    const data = {
      account: { id: accountId },
      name: domainName,
      type: "full",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    console.log(data, headers);
    let result: any = await axios.post(
      "https://api.cloudflare.com/client/v4/zones",
      data,
      {
        headers: headers,
      }
    );

    return NextResponse.json({ data: result.data.result.name_servers });
  } catch (error: any) {
    console.log("backend===>", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
