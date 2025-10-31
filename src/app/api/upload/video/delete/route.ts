import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json({ success: false, error: 'No filename provided' })
    }

    // Construct file path
    const filepath = path.join(process.cwd(), 'public', 'uploads', 'videos', filename)

    try {
      // Delete file from disk
      await unlink(filepath)
      return NextResponse.json({ success: true })
    } catch (error) {
      // File might not exist, which is okay
      console.log('File not found or already deleted:', filename)
      return NextResponse.json({ success: true })
    }
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete video' 
    })
  }
}