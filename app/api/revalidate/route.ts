import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Log the incoming request method and URL
  console.log(`[Revalidate Route] Received ${request.method} request to: ${request.nextUrl.pathname}`);

  try {
    const tag = request.nextUrl.searchParams.get('tag');
    console.log(`[Revalidate Route] Tag parameter identified: ${tag || 'None provided'}`);

    if (tag) {
      // Use 'max' profile → stale-while-revalidate
      revalidateTag(tag, 'max');
      console.log(`✅ [Revalidate Route] Successfully revalidated tag: "${tag}"`);
    } else {
      console.warn('⚠️ [Revalidate Route] No tag provided. No cache cleared.');
      // Optional: revalidatePath('/', 'layout');
    }

    const responseData = { 
      revalidated: true, 
      tag: tag || 'all',
      now: new Date().toISOString()
    };

    console.log(`[Revalidate Route] Returning response:`, responseData);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('❌ [Revalidate Route] Error during revalidation:', error);
    
    return NextResponse.json({ 
      revalidated: false, 
      error: 'Failed to revalidate' 
    }, { status: 500 });
  }
}