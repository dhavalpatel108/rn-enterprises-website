import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;
  
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Authenticate the user here
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "OWNER") {
          throw new Error('Unauthorized');
        }
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Log upload complete if needed
        console.log("Upload completed", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 } // The webhook will retry 5 times waiting for a 200
    );
  }
}
